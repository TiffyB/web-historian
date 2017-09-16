var path = require('path');
var archive = require('../helpers/archive-helpers');
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
      
      console.log(req.url);
      if (req.url === '/') {
        asset = './web/public/index.html';
        serveAssets(res, asset, writeToBody);
      } else if (req.url.includes(".css") || req.url.includes(".ico")) {
        asset = './web/public' + req.url;
        serveAssets(res, asset, writeToBody);
      } else {
        asset = './archives/sites' + req.url + "/google/";
        console.log('asset: ', asset);
        serveAssets(res, asset, writeToBody);
      }
    },
    'POST': () => {
      var asset = '';
      req.on('data', function(chunk) {
        asset += chunk;
      });
      req.on('end', function() {
        asset = JSON.stringify(asset).slice(5, -1);
        console.log(asset);
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
