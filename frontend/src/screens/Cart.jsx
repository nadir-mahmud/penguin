import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();

  let authString = localStorage.getItem("auth");
  let auth = JSON.parse(authString);

  const handleCart = async (product_id, user_id, price, quantity) => {
    axios.put("http://localhost:8080/api/cart", {
      product_id,
      user_id,
      quantity,
      totalPrice: quantity * price,
    });
  };

  const handleIncrement = (product_id, user_id, price, quantity) => {
    handleCart(product_id, user_id, price, quantity);
  };

  const handleDecreament = (product_id, user_id, price, quantity) => {
    if (quantity >= 1) {
      handleCart(product_id, user_id, price, quantity);
    }
  };

  const handleCheckout = () => {
    navigate("/payment", { state: calculateTotalPrice() });
  };

  const getAllCarts = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/all-carts", {
        user_id: auth?.user._id,
      });

      setCarts(data.carts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCart = async (product_id, user_id) => {
    console.log("deleted");
    const { data } = await axios.post("http://localhost:8080/api/delete-cart", {
      product_id: product_id,
      user_id: user_id,
    });
    console.log("hello");
  };

  useEffect(() => {
    getAllCarts();
  }, [handleIncrement, handleDecreament, handleDeleteCart]);

  const calculateTotalPrice = () => {
    return carts.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <Layout>
      <section className="h-screen py-12 sm:py-16 lg:py-1">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-900 ">Your Cart</h1>
          </div>
          <div className="mx-auto mt-8 max-w-2xl md:mt-12">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                    {carts.map((cart) => (
                      <li
                        key={cart.product_id}
                        className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="shrink-0">
                          <img
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                            a
                            src={cart.product_photo}
                            alt
                          />
                        </div>
                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">
                                {cart.product_name}
                              </p>
                              <p className="w-48 mx-0 mt-1 mb-0 text-sm text-gray-400">
                                {cart.product_description}
                              </p>
                            </div>
                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                {cart.totalPrice}
                              </p>
                              <div className="sm:order-1">
                                <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                  <button
                                    onClick={() =>
                                      handleDecreament(
                                        cart.product_id,
                                        cart.user_id,
                                        cart.totalPrice / cart.quantity,
                                        cart.quantity - 1
                                      )
                                    }
                                    className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  >
                                    -
                                  </button>
                                  <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                    {cart.quantity}
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleIncrement(
                                        cart.product_id,
                                        cart.user_id,
                                        cart.totalPrice / cart.quantity,
                                        cart.quantity + 1
                                      )
                                    }
                                    className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button
                              onClick={() =>
                                handleDeleteCart(cart.product_id, cart.user_id)
                              }
                              type="button"
                              className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                  className
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {calculateTotalPrice()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900">$8.00</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">
                      USD
                    </span>{" "}
                    {calculateTotalPrice() + 8}
                  </p>
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={handleCheckout}
                    type="button"
                    className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  >
                    Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
