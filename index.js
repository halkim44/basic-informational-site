var http = require('http');
var url = require('url');
var fs = require('fs');

let notFoundhtml;
fs.readFile('./404.html', (err, data) => {
  notFoundhtml = data;
});

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = q.pathname;

  if (/\/$/.test(filename)) {
    filename = '/index';
  }
  if(!/\.html$/.test(filename)) {
    filename = `${filename}.html`.toLocaleLowerCase();
  }
  filename = '.' + filename;

  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write(notFoundhtml)
    
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
    }

    return res.end();
  })
}).listen(8080);
