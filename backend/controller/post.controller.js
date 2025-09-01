import { getImgNameFromUrl } from "../lib/utils/utils.js";
import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import {v2 as cloudinary} from "cloudinary"


export const createPost = async (req, res) => {
    const {textcontent, imgcontent} = req.body;
    try{
        // const user = await User.findById(req.user._id);
        // if(!user){
        //     return res.status(404).json({ error:"User not found." })
        // }

        if(!textcontent && !imgcontent){
            return res.status(400).json({ error:"Invalid content fields." })
        }

        const newPost = new Post({
            creator : req.user._id,
            content : {
                text : textcontent,
                img : imgcontent
            },
        })
        if(!newPost){
            return res.status(400).json({ error:"Invalid post request." })
        }

        if(imgcontent){
            imgcontent.forEach(element => {
                // cloudinary.uploader.upload(element);
            });
        }
        await newPost.save();
        return res.status(201).json(newPost);

    }catch(error){
        res.status(500).json({error:`Internal server error : ${error}`})
    }
}

export const deletePost = async (req, res) => {
    try{
        const id = req.params.id;

        const post =  await Post.findByIdAndDelete(id);
        if(!post){
            return res.status(400).json({ error:"Post not found." })
        }

        post.content.imgcontent.forEach(element => {
            // cloudinary.uploader.destroy(getImgNameFromUrl(element));
        })

        res.status(200).json({message: "Delete post successfully"})
    }catch(error){
        res.status(500).json({error:`Internal server error : ${error}`})
    }
}

export const commentOnPost = async (req, res) => {
    
    try {
        const { context} = req.body;
        const postID = req.params.id;
        const userID = req.user._id;


        if(!context){
            return res.status(401).json({ error:"Invalid post data." })
        }

        // const user = await User.findById(req.user._id);
        // if(!user){
        //     return res.status(400).json({ error:"User not found" })
        // }

        const updatedPost = await Post.findByIdAndUpdate(
            postID,
            {
                $push: { comments: { userID, context } },
                $inc: { commentCount: 1 }
            },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found." });
        }

        res.status(201).json({message : "Comment successfully. "})

    } catch (error) {
        res.status(500).json({error:`Internal server error : ${error}`})
    }
}

export const likeOrUnlikePost = async (req, res) => {
    try {
        const userID = req.user._id;

        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ error:"Post not found." })
        }

        const isLiked = post.likes.includes(userID);
        if(isLiked){
            //unlike
            post.updateOne({ $pull: { likes: userID }, $inc: { likeCount: -1 } });
            return res.status(200).json({message: "Post unliked successfully."})
        }
        else{
            //like
            post.updateOne({ $push: { likes: userID }, $inc: { likeCount: 1 } });
            await post.save();
            return res.status(200).json({message: "Post liked successfully."})
        }


    } catch (error) {
        
    }
}