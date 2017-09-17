//script goes here
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

var urls = [];

archive.readListOfUrls(function(urls) {
  urls.forEach(function(url) {
    archive.isUrlArchived(url, function(exists) {
      if (!exists) {
        urls.push(url);
      } 
    });
  });

});

archive.downloadUrls(urls);



