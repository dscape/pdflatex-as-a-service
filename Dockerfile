# Build your own pdflatex as a service
#
# VERSION  0.0.0
from       ubuntu
maintainer Nuno Job "nunojobpinto@gmail.com"

#
# update apr
#
run echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list

run apt-get upgrade
run apt-get update

#
# install latex
#
run apt-get install -y texlive-latex-base texlive-latex-extra curl

#
# install nodejs 0.10.15
#
run cd /usr/local && curl http://nodejs.org/dist/v0.10.15/node-v0.10.15-linux-x64.tar.gz | tar --strip-components=1 -zxf- && cd
run npm -g update npm
run npm install -g forever

#
# install app files
#
run mkdir -p /opt/install/pdflatex
add ./index.js /opt/install/pdflatex/index.js
add ./package.json /opt/install/pdflatex/package.json
run cd /opt/install/pdflatex && npm install

expose 5050

cmd forever /opt/install/pdflatex/index.js
