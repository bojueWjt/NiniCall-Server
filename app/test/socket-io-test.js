const assert = require('chai').assert;
var socket = require('socket.io-client')('http://127.0.0.1');

socket.on('connect', function(){});

socket.on('message', function (data) {
    assert.equal(data, "王嘉涛是sb吗?");
});

describe('Test socket is API', function() {

    describe('send message API', function() {

        it('should return message', function() {
            sendMessage("王嘉涛是sb吗?");
        })
    });
});

//socket.on('disconnect', function(){});

function sendMessage(data) {
    socket.emit("message", {content: data});
}