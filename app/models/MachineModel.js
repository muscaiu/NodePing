var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MachineSchema = new Schema({
    Ip: { type: String },
    Status: {type: Boolean},
    Department: { type: String },
    Processor: { type: String},
})

// InterviewSchema.pre('save', function(next) {
//     var interview = this
//     console.log(interview.dataapplicazione);
//     next()
// })


module.exports = mongoose.model('Ip', MachineSchema)