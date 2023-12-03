import productModel from "../models/productModel.js";

export const getSearchController = async (req, res) => {
  try {
    const { name } = req.body;
    const products = await productModel.find({
      name: { $regex: name, $options: "i" },
    });

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
