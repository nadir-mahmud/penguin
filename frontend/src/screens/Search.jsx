import React from "react";
import SearchCard from "../components/SearchCard";
import { Disclosure } from "@headlessui/react";

const Search = ({ searchedProduct }) => {
  console.log(searchedProduct);
  return (
    <>
      <h6 className="text-3xl pt-20 pl-16 font-bold tracking-tight text-gray-600">
        Search Results
      </h6>
      <Disclosure
        as="div"
        className="border-b border-gray-200 py-3 lg:mx-16"
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
