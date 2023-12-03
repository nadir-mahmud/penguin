import express from "express";
import {
  getProductController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

//get all products
router.get("/all", getProductController);

router.put("/update", updateProductController);

export default router;
