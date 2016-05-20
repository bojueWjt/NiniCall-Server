const config = require('../config');
const bcrypt = require('bcrypt');
const md5 = require('blueimp-md5');
const http = require('http');
const queryString = require('querystring');
const axios = require('axios');

const requestSendMessage = function(phoneNum, content, cb) {
  const password = md5(config.DXBPassword);
  const account = config.DXBAccount;
  const path = '/sms?' + queryString.stringify({
    u: account,
    p: password,
    m: phoneNum,
    c: content,
  });

  http.get(config.sendMessageApiBaseURL + path, (res) => {
    console.log(`Got response: ${res.statusCode}`);
    // consume response body
    // res.resume();
    res.on('data', function(chunk) {
      if (chunk.toString() === '0') {
        cb();
      }
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
};


exports.sendMessage = requestSendMessage;