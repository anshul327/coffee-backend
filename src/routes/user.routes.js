import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

//now inside /api/v1/users, we have different routes i.e. register, login, etc...
//to which controllers are mapped

router.route("/register").post(registerUser)

export default router