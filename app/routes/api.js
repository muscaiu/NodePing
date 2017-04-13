'use strict'

var Machine = require('../models/MachineModel')
var ping = require('ping');
var http = require('http');

module.exports = function (router) {

    var hosts = []

     function UpdatHosts() {
        Machine.find({}, function (err, machineList) {
            if (!err) {
                hosts = machineList
            } else {
                console.log(err)
            }
        })
    }
    UpdatHosts()

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

    router.post('/newMachine', function (req, res) {
        console.log(req.body.newMachine)
        var machine = new Machine()
        machine.Ip = req.body.newMachine.Ip
        machine.Department = req.body.newMachine.Dpt
        machine.Processor = req.body.newMachine.Proc

        machine.save(function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('data save ok')
            }
        })
        res.send(req.body.newMachine)
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