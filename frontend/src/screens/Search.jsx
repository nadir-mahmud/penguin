import React from "react";
import SearchCard from "../components/SearchCard";
import Layout from "../components/Layout";
import { Disclosure } from "@headlessui/react";

const Search = ({ searchedProduct }) => {
  console.log(searchedProduct);
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Products
      </h1>
      <Disclosure
        as="div"
        className="border-b border-gray-200 py-6 lg:mx-6"
      ></Disclosure>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-1">
        {/* Product grid */}
        <div className="col-span-1 lg:col-span-4">
          <SearchCard products={searchedProduct} productCategory={"all"} />
        </div>
      </div>
    </>
  );
};

export default Search;
