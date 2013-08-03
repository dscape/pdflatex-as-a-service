# pdflatex as a service

LaTeX Goes In, PDF is Streamed Out

## Try

```
curl pdflatex.ae.gy --data-binary @my.tex > my.pdf
```

## Install

### With Docker

```
docker pull dscape/pdf-latex-as-a-service
docker run -d dscape/pdf-latex-as-a-service
```

### By yourself


```
apt-get update
apt-get install texlive-full
wget https://raw.github.com/isaacs/nave/master/nave.sh
mv nave.sh /bin/nave
chmod +x /bin/nave
nave install latest
nave use latest
git clone https://github.com/dscape/pdflatex-as-a-service.git
cd pdflatex-as-a-service
npm install -g forever
nohup forever index.js &
```
