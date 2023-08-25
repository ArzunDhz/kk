import express from "express";
import { isUserAuthincated } from "../middleware/Auth.js";
import {
  establishConnnection,
  getMyConnection,
  sendMessage,
  getMessages,
} from "../controllers/connectionController.js";

const router = express.Router();

router.post("/connect/:userId", isUserAuthincated, establishConnnection);
router.get("/getMyConnection", isUserAuthincated, getMyConnection);

router.post("/sendMessage", isUserAuthincated, sendMessage);
router.get("/getMessage/:id", isUserAuthincated, getMessages);

export default router;
