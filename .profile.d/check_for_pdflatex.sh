#!/bin/bash

#
# install pdflatex if it's not available in the container
#
if hash pdflatex 2>/dev/null; then
  echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list

  apt-get upgrade
  apt-get update

  apt-get install -y texlive-latex-base texlive-latex-extra curl
fi