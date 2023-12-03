import express from "express";
import { getSearchController } from "../controllers/searchController.js";

const router = express.Router();

router.post("", getSearchController);

export default router;
