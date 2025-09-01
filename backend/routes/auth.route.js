import express from "express"

import { signup, login, logout } from "../controller/auth.controller.js";
import { jwtTokenVerifier } from "../lib/middleware/jwtTokenVerify.js";

const route = express.Router();

route.post("/signup", signup);

route.post("/login", login);

route.post("logout", logout);

route.get("/me", jwtTokenVerifier, (req, res) => {
    res.send("pass jwt verify");
})

export default route;