import express from "express";
import { generateImage } from "../controllers/GeneratedimageAi";

const router = express.Router();
router.get("/", generateImage);

export default router;
