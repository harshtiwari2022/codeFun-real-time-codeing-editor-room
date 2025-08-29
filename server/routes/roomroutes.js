import express from "express";
import { createRoom, joinRoom, leaveRoom, getRooms } from "../controllers/roomcontroller.js";

const router = express.Router();

router.post("/create", createRoom);
router.post("/join", joinRoom);
router.post("/leave", leaveRoom);
router.get("/", getRooms);

export default router;
