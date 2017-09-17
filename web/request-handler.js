var path = require('path');
var archive = require('../helpers/archive-helpers');
isUrlArchived = archive.isUrlArchived;
var paths = archive.paths;
var url = require('url');
var fs = require('fs');
var http = require('./http-helpers.js');
serveAssets = http.serveAssets;
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var path = req.url.pathname;
  console.log('serving request type: ', req.method, 'for url', req.url);  
  // console.log();
  var responseBody;
  var asset;

  var writeToBody = (data) => {
    responseBody = data;
  };

  var actions = {
    'GET': () => {
      if (req.url === '/') {
        asset = paths.siteAssets + '/index.html';
        serveAssets(res, asset, writeToBody);
      } else if (req.url.includes('.css') || req.url.includes('.ico')) {
        asset = paths.siteAssets + req.url;
        serveAssets(res, asset, writeToBody);
      } else if (req.url.includes('www.')) {
        asset = paths.archivedSites + req.url;
        serveAssets(res, asset, writeToBody);
      } else {
        res.statusCode = 404;
        res.end();
      }
    },

    'POST': () => {
      var asset = '';
      //get the asset
      req.on('data', function(chunk) {
        asset += chunk;
      });
      req.on('end', function() {
        asset = JSON.stringify(asset).slice(5, -1);
        res.statusCode = 302;
        archive.isUrlInList(asset, (exists) => {
          if (exists) {
            //if the url is in the list
            archive.isUrlArchived(asset, function(exists) {
              if (exists) {
                //if the URL has a directory
                serveAssets(res, paths.siteAssets + '/' + req.url, writeToBody);
              } else {
                //if the URL does not yet have a directory
                serveAssets(res, paths.siteAssets + '/loading.html', writeToBody);
              }
            });
          } else {
            //if the url is not in the list
            archive.addUrlToList(asset, ()=> { serveAssets(res, paths.siteAssets + '/loading.html', writeToBody); });
          }
        });
      });
    }
  };

  var action = actions[req.method];
  action();
};
