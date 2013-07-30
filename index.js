var http = require('http')
  , fs   = require('fs')
  , tmp  = require('tmp')
  , path = require('path')
  , exec = require('child_process').exec
  ;

var server = http.createServer(function (req, res) {
  //
  // create a temp file
  //
  tmp.file(function (err, filepath) {
    //
    // if we have problems creating a simple temp file then its
    // better not to do anything at all
    //
    if (err) throw err;

    //
    // create a stream for writing to our tmp file
    //
    var writeStream = fs.createWriteStream(filepath);

    //
    // data is completely written to tmp file
    //
    writeStream.on('close', function () {
      //
      // execute pdflatex on that latex source
      //
      var dir      = path.dirname(filepath)
        , basename = path.basename(filepath, '.tmp')
        ;
      exec('pdflatex -interaction=batchmode -output-directory=' + dir + ' ' + filepath, function (err, stdout, stderr) {
        //
        // if we there are errors respond in plain text
        // explaining what happened
        //
        if(err || stderr) {
          console.log('!' + filepath);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(err && err.message || stderr);
          return;
        }

        //
        // else just send the output pdf as response
        //
        console.log('<' + filepath);
        fs.createReadStream(path.join(dir, basename) + '.pdf').pipe(res);
      });
    });

    //
    // pipe the body of the request to our tmp file
    //
    console.log('>' + filepath);
    req.pipe(writeStream);
  });
});

//
// start the //
server.listen(process.env.PORT || 5050);