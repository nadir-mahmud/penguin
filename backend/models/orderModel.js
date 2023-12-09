import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
    },

    user_id: {
      type: String,
      required: true,
    },
    product_photo: {
      type: String,
    },
    product_description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Orders", orderSchema);
