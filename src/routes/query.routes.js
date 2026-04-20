import express from "express";
import { createQuery, getUserQueries } from "../controllers/queryController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();


router.use(protect);


router.post("/", createQuery);

router.get("/", getUserQueries);

export default router;
