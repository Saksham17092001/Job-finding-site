const mongoose = require("mongoose")
const jobSchema = new mongoose.Schema({

    companyName :{
        type : String,
        required : true
    },
    logoURL :{
        type: String,
        required : false,
    },
    jobPosition :{
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    jobType : {
        type : String,
        required : true,
        enum : ["full-time", "part-time", "contract" , "internship" , "Freelance"]
    },
    remoteOrOffice:{
        type: String,
        required: true
    },
    location: {
        type: String,
        required: function () {
            return this.remoteOrOffice === "office";
        } 
    },
    jobDescription: {
        type: String,
        required: true
    },
    aboutCompany: {
        type: String,
        required: true 
    },
    skillsRequired: {
        type: [String],
        required: true
    },
    additionalInfo: {
        type: String,
        required: false 
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
})

module.exports = mongoose.model("Job", jobSchema)