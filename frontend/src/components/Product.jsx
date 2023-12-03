import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Product = ({
  product_photo,
  totalReviews,
  price,
  product_name,
  product_description,
  finalRating,
  product_id,
  user_id,
}) => {
  const ratings = [1, 2, 3, 4, 5];
  const [quantity, setQuantity] = useState(1);
  const [toaster, setToaster] = useState(false);
  const navigate = useNavigate();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreament = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCart = async () => {
    setToaster(true);
    if (user_id) {
      const { data } = await axios.put("http://localhost:8080/api/cart", {
        product_id,
        product_name,
        product_photo,
        product_description,
        user_id,
        quantity,
        totalPrice: quantity * price,
      });
      console.log("toast");

      if (data?.success) {
        console.log(data.success, data.cart);
        toast.success("Added to cart successfully");
      } else {
        console.log(data?.message);
      }
    } else {
      navigate("/login");
    }
  };

  const handleBuy = () => {
    if (user_id) {
      navigate("/payment", { state: quantity * price });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            {toaster ? (
              <Toaster
                containerStyle={{
                  top: 80,
                }}
              />
            ) : null}
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={product_photo}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product_name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {ratings.map((rating) => (
                    <svg
                      fill={rating <= finalRating ? "blue" : "none"}
                      stroke="blue"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}

                  <span className="text-gray-600 ml-3">
                    {totalReviews} Reviews
                  </span>
                </span>
              </div>
              <p className="leading-relaxed">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Pariatur qui molestias voluptates, animi adipisci distinctio ex
                suscipit tenetur consequuntur dolorum aspernatur assumenda quam
                reiciendis laboriosam sapiente et culpa beatae dicta mollitia
                nisi expedita labore? Illum ipsum tenetur quis. Vero
                voluptatibus suscipit dicta doloremque architecto veritatis
                mollitia quae ducimus voluptate repudiandae!
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
              <div className="flex mb-4">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${price}
                </span>
              </div>
              <div className="flex mb-4">
                <p className="leading-relaxed">Qunatity</p>
                <button
                  onClick={handleIncrement}
                  className="ml-4 mr-4 w-8 h-6 bg-gray-100 "
                >
                  +
                </button>
                <p className="leading-relaxed ">{quantity}</p>
                <button
                  onClick={handleDecreament}
                  className="ml-4 w-8 h-6 bg-gray-100"
                >
                  -
                </button>
              </div>
              <div className=" lg:flex">
                <button
                  onClick={handleCart}
                  className="mr-6  text-white bg-purple-300 border-0 py-2 px-5 lg:px-16 focus:outline-none hover:bg-purple-400 rounded"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuy}
                  className="  text-white bg-blue-500 border-0 py-2 px-5 lg:ml-4 lg:px-16 focus:outline-none hover:bg-blue-600 rounded"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
