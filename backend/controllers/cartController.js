import cartModel from "../models/cartModel.js";

export const insertCartController = async (req, res) => {
  try {
    const {
      product_id,
      product_name,
      product_photo,
      product_description,
      user_id,
      quantity,
      totalPrice,
    } = req.body;

    const cart = await cartModel.findOneAndUpdate(
      { product_id, user_id },
      {
        product_id,
        product_name,
        product_description,
        user_id,
        product_photo,
        quantity,
        totalPrice,
      },
      {
        upsert: true, // This will insert a new document if not found
        new: true,
      }
    );
    await cart.save();

    res.status(201).send({
      success: true,
      message: "Cart item added Successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in inserting cart item",
      error,
    });
  }
};

export const getCartController = async (req, res) => {
  try {
    const { user_id } = req.body;
    const carts = await cartModel.find({ user_id });

    res.status(200).send({
      success: true,
      counTotal: carts.length,
      message: "AllCarts ",
      carts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting carts",
      error: error.message,
    });
  }
};

export const deleteCartController = async (req, res) => {
  try {
    const { product_id, user_id } = req.body;
    const carts = await cartModel.findOneAndDelete({ product_id, user_id });
    res.status(200).send({
      success: true,
      counTotal: carts.length,
      message: "AllCarts ",
      carts,
    });

    if (carts.deletedCount === 1) {
      console.log("Document deleted successfully.");
    } else {
      console.log("Document not found.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};
