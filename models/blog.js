const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        require: true
    }
}, { timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;