import express from "express";
import { uploadFile, getUserFiles } from "../controllers/fileController.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../multer/multer.js";

const router = express.Router();


router.use(protect);


router.post("/upload", upload.single("file"), uploadFile);


router.get("/", getUserFiles);

export default router;
