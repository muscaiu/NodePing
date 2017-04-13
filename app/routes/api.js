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

    function scan() {
        hosts.forEach(function (host) {
            ping.promise.probe(host.Ip, {
                timeout: 1,
                //min_reply: 3,
                // extra: ["-i 2"],
            }).then(function (res) {
                Machine.findOneAndUpdate({ Ip: host.Ip }, {Status: res.alive},{ new: true }, function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        // console.log('update Status ok---')
                    }
                })

            });
        });
        setTimeout(scan, 5000);
    }

    scan();

    router.post('/newMachine', function (req, res) {
        console.log(req.body.newMachine)
        var machine = new Machine()
        machine.Ip = req.body.newMachine.Ip
        machine.Department = req.body.newMachine.Department
        machine.Processor = req.body.newMachine.Processor

        machine.save(function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('data save ok')
            }
        })
        res.send(req.body.newMachine)
    })

    router.post('/getAllMachines', function (req, res) {
        Machine.find({}, function (err, allMachines) {
            if (!err) {
                res.send(allMachines)
                // LogMessage(req.body.username, 'get all Int', 'success')
            } else {
                // LogMessage(req.body.username, 'get all Int', 'error')
                console.log(err)
            }
        })
    })

    return router //return whatever the route is
}