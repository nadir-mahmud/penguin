import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Order = ({ user_id }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  let authString = localStorage.getItem("auth");
  let auth = JSON.parse(authString);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.post(
        "https://penguin-alpha.vercel.app/api/orders",
        {
          user_id: auth?.user._id,
        }
      );

      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <Layout>
      <section className="mb-12 py-12 sm:py-16 lg:py-1">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-900 ">
              Your orders
            </h1>
          </div>
          <div className="mx-auto mt-8 max-w-2xl md:mt-8">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                    {orders.map((order) => (
                      <li
                        key={order.product_id}
                        className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="shrink-0">
                          <img
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                            a
                            src={order.product_photo}
                            alt
                          />
                        </div>
                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">
                                {order.product_name}
                              </p>
                              <p className="w-48 mx-0 mt-1 mb-0 text-sm text-gray-400">
                                {order.product_description}
                              </p>
                            </div>
                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                {order.totalPrice}
                              </p>
                              <div className="sm:order-1">
                                <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                  <p className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
                                    Quantity
                                  </p>
                                  <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                    {order.quantity}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Order;
