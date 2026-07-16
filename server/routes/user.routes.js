import express from "express";
import { currentUser, editProfile, getOtherUsers, search } from "../controllers/user.controllers.js";
import isAuth from "../middleware/isAuth.js";
import multer from "multer";
import { upload } from "../middleware/multer.js";

const userRouter = express.Router();
userRouter.get("/current", isAuth,currentUser);
userRouter.put("/profile", isAuth,upload.single("image"),editProfile);
userRouter.get("/others", isAuth,getOtherUsers);
userRouter.get("/search", isAuth,search);






export default userRouter;