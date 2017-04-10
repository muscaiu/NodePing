'use strict'

var ping = require('ping');
var http = require('http');

module.exports = function (router) {

    var hosts = [
        '192.168.1.1',
        '8.8.8.8',
        '192.168.0.1',
        '192.168.0.2',
        '192.168.0.3',
        '192.168.0.4',
        '192.168.0.5',
        '192.168.0.6',
        '192.168.0.7',
        '192.168.0.8',
        '192.168.0.9',
        '192.168.0.10',
        '192.168.0.11',
        '192.168.0.12',
    ];
    var messages = [];

    function test() {
        hosts.forEach(function (host) {
            ping.promise.probe(host, {
                timeout: 1,
                //min_reply: 2,
                // extra: ["-i 2"],
            }).then(function (res) {
                //console.log(`${res.host} ${res.alive} ${res.time}`);
                messages.push({ ip: res.host, status: res.alive })
                pingArray(res.alive)
            });
        });
        console.log(messages, messages.length)
        setTimeout(test, 5000);
        messages = [];
    }

    test();

    router.post('/getData', function (req, res) {
        console.log(messages, messages.length)
        res.send(messages)
    })

    return router //return whatever the route is
}