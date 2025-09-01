
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type : String, require : true},
    fullname: {type : String, require : true},
    email: {type : String, require : true},
    password: {type : String, require : true, minLength : 6},
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref:"User", default:[]}],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref:"User", default:[]}],
    profileImg: {type : String},
    coverImg: {type : String},
    bio: {type : String},

},
{timestamps : true})

const User = mongoose.model("User", userSchema);

export default User;

