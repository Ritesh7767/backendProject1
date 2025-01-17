const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        // unique : true
    },
    email : {
        type : String,
        required : true,
        // unique : true
    },
    password : {
        type : String,
        required : true
    },
    post : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post"
        }
    ]
})

module.exports = mongoose.model("User", userSchema)