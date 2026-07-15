import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import isAuth from "../middleware/isAuth.js";
import multer from "multer";
import { upload } from "../middleware/multer.js";

const messageRouter = express.Router();

messageRouter.post("/send/:receiver", isAuth,upload.single("image"),sendMessage);
messageRouter.get("/get/:receiver", isAuth,getMessages);






export default messageRouter;