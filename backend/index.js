import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import reviewRoutes from "./routes/reviewRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import searchRoutes from "./routes/searchRoute.js";

dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/product", reviewRoutes);
app.use("/api", cartRoutes);
app.use("/api/search", searchRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.NAME} mode on port ${PORT}`.bgCyan.white
  );
});
