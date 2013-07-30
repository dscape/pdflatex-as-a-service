var http = require('http')
  , fs   = require('fs')
  , tmp  = require('tmp')
  , exec = require('child_process').exec
  ;

var server = http.createServer(function (req, res) {
  //
  // create a temp file
  //
  tmp.file(function _tempFileCreated(err, path) {
    //
    // if we have problems creating a simple temp file then its
    // better not to do anything at all
    //
    if (err) throw err;

    //
    // create a stream for writing to our tmp file
    //
    var fileStream = fs.createWriteStream(path);

    //
    // data is completely written to tmp file
    //
    fileStream.on('close', function () {
      //
      // execute pdflatex on that latex source
      //
      exec('pdflatex ' + path, function (err, stdout, stderr) {
        //
        // if we there are errors respond in plain text
        // explaining what happened
        //
        if(err || stderr) {
          console.log('!' + path);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(err && err.message || stderr);
          return;
        }

        //
        // else just send the output pdf as response
        //
        console.log('<' + path);
        fs.createReadStream(path + '.pdf').pipe(res);
      });
    });

    //
    // pipe the body of the request to our tmp file
    //
    console.log('>' + path);
    req.pipe(fileStream);
  });
});

//
// start the //
server.listen(process.env.PORT || 5050);