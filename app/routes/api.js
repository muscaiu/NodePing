'use strict'

var MachineModel = require('../models/MachineModel')
var UptimeModel = require('../models/UptimeModel')
var ping = require('ping');
var http = require('http');
var moment = require('moment')

module.exports = function (router) {

    var hosts = []

    function UpdatHosts() {
        MachineModel.find({}, function (err, machineList) {
            if (!err) {
                hosts = machineList
            } else {
                console.log(err)
            }
        })
    }

    var startTime = moment()

    function DbTimer(before) {
        var after = moment()
        return after.diff(before, 'seconds')
    }

    function scan() {
        UpdatHosts()
        hosts.forEach(function (host) {
            ping.promise.probe(host.Ip, {
                timeout: 1,
                //min_reply: 3,
                // extra: ["-i 2"],
            }).then(function (res) {
                MachineModel.findOneAndUpdate({ Ip: host.Ip }, { Status: res.alive }, { new: true }, function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        //console.log(res.alive)
                    }
                })

            });
        });
        setTimeout(scan, 5000);
    }

    //   today     - Ip - timestamp
    //                  - status
    //   yesterday - Ip - timestamp
    //                  - status
    //   daybefore - Ip - timestamp
    //                  - status

    function AddValues() {
        if (DbTimer(startTime) <= 100 && DbTimer(startTime) >= 10) { //add DB values
            console.log(DbTimer(startTime))
            MachineModel.find({}, function (err, machines) {
                if (!err) {
                    machines.forEach(function (machine) {
                        //Update Status each 1 minute
                        MachineModel.findByIdAndUpdate(machine._id, {
                            $push:
                            {
                                "DayStatus": {
                                    StoredDate: startTime, StoredStatus: machine.Status
                                }
                            }
                        }, { new: true },
                            function (err, data) { //callback
                                //console.log(data);
                            }
                        )
                        UptimeModel.findByIdAndUpdate(machine._id, {
                            $push:
                            {
                                StoredDate: startTime,
                                StoredStatus: machine.Status
                            }
                        }, { new: true },
                            function (err, data) { //callback
                                //console.log(data);
                            }
                        )

                        //Add Uptime, Downtime, Total to DB
                        MachineModel.aggregate([
                            { $unwind: "$DayStatus" }, {
                                $group: {
                                    _id: { Ip: "$Ip", StoredStatus: "$DayStatus.StoredStatus", Total: { $sum: { $add: ["$Uptime", "$Downtime"] } } },
                                    // totalthings: { $sum: "$DayStatus.StoredStatus" },
                                    count: { $sum: 1 }
                                }
                            }
                        ], function (err, data) {
                            data.forEach(function (countStatus) {
                                var uptimeData = {}

                                if (countStatus._id.StoredStatus === true) { //if status is online
                                    uptimeData.Uptime = countStatus.count
                                } else {    //if status is offline
                                    uptimeData.Downtime = countStatus.count
                                }

                                uptimeData.Total = countStatus._id.Total + 1
                                // uptimeData.Percent = Math.floor((uptimeData.Uptime / uptimeData.Total + 1) *100)

                                MachineModel.findOneAndUpdate({ Ip: countStatus._id.Ip }, uptimeData, { new: true }, function (err) {
                                    if (err) {
                                        // console.log(err)
                                        console.log(countStatus._id.Ip, 'Error: findOneAndUpdate uptimeData')
                                    } else {
                                        //console.log(uptimeData)
                                    }
                                });
                                //console.log(countStatus)
                                // console.log(uptimeData.Percent)
                            })
                        })
                        console.log('uptime', machine.Uptime)
                        console.log('total', machine.Total)
                        function percentage(uptime, total) {
                            return (uptime / total) * 100;
                        }

                        // var percent = (machine.Ip, Math.floor((machine.Uptime / machine.Total) * 100))
                        var percent = (percentage(machine.Uptime, machine.Total));

                        MachineModel.findOneAndUpdate({ Ip: machine.Ip }, { Percent: percent }, { new: true }, function (err) {
                            if (err) {
                                console.log(machine.Ip, 'Error: findOneAndUpdate Percent:', percent)
                                // console.log(err)
                            } else {
                                //console.log('update ok')
                            }
                        });
                    })

                } else {
                    console.log(err)
                }
            })


        } else if (DbTimer(startTime) > 150) { //reset time
            startTime = moment()
            console.log(DbTimer(startTime))
        }
        setTimeout(AddValues, 60000);
    }

    scan();
    AddValues()

    router.post('/newMachine', function (req, res) {
        console.log(req.body.newMachine)
        var machine = new MachineModel()
        machine.Ip = req.body.newMachine.Ip
        machine.Department = req.body.newMachine.Department
        machine.Processor = req.body.newMachine.Processor
        machine.Uptime = 0
        machine.Downtime = 0
        machine.Total = 0

        machine.save(function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('data save ok')
            }
        })
        res.send(req.body.newMachine)
    })

    router.post('/getMachines', function (req, res) {
        //console.log(req.body.sortOption)
        if (req.body.sortOption === 'All') {
            MachineModel.find({}, function (err, machines) {
                if (!err) {
                    res.send(machines)
                } else {
                    console.log(err)
                }
            })
        } else {
            MachineModel.find({ "Department": req.body.sortOption }, function (err, machines) {
                if (!err) {
                    res.send(machines)
                } else {
                    console.log(err)
                }
            })
        }
    })

    router.get('/getClickedMachine/:id', function (req, res) {

        MachineModel.findOne({ _id: req.params.id }).select().exec(function (err, item) {
            if (err) throw err;
            if (!item) {
                console.log("Can't find id to edit.", 'error')
            } else {
                res.json({ item })
            }
        })
    })

    router.put('/updateMachine/:id', function (req, res) {
        let updateMachine = {
            Ip: req.body.updateMachine.Ip,
            Department: req.body.updateMachine.Department,
            Processor: req.body.updateMachine.Processor
        }
        // if (updateMachine.Ip === null || updateMachine.Ip === undefined) delete updateMachine.Ip
        // if (updateMachine.Department === null || updateMachine.Department === undefined) delete updateMachine.Department
        // if (updateMachine.Processor === null || updateMachine.Processor === undefined) delete updateMachine.Processor

        console.log(updateMachine)

        MachineModel.findOneAndUpdate({ _id: req.params.id }, updateMachine, { new: true }, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('update ok')
                res.send('data update ok')
            }
        });
    })

    router.delete('/deleteMachine/:id', function (req, res) {
        MachineModel.findOne({ _id: req.params.id }).remove().exec(function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('delete ok', data.result.n)
                res.send('data delete ok')
            }
        })
    })


    return router //return whatever the route is
}