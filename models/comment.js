const mongoose = require ("mongoose")


const commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    }
})

module.exports = mongoose.model("comment", commentSchema)