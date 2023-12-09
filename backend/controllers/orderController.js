import orderModel from "../models/orderModel.js";

export const insertManyOrdersController = async (req, res) => {
  try {
    const orders = req.body;
    const documentsToInsert = orders.map((doc) => ({ ...doc, _id: null }));

    const orderInserted = await orderModel.insertMany(documentsToInsert, {
      ordered: false,
    });

    res.status(201).send({
      success: true,
      message: "Ordered items added Successfully",
      orderInserted,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in inserting ordered item",
      error,
    });
  }
};

export const getOrderController = async (req, res) => {
  try {
    const { user_id } = req.body;

    const orders = await orderModel
      .find({
        user_id: user_id,
      })
      .exec();

    if (orders.length > 0) {
      res.status(200).send({
        success: true,

        message: "All orders ",
        orders,
      });
    } else {
      res.status(200).send({
        success: false,

        message: "empty orders ",
        orders,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting orders",
      error: error.message,
    });
  }
};
