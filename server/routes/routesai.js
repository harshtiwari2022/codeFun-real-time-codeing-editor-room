import express from "express";
import { getReview } from "../controllers/roomai.js";

const router = express.Router();

router.post("/get-review", getReview);

export default router;
