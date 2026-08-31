# User guide

`nodeflow-user-guide.tex` is the grower-facing guide, from installing the
Arduino IDE through to readings on the display.

## Building it

Needs a LaTeX install. On macOS that is MacTeX, on Debian or Ubuntu
`texlive-latex-recommended` plus `texlive-latex-extra`.

```sh
cd docs/guidelines
pdflatex nodeflow-user-guide.tex
pdflatex nodeflow-user-guide.tex   # second pass fills in the contents page
cp nodeflow-user-guide.pdf ../../assets/docs/
```

That last line is the one that matters. The Summary and Instructions box on the
generator links to `assets/docs/nodeflow-user-guide.pdf`, and the link stays
hidden until that file is actually there: the page checks for it and shows
"the printable guide is being prepared" instead of a link that leads nowhere.
Copy the PDF across and the link appears on its own. Everything it uses is in a standard
texlive install: geometry, enumitem, tcolorbox, titlesec, fancyhdr, hyperref
and xcolor. No custom fonts.

## Keeping it true

The guide states specific numbers that come from the code and the spreadsheet:
the air and water readings a capacitive probe gives, the five minute VA-3
update interval, which pins the display shield occupies, and the one-sensor
limit on direct wiring. If any of those change, this file changes with them.
