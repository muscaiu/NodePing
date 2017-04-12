var express = require('express')
var app = express()
var port = 4000
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var router = express.Router()
var path = require('path')

mongoose.Promise = global.Promise; //deprecation warning goes before appRoutes
var appRoutes = require('./app/routes/api')(router)

app.use(bodyParser.json()) //for parsing the json 
app.use(bodyParser.urlencoded({ extended: true })) //for parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'))
app.use('/api', appRoutes) //to deconflict te backend and the frontend routes

//Connect to Mongo
mongoose.connect('mongodb://localhost:27017/bitechit', function(err) {
    if (err) {
        console.log('not connected to the db', err)
    } else {
        console.log('connected to Mongo');
    }
})
//Load Index.html
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
})

//Start server on 4000
app.listen(port, function() {
    console.log('server is running on', port)
})