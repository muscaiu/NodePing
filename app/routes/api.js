'use strict'

var ping = require('ping');
var http = require('http');

module.exports = function (router) {

    var hosts = ['192.168.1.1', '8.8.8.8', '192.168.0.4'];
    var messages = [];

    function test() {
            hosts.forEach(function (host) {
                ping.promise.probe(host, {
                    timeout: 3,
                    min_reply: 2,
                    // extra: ["-i 2"],
                }).then(function (res) {
                    //console.log(`${res.host} ${res.alive} ${res.time}`);
                    messages.push(`${res.host} - ${res.alive}`)
                    pingArray(res.alive)
                });
            });
        messages = [];
        setTimeout(test, 3000);
    }

    test();

    router.post('/getData', function (req, res) {
        console.log(messages)
        res.send(messages)
    })

    return router //return whatever the route is
}