import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary"

import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"

import { connectDB } from "./services/connectDB.js"


dotenv.config("");
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.get("/*splat", (req, res) => {
    res.status(404).send("Page not found : 404");
})

app.listen(PORT, () => {
    connectDB();
    console.log(`+ Listening on port ${PORT}`);
});