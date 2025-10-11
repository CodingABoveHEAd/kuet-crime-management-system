import express from "express";
import { createMessage, getAllMessages } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/all", getAllMessages);

export default router;
