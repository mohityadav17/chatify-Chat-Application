import express from "express";
import { currentUser } from "../controllers/user.controllers.js";
import isAuth from "../middleware/isAuth.js";

const userRouter = express.Router();
userRouter.post("/user", isAuth,currentUser);



export default userRouter;