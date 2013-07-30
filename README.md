# pdflatex as a service

LaTeX Goes In, PDF is Stream Out

## Try

pdflatex.ae.gy

## Install

Dependencies

```
apt-get update
apt-get install texlive-full
wget https://raw.github.com/isaacs/nave/master/nave.sh
mv nave.sh /bin/nave
chmod +x /bin/nave
nave install latest
nave use latest
```

Start

```
git clone https://github.com/dscape/pdflatex-as-a-service.git
cd pdflatex-as-a-service
npm install -g forever
nohup forever index.js &
```

Use

```
curl pdflatex.ae.gy --data-binary @my.tex > ~/Desktop/my.pdf
```