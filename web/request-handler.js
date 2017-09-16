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
  var reqUrl = url.parse(req.url);  
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
        console.log(asset);
      });
      //stumble through callback hell to write to txt
      var serveLoading = serveAssets(res, paths.siteAssets + '/loading.html', writeToBody);
      archive.isUrlInList(asset, (exists) => {
        if (exists) {
          archive.isUrlArchived(asset, function(exists) {
            if (exists) {
              serveAssets(res, asset, writeToBody);
            } else {
              serveLoading();
            }
          });
        } else {
          archive.addUrlToList(asset, serveLoading);
        }
      });
    }
  };

  
    //generate skeleton response
    //change variable to serber index files

  //else
    //check if endpoint is in sites.txt
      //if endpoint value is true
        //generate skeleton response
        //
      //else
        //add to sites.txt with false value
        //respond to client saying call back later

  // req.on("data", ()=>{
    
  // });
  var action = actions[req.method];
  action();
  // console.log('responsebody', JSON.stringify(responseBody));
  // res.end(JSON.stringify(responseBody));
  // response = JSON.stringify(res);

};
