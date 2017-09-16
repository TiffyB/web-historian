var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback) {

  fs.readFile(exports.paths.list, function(error, data) {
    var urls = data.toString('utf8').split('\n');
    callback(urls);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urls) {
    var exists = false;
    urls.forEach(function(storedUrl) {
      if (storedUrl === url) {
        // console.log(callback(true));
        exists = true; 
      }
    });
    // return false;
    callback(exists);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, function(data) {
    callback();
  });

};

exports.isUrlArchived = function(url, callback) {
  fs.stat(exports.paths.archivedSites + '/' + url, function(err, stats) {
    if (err) {
      if (err.code === 'ENOENT') {
        callback(false);
      }
    }
    callback(true);
  });
};

exports.downloadUrls = function(urls) {
  urls.forEach(function(url) {
    var fixturePath = exports.paths.archivedSites + '/' + url;
    var siteData = fs.createWriteStream(fixturePath);
    http.get('http://' + url, function(res) {
      res.pipe(siteData);
      siteData.on('finish', function() {
        siteData.close(function(err) {
          console.log(err);
        });
      });
    });
  });
};





