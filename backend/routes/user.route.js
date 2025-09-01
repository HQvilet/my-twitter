import express from "express"
import { jwtTokenVerifier } from "../lib/middleware/jwtTokenVerify.js";
import { getUserProfile } from "../controller/user.controller.js";

const route = express.Router();

route.use(jwtTokenVerifier);

route.get("/profile/:user", getUserProfile)

// route.follow("/follow/:id", )
// route.get("/profile/:user", )

export default route;