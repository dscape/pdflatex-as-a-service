#!/bin/bash

#
# install pdflatex if it's not available in the container
#
hash pdflatex 2>/dev/null \
  || { echo >&2 "pdflatex not detected, installing"; apt-get install -y texlive-latex-base texlive-latex-extra curl; }
