var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

//after parsing req URL we get the path that user is looking for 
// take req path, and use it for callbacks

exports.readListOfUrls = function(callback) {

  fs.readFile(exports.paths.list, function(error, data) {
    var urls = data.toString('utf8').split('\n');
    callback(urls);
  });
  //navigate to sites.txt
  //provide this path to readFile
  
  //split string with "\n" and assign to variable
  //return resulting array;
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
    callback(data);
  });

};

exports.isUrlArchived = function(url, callback) {
  callback(exports.paths.archivedSites+'/'+url); 
  

};

exports.downloadUrls = function(urls) {
};
