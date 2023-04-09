const mongoose = require("mongoose")

let todoSchema = mongoose.Schema({
    text:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Task",todoSchema)