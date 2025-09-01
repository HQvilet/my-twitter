import express from "express"
import { jwtTokenVerifier } from "../lib/middleware/jwtTokenVerify.js";
import { commentOnPost, createPost, likeOrUnlikePost } from "../controller/post.controller.js";

const route = express.Router();

route.use(jwtTokenVerifier);

route.post("/create", createPost)
route.post("/comment/:id", commentOnPost)
route.post("/like/:id", likeOrUnlikePost)

export default route;
