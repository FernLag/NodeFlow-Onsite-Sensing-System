"""
watch.py - reruns tools/build.py whenever the master spreadsheet is saved.

Run it from anywhere:  python3 tools/watch.py     (Ctrl+C to stop)
"""

import os
import subprocess
import sys
import time

ROOT       = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WATCH_FILE = os.path.join(ROOT, "data", "sensor_configuration.xlsx")
BUILD_FILE = os.path.join(ROOT, "tools", "build.py")

last_modified = 0
missing_logged = False

print(f"Watching {os.path.relpath(WATCH_FILE, ROOT)} for changes... (Ctrl+C to stop)")

while True:
    try:
        mtime = os.path.getmtime(WATCH_FILE)
        missing_logged = False
        if mtime != last_modified and last_modified != 0:
            print("Change detected: running build.py...")
            subprocess.run([sys.executable, BUILD_FILE])
            print("Done.\n")
        last_modified = mtime
    except FileNotFoundError:
        if not missing_logged:
            print(f"Waiting for {os.path.relpath(WATCH_FILE, ROOT)}...")
            missing_logged = True
    except KeyboardInterrupt:
        print("\nStopped.")
        break
    time.sleep(2)
