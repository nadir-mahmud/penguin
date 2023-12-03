import productModel from "../models/productModel.js";

export const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "AllProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { _id, totalReviews, rating } = req.body;
    const productUpdate = await productModel.findOneAndUpdate(
      { _id },
      { totalReviews, rating },
      {
        upsert: true, // This will insert a new document if not found
        new: true,
      }
    );
    await productUpdate.save();

    res.status(200).send({
      success: true,
      message: "product update successful ",
      productUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in inserting Product",
      error: error.message,
    });
  }
};
