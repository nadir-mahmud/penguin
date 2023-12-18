import React from "react";
import { NavLink } from "react-router-dom";

const SearchCard = ({ products, productCategory }) => {
  return (
    <>
      <div className="bg-white ">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24  lg:max-w-4xl lg:px-12">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10  sm:grid-cols-2  lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative  shadow-md p-4  rounded-md"
              >
                <div className="aspect-h-1 aspect-w-1 w-full h-72  overflow-hidden rounded-md  lg:bg-purple-200  lg:aspect-none group-hover:opacity-75 lg:h-56">
                  <img
                    src={product.photo}
                    alt="h"
                    className="h-full w-full bg-gray-200 object-fit object-center lg:h-full lg:w-full"
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-md font-medium text-gray-700">
                      <NavLink
                        to={{
                          pathname: `/product-details/${product._id}`,
                        }}
                        state={product}
                      >
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </NavLink>
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-md font-medium text-gray-700 ">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
