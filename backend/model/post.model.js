import { text } from "express"
import mongoose from "mongoose"
import User from "./user.model.js"

const postScheme = new mongoose.Schema({
    creator : { type: mongoose.Schema.Types.ObjectId, ref:"User", require:true},
    content : {
        text : {type: String},
        img : [{type: String}]
    },
    likeCount : {type: Number, require: true, default: 0},
    likes : [{type: mongoose.Schema.Types.ObjectId, ref: "User", default: []}],
    commentCount : {type: Number, require: true, default: 0},
    comments : [new mongoose.Schema({
        user : {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
        context : {type: String, require: true}
    }, {timestamps: true})],

},{timestamps:true})

const Post = mongoose.model("Post", postScheme);

export default Post;