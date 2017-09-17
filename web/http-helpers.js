var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  
  //callback comed from requesthandler file
  fs.readFile(asset, function (error, data) {
    // console.log('asset: ', asset)
    // console.log('serve Assets', error)
    // console.log(data.toString('utf8'));
    // console.log('error', error);
    // console.log(res.statusCode);
    res.end(data);
  });
 

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

};



// As you progress, keep thinking about what helper functions you can put here!
