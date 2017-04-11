'use strict'

var ping = require('ping');
var http = require('http');

module.exports = function (router) {

    var hosts = [
        '192.168.1.1',
        '8.8.8.8',
        '192.168.0.1',
        '192.168.0.3',
        '192.168.0.4'
    ];
    var messages = [];

    function scan() {
        hosts.forEach(function (host) {
            ping.promise.probe(host, {
                timeout: 1,
                //min_reply: 2,
                // extra: ["-i 2"],
            }).then(function (res) {
                //console.log(`${res.host} ${res.alive} ${res.time}`);
                messages.push({ ip: res.host, status: res.alive, time: res.time })
            });
        });
        console.log('before',messages.length)
        messages = [];
        setTimeout(scan, 5000);
    }

    scan();

    router.post('/getData', function (req, res) {
        console.log('after',messages.length)
        res.send(messages)
    })

    return router //return whatever the route is
}