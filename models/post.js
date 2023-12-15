const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

    username: String
    }, 
     Comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
     ]
})


module.exports = mongoose.model("Post", postSchema)