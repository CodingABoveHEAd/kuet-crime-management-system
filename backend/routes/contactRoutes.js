import express from "express";
import {
  createMessage,
  getAllMessages,
  deleteMessage,
} from "../controllers/contactController.js";

import { isLoggedin } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/contact
router.post("/", createMessage);

// GET /api/contact/all
router.get("/all", isLoggedin,getAllMessages);

// DELETE /api/contact/:id
router.delete("/:id", isLoggedin,deleteMessage);

export default router;
