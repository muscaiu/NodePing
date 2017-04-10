var express = require('express')
var app = express()
var port = 4000
var bodyParser = require('body-parser')
var router = express.Router()
var path = require('path')

var appRoutes = require('./app/routes/api')(router)

app.use(bodyParser.json()) //for parsing the json 
app.use(bodyParser.urlencoded({ extended: true })) //for parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'))
app.use('/api', appRoutes) //to deconflict te backend and the frontend routes

//Load Index.html
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
})

//Start server on 4000
app.listen(port, function() {
    console.log('server is running on', port)
})