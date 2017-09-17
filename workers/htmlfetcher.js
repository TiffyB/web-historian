//script goes here
var archive = require('../helpers/archive-helpers');
var fs = require('fs');


archive.readListOfUrls(function(urls) {
  urls.forEach(function(url) {
    archive.isUrlArchived(url, function(exists) {
      if (!exists) {
        archive.downloadUrls([url]);
      }
    });
  });
});





