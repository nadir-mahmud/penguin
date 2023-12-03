import express from "express";
import {
  getReviewsController,
  updateReviewController,
} from "../controllers/reviewController.js";

const router = express.Router();

//get all products
router.put("/update", updateReviewController);
router.post("/reviews", getReviewsController);

export default router;
