var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MachineSchema = new Schema({
    Ip: String,
    Status: Boolean,
    DayStatus: [
        {
            StoredDate: { type: Date, default: Date.now },
            StoredStatus: { type: Boolean }
        }
    ],
    Department: { type: String },
    Processor: { type: String },
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

// InterviewSchema.pre('save', function(next) {
//     var interview = this
//     console.log(interview.dataapplicazione);
//     next()
// })


module.exports = mongoose.model('Ip', MachineSchema)