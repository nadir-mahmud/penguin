import reviewModel from "../models/reviewModel.js";

export const updateReviewController = async (req, res) => {
  try {
    const { product_id, user_id, user_name, stars, review } = req.body;
    const reviewUpdate = await reviewModel.findOneAndUpdate(
      { product_id, user_id },
      { product_id, user_id, user_name, stars, review },
      {
        upsert: true, // This will insert a new document if not found
        new: true,
      }
    );
    await reviewUpdate.save();

    res.status(200).send({
      success: true,
      message: "review ",
      reviewUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in inserting review",
      error: error.message,
    });
  }
};

export const getReviewsController = async (req, res) => {
  try {
    const { product_id } = req.body;
    const reviews = await reviewModel.find({ product_id }).sort({ stars: -1 });
    console.log(req.body);
    res.status(200).send({
      success: true,

      message: "All Reviews ",
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting reviews",
      error: error.message,
    });
  }
};
