import express from "express";
import {
  getAllOrderController,
  getSingleOrderController,
  insertManyOrdersController,
} from "../controllers/orderController.js";

const router = express.Router();

//router.put("/cart", insertCartController);
router.post("/insert-orders", insertManyOrdersController);
router.post("/orders/all", getAllOrderController);
router.post("/order", getSingleOrderController);

//router.post("/delete-cart", deleteCartController);

export default router;
