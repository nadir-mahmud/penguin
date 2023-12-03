import express from "express";
import {
  deleteCartController,
  getCartController,
  insertCartController,
} from "../controllers/cartController.js";

const router = express.Router();

router.put("/cart", insertCartController);
router.post("/all-carts", getCartController);
router.post("/delete-cart", deleteCartController);

export default router;
