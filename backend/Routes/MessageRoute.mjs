import express from "express";
import { sendMessage } from "../Controllers/messageController.mjs";


const messageRouter = express.Router();

messageRouter.post("/send", sendMessage);

export default messageRouter;