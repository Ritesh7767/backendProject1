const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ]
})

module.exports = mongoose.model("Post", postSchema)