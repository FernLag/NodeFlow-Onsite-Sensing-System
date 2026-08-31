#!/usr/bin/env python3
"""
verify_sketches.py

Checks that every sketch the generator can produce is actually valid C++.

It builds one sketch per combination the spreadsheet allows (see
tools/generate_all_sketches.js), then puts each one through three checks:

  1. Every value the templates asked for was actually supplied. A placeholder
     with no parameter behind it falls back to zero rather than failing, so a
     wrong reading is the symptom, not a broken build. Those are caught here.
  2. Braces, parentheses and block comments balance.
  3. A desktop C++ compiler accepts it, against the Arduino stub in
     tools/arduino_stub.h. This is the check that finds undeclared variables,
     wrong argument types and functions used before they are declared.

It also reports configuration gaps: a measurement whose only display option is
"No visualization" produces a sketch that shows nothing on the screen, and a
display option a measurement allows but the viz_options sheet has switched off
can never be chosen. Neither breaks the build, so neither shows up any other
way.

Requirements: Node, and g++ or clang++. Without a compiler the first two checks
still run and the third is reported as skipped.

    python3 tools/verify_sketches.py            # check everything
    python3 tools/verify_sketches.py --keep     # leave the sketches on disk
"""

import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GENERATOR = os.path.join(ROOT, "tools", "generate_all_sketches.js")
STUB = os.path.join(ROOT, "tools", "arduino_stub.h")

PLACEHOLDER = re.compile(r"\{[A-Za-z_][A-Za-z0-9_]*\}")


def find(*names):
    for name in names:
        found = shutil.which(name)
        if found:
            return found
    return None


def check_placeholders(code):
    """A template variable that was never filled in reaches the file as {name}.
    Skip anything inside the header comment, where braces can be legitimate."""
    body = code.split("*/", 1)[-1]
    return sorted(set(PLACEHOLDER.findall(body)))


def check_balance(code):
    """Strip strings, character literals and comments, then count."""
    stripped = re.sub(r"/\*.*?\*/", " ", code, flags=re.S)
    stripped = re.sub(r"//[^\n]*", " ", stripped)
    stripped = re.sub(r'"(?:[^"\\]|\\.)*"', '""', stripped)
    stripped = re.sub(r"'(?:[^'\\]|\\.)*'", "''", stripped)

    problems = []
    for opener, closer, label in (("{", "}", "braces"), ("(", ")", "parentheses")):
        if stripped.count(opener) != stripped.count(closer):
            problems.append(
                "%s do not balance: %d %s and %d %s"
                % (label, stripped.count(opener), opener, stripped.count(closer), closer)
            )
    if code.count("/*") != code.count("*/"):
        problems.append(
            "block comment markers do not balance: %d opened, %d closed"
            % (code.count("/*"), code.count("*/"))
        )
    return problems


def compile_sketch(compiler, path, workdir):
    """An .ino is C++ with the Arduino headers already included, so it compiles
    as a translation unit once the stub is force-included."""
    cpp = os.path.join(workdir, os.path.basename(path) + ".cpp")
    with open(path, encoding="utf-8") as f:
        source = f.read()

    # the real toolchain supplies these; the stub stands in for them.
    source = re.sub(r"^\s*#include\s*<(Arduino|LiquidCrystal)\.h>\s*$", "",
                    source, flags=re.M)

    with open(cpp, "w", encoding="utf-8") as f:
        f.write(source)

    result = subprocess.run(
        [
            compiler,
            "-fsyntax-only",
            "-std=c++17",
            "-x", "c++",
            "-include", STUB,
            "-Wall",
            "-Wno-unused-variable",
            "-Wno-unused-but-set-variable",
            "-Wno-unused-function",
            cpp,
        ],
        capture_output=True,
        text=True,
    )
    return result.returncode, result.stderr.strip()


def main():
    keep = "--keep" in sys.argv

    node = find("node")
    if not node:
        sys.exit("Node is required to run the generator. Install it and try again.")

    compiler = find("g++", "clang++")

    # written outside the repository: these are throwaway build artifacts and
    # there is no reason for the working tree to carry them.
    outdir = tempfile.mkdtemp(prefix="nodeflow-sketches-")
    print("Generating every sketch the form can produce...")
    gen = subprocess.run([node, GENERATOR, outdir], capture_output=True, text=True)
    sys.stdout.write(gen.stdout)
    if gen.returncode != 0:
        sys.stderr.write(gen.stderr)
        sys.exit("The generator failed. Nothing was checked.")

    with open(os.path.join(outdir, "manifest.json"), encoding="utf-8") as f:
        manifest = json.load(f)

    if compiler:
        print("Compiling each one with %s against the Arduino stub...\n"
              % os.path.basename(compiler))
    else:
        print("No C++ compiler found. Running the text checks only.\n")

    failures = []
    workdir = tempfile.mkdtemp(prefix="nodeflow-verify-")

    try:
        for case in manifest["cases"]:
            with open(case["file"], encoding="utf-8") as f:
                code = f.read()

            problems = []

            left = check_placeholders(code)
            if left:
                problems.append("unfilled template placeholders: " + ", ".join(left))

            problems.extend(check_balance(code))

            missing = case.get("missingValues") or []
            if missing:
                problems.append(
                    "the templates asked for values the form never supplies, and each "
                    "became a zero: " + ", ".join(missing)
                )

            if compiler and not problems:
                rc, err = compile_sketch(compiler, case["file"], workdir)
                if rc != 0:
                    first = "\n".join(err.split("\n")[:12])
                    problems.append("compiler rejected it:\n" + first)

            if problems:
                failures.append((case, problems))
                print("FAIL  " + case["name"])
                for p in problems:
                    for line in p.split("\n"):
                        print("        " + line)
    finally:
        shutil.rmtree(workdir, ignore_errors=True)
        if not keep:
            shutil.rmtree(outdir, ignore_errors=True)
        else:
            print("\nThe generated sketches are in %s" % outdir)

    total = len(manifest["cases"])

    warnings = manifest.get("warnings") or []
    if warnings:
        print()
        print("Configuration gaps. These compile, so they are not counted as")
        print("failures, but they reach a grower as software that does nothing:")
        for w in warnings:
            print("  - " + w)

    print()
    if failures:
        print("%d of %d sketches have problems." % (len(failures), total))
        if not keep:
            print("Rerun with --keep to look at the generated files.")
        sys.exit(1)

    print("All %d sketches passed." % total)


if __name__ == "__main__":
    main()
