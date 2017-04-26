var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UptimeSchema = new Schema({
    StoredDate: { type: Date, default: Date.now },
    StoredStatus: { type: Boolean }
}
    ,
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    })
// Ip: String,
// Status: Boolean,
// Uptime: Number,
// Downtime: Number,
// Total: Number,
// Percent: Number,
//     Department: { type: String },
//     Processor: { type: String },
// }, {
//         timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
//     })

// InterviewSchema.pre('save', function(next) {
//     var interview = this
//     console.log(interview.dataapplicazione);
//     next()
// })


module.exports = mongoose.model('Uptime', UptimeSchema)