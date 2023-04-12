import express from "express";
import { getProfile, login, logout, register, temporary, updateName } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/logout").get(logout)

router.route("/me").get(isAuthenticated, getProfile)

router.route("/name/:name").post(isAuthenticated, updateName)

router.route("/check").post(temporary)


export default router;