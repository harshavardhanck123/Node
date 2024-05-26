const mongoose = require('mongoose');


const jobsSchema= new mongoose.Schema({
    title:String,
    description:String,
    location:String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    Status:{
        type:String,
        enum: ['Open', 'Close'],
        default: 'Open'
    },
    type:{
        type:String,
        enum:['Full-Time','Part-Time','Freelance'],
        default:'Full-Time'
    },
    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }   

})

module.exports=mongoose.model('Job',jobsSchema,'jobs')