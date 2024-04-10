const mongoose = require('mongoose')

const ScheduleSchema = mongoose.Schema({
    date : {
        type : Date,
        required : [true , 'Date is required'],
        timezone: true
    },
    plans : [{
        name : {
            type : String,
            required : [true , 'Name of activity is required']
        },
        time : {
            type : String,
            required : [true , 'Time is required']
        }
    }],
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true , 'Creator is required']
    }
})



module.exports = mongoose.model('Schedule' , ScheduleSchema)