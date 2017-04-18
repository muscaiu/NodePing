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
                Machine.findOneAndUpdate({ Ip: host.Ip }, { Status: res.alive }, { new: true }, function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        //console.log(res.alive)
                    }
                })

            });
        });
        console.log(hosts.length)
        UpdatHosts()
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
                //console.log(allMachines)
                res.send(allMachines)
                //console.log('------------')
                // LogMessage(req.body.username, 'get all Int', 'success')
            } else {
                // LogMessage(req.body.username, 'get all Int', 'error')
                console.log(err)
            }
        })
    })

    router.get('/getClickedMachine/:id', function (req, res) {

        Machine.findOne({ _id: req.params.id }).select().exec(function (err, item) {
            if (err) throw err;
            if (!item) {
                console.log("Can't find id to edit.", 'error')
            } else {
                res.json({ item })
            }
        })
    })

    router.put('/editMachine/:id', function (req, res) {


        let updateMachine = {
            Ip: req.body.updateMachine.Ip,
            Department: req.body.updateMachine.Department,
            Processor: req.body.updateMachine.Processor
        }
        // if (updateMachine.Ip === null || updateMachine.Ip === undefined) delete updateMachine.Ip
        // if (updateMachine.Department === null || updateMachine.Department === undefined) delete updateMachine.Department
        // if (updateMachine.Processor === null || updateMachine.Processor === undefined) delete updateMachine.Processor

        console.log(updateMachine)

        Machine.findOneAndUpdate({ _id: req.params.id }, updateMachine, { new: true }, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('update ok')
            }
        });
    })


    return router //return whatever the route is
}