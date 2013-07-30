var http = require('http')
  , fs   = require('fs')
  , tmp  = require('tmp')
  , exec = require('child_process').exec
  ;

var server = http.createServer(function (req, res) {
  tmp.file(function _tempFileCreated(err, path) {
    if (err) throw err;
    
    var fileStream = fs.createWriteStream(path);

    //
    // data is completely written
    //
    fileStream.on('end', function () {
      exec('pdflatex ' + path, function (err, stdout, stderr) {
        if(err || stderr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(err && err.message || stderr);
          return;
        }
        fs.createReadStream(path + '.pdf').pipe(res);
      });
    });

    req.pipe(fileStream);
  });
});

server.listen(5050);