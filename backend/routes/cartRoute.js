import express from "express";
import {
  deleteCartController,
  deleteManyCartController,
  getCartController,
  insertCartController,
} from "../controllers/cartController.js";

const router = express.Router();

router.put("/cart", insertCartController);
router.post("/all-carts", getCartController);
router.post("/delete-cart", deleteCartController);
router.delete("/delete-many-cart", deleteManyCartController);

export default router;
