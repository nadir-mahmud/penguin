import express from "express";
import {
  getOrderController,
  insertManyOrdersController,
} from "../controllers/orderController.js";

const router = express.Router();

//router.put("/cart", insertCartController);
router.post("/insert-orders", insertManyOrdersController);
router.post("/orders", getOrderController);

//router.post("/delete-cart", deleteCartController);

export default router;
