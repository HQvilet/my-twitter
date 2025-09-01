import { getImgNameFromUrl, hashPassword } from "../lib/utils/utils.js";
import User from "../model/user.model.js";
import {v2 as cloudinary} from "cloudinary"

export const getUserProfile = async (req, res) => {
    try{
        const {id} = req.params;

        const user = await User.findById(id).select("-password");
        if(!user){
            res.status(400).json({error:"User not found."})
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error:"Internal server error."})
    }
    
}

export const followOrUnfollowUser = async (req, res) => {
    try{
        const {id} = req.params;

        const currentUser = await User.findById(req.user._id);
        const userToModify = await User.findById(id);

        if(!userToModify || !currentUser){
            res.status(400).json({error:"User not found."})
        }

        if(currentUser._id.toString() === userToModify._id.toString()){
            res.status(400).json({error:"Cannot follow yourself."})
        }

        if(currentUser.following.includes(userToModify._id)){
            // Unfollow user
            await User.findByIdAndUpdate(userToModify._id, {$pull: {followers : currentUser._id}});
            await User.findByIdAndUpdate(currentUser._id, {$pull: {following : userToModify._id}});
            res.status(400).json({message:"Unfollow successfully"})
        }
        else{
            // Follow user
            await User.findByIdAndUpdate(userToModify._id, {$push: {followers : currentUser._id}});
            await User.findByIdAndUpdate(currentUser._id, {$push: {following : userToModify._id}});
            res.status(400).json({message:"Follow successfully"})
        }

    }catch(error){
        res.status(500).json({error:"Internal server error."})
    }
}

export const updateUserInfo = async (req, res) => {
    const {username, fullname, profileImg, coverImg, bio, currentPassword, newPassword} = req.body;


    try {
        const user = await User.findById(req.user._id);
        if(!user){
            res.status(400).json({error:"User not found."})
        }

        if(currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword, user.password)
            if(!isMatch){
                return res.status(400).json({error:"Current password is incorrect."})
            }
            
            user.password = await hashPassword(newPassword);
        }
        
        if(profileImg){            
            if(user.profileImg){
                await cloudinary.uploader.destroy(getImgNameFromUrl(user.profileImg));
            }
            const uploadRes = await cloudinary.uploader.upload(profileImg);

            if(uploadRes)
                user.profileImg = uploadRes.secure_url;
        }

        if(coverImg){
            if(user.coverImg){
                await cloudinary.uploader.destroy(getImgNameFromUrl(user.coverImg));
            }
            const uploadRes = await cloudinary.uploader.upload(coverImg);
            if(uploadRes)
                user.coverImg = uploadRes.secure_url;
        }

        user.fullname = fullname || user.fullname;
        user.username = username || user.username;
        user.bio = bio || user.bio;

        user = await user.save();
        return res.status(200).json(user.select("-password"))

    } catch (error) {
        
    }

}