'use strict'

var Ip = require('../models/ip')
var ping = require('ping');
var http = require('http');

module.exports = function (router) {

    var hosts = []

    var UpdatHosts = function () {
        Ip.find({}, function (err, ipList) {
            if (!err) {
                hosts = ipList
            } else {
                console.log(err)
            }
        })
    }
    UpdatHosts()
    console.log(hosts)

    // var hosts = [
    //     '192.168.1.1',
    //     '8.8.8.8',
    //     '192.168.0.1',
    //     '192.168.0.3',
    //     '192.168.0.4'
    // ];
    var messages = [];

    function scan() {
        hosts.forEach(function (host) {
            ping.promise.probe(host.Ip, {
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

        ip.save(function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('data save ok')
            }
        })
        res.send(req.body.newIp)
    })

    //http://127.0.0.1:3000/api/getinterviews
    router.post('/geti', function (req, res) {
        Interview.find({}, function (err, interviews) {
            if (!err) {
                res.send(interviews)
                LogMessage(req.body.username, 'get all Int', 'success')
            } else {
                LogMessage(req.body.username, 'get all Int', 'error')
                console.log(err)
            }
        })
    })

    return router //return whatever the route is
}