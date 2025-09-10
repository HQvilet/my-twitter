import bcrypt from "bcryptjs"
import User from "../model/user.model.js"
import { generateTokenAndSetCookies } from "../lib/utils/generateToken.js";
import { hashPassword } from "../lib/utils/utils.js";

export const signup = async (req, res) => {
    try{
        const {fullname, username, email, password} = req.body;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({ error:"Invalid email format." })
        }

        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({ error:"Existing email." })
        }

        const hashedPassword = await hashPassword(password)

        const newUser = new User({
            fullname,
            username,
            email,
            password:hashedPassword
        })

        if(newUser){
    
            generateTokenAndSetCookies(newUser._id, res);
    
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,

            });
    
            await newUser.save();
    
        }
        else{
            return res.status(400).json({ error:"Invalid user data." })
        }
    }
    catch(error){
        res.status(500).json({error:"Internal server error."})
    }


}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        console.log(email, password);

        const user = await User.findOne({email}).select("email password");
        if(!user){
            return res.status(400).json({ error:"Email not found plz sign up" })
        }

        console.log(user);
        const isPasswordCorrect = await bcrypt.compare(password, user.password || "")
        if(!isPasswordCorrect){
            return res.status(400).json({ error:"Invalid password"})
        }
        
        
        generateTokenAndSetCookies(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg
        });
    }
    catch(error){
        res.status(500).json({error:"Internal server error."})
    }

}

export const logout = async (req, res) => {
    try{
        res.cookies("jwt", "", {maxAge: 0 });
        res.status(200).json({ message:"Log out successfully" })
    }
    catch(error){
        res.status(500).json({error:"Internal server error."})
    }
}