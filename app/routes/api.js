'use strict'

var Ip = require('../models/ip')
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
                //min_reply: 3,
                // extra: ["-i 2"],
            }).then(function (res) {
                //console.log(`${res.host} ${res.alive} ${res.time}`);
                messages.push({ ip: res.host, status: res.alive, time: res.time })
            });
        });
        // messages.forEach(function(ip){
        //     console.log( '---', ip.ip, ip.status, ip.time)
        // })
        messages = [];
        setTimeout(scan, 5000);
    }

    scan();

    router.post('/getData', function (req, res) {
        // messages.forEach(function(ip){
        //     console.log( '+++', ip.ip, ip.status, ip.time)
        // })
        res.send(messages)
    })

    router.post('/newIp', function (req, res) {
        console.log(req.body.newIp)
        var ip = new Ip()
        ip.Ip = req.body.newIp.Ip
        ip.Department = req.body.newIp.Dpt
        ip.Processor = req.body.newIp.Proc

        // if (req.body.nomecognome === null || req.body.nomecognome === undefined || req.body.nomecognome === '' ||
        //     req.body.sesso === null || req.body.sesso === undefined || req.body.sesso === '' ||
        //     req.body.email === null || req.body.email === undefined || req.body.email === '') {
        //     res.json({ success: false, message: 'Empty fields' })
        // } else {
        ip.save(function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('data save ok')
            }
        })
        res.send(req.body.newIp)
    })

    return router //return whatever the route is
}