import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    phtoto: {
      type: String,
    },
    shipping: {
      type: Boolean,
    },
    rating: {
      type: Number,
    },
    totalReviews: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
