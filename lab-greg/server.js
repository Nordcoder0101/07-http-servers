'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parsebody.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  let message = '';
  // let queryMessage = message.url.query = querystring.parse(message.url.query);
  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    res.writeHead(200, 'Hello from my server', {
      'Content-Type': 'text/plain'
    });
    res.write(cowsay.say({ text: 'moooo'}));
    if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.pathname === `/cowsay text=${message}`) {
      res.writeHead(200, {
        'text': message
      });
      res.end();
    } else {
      res.writeHead(400, {
        'text': 'bad request'
      });
    }
  }
  if(req.method === 'POST' || req.method === 'PUT') {
    parseBody(req, function(err) {
      if(err) throw err;
      console.log('request body', req.body);
    });
  }
  
});


server.listen(PORT, () => {
  console.log(`server is all good on ${PORT}`);
});