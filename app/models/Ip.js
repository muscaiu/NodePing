var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var IpSchema = new Schema({
    Ip: { type: String },
    Department: { type: String },
    Processor: { type: String},
})

// InterviewSchema.pre('save', function(next) {
//     var interview = this
//     console.log(interview.dataapplicazione);
//     next()
// })


module.exports = mongoose.model('Ip', IpSchema)