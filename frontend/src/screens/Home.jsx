/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Card from "../components/Card";
import Layout from "../components/Layout";
import { useHome } from "../context/HomeContext";
import Search from "./Search";
import { useSearch } from "../context/SearchContext";

const sortOptions = [
  { name: "Best Rating", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "Bags", label: "Bags", checked: false },
      { value: "Watches", label: "Watches", checked: false },
      { value: "Glasses", label: "Glasses", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [bags, setBags] = useState(false);
  const [watches, setWatches] = useState(false);
  const [glasses, setGlasses] = useState(false);
  const [products, setProducts] = useState([]);
  const [checkHome, setCheckHome] = useHome();
  const [searchedProduct, setSearchedProduct] = useSearch();

  const categoryBolean = [
    { value: "Bags", check: bags },
    { value: "Watches", check: watches },
    { value: "Glasses", check: glasses },
  ];

  const handleCheckBox = (e) => {
    if (e.target.value === "Bags") {
      setBags(!bags);
    }

    if (e.target.value === "Watches") {
      console.log(e.target.checked);
      setWatches(!watches);
    }

    if (e.target.value === "Glasses") {
      setGlasses(!glasses);
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://penguin-alpha.vercel.app/api/products/all"
      );

      setProducts(data.products);
      let fetchingCategoroy = [];
      console.log(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [products.length < 0]);

  const handleSorting = (optionName) => {
    if (optionName === "Best Rating") {
      setProducts([...products].sort((a, b) => b.rating - a.rating));
      console.log(products);
    }
    if (optionName === "Newest") {
      setProducts([...products].sort((a, b) => b.updatedAt - a.updatedAt));
    }
    if (optionName === "Price: Low to High") {
      setProducts([...products].sort((a, b) => a.price - b.price));
    }
    if (optionName === "Price: High to Low") {
      setProducts([...products].sort((a, b) => b.price - a.price));
    }
  };

  const myset = new Set(products.map((item) => item.category));
  let productSet = Array.from(myset);

  return (
    <>
      <Layout>
        {!checkHome ? (
          <div className="bg-white">
            <div>
              {/* Mobile filter dialog */}
              <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-40 lg:hidden"
                  onClose={setMobileFiltersOpen}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                      as={Fragment}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                        <div className="flex items-center justify-between px-4">
                          <h2 className="text-lg font-medium text-gray-900">
                            Filters
                          </h2>
                          <button
                            type="button"
                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                            onClick={() => setMobileFiltersOpen(false)}
                          >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4 border-t border-gray-200">
                          <h3 className="sr-only">Categories</h3>

                          <Disclosure
                            as="div"
                            key={filters[0].id}
                            className="border-t border-gray-200 px-4 py-6"
                          >
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <div className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {filters[0].name}
                                  </span>
                                  <span className="ml-6 flex items-center"></span>
                                </div>
                              </h3>
                              <div className="pt-6">
                                <div className="space-y-6">
                                  {filters[0].options.map(
                                    (option, optionIdx) => (
                                      <div
                                        key={option.value}
                                        className="flex items-center"
                                      >
                                        <input
                                          id={`filter-mobile-${filters[0].id}-${optionIdx}`}
                                          name={`${filters[0].id}[]`}
                                          defaultValue={option.value}
                                          type="checkbox"
                                          onClick={(e) => handleCheckBox(e)}
                                          defaultChecked={
                                            option.value === "Watches"
                                              ? watches
                                              : option.value === "Glasses"
                                              ? glasses
                                              : option.value === "Bags"
                                              ? bags
                                              : null
                                          }
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label
                                          htmlFor={`filter-mobile-${filters[0].id}-${optionIdx}`}
                                          className="ml-3 min-w-0 flex-1 text-gray-500"
                                        >
                                          {option.label}
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </>
                          </Disclosure>
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition.Root>

              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    Products
                  </h1>

                  <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                          Sort
                          <ChevronDownIcon
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {sortOptions.map((option) => (
                              <Menu.Item key={option.name}>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleSorting(option.name)}
                                    className={classNames(
                                      option.current
                                        ? "font-medium text-gray-900"
                                        : "text-gray-500",
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    {option.name}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <button
                      type="button"
                      className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                      onClick={() => setMobileFiltersOpen(true)}
                    >
                      <span className="sr-only">Filters</span>
                      <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <section
                  aria-labelledby="products-heading"
                  className="pb-24 pt-6"
                >
                  <h2 id="products-heading" className="sr-only">
                    Products
                  </h2>

                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    <form className="hidden lg:block">
                      <h3 className="sr-only">Categories</h3>

                      <Disclosure
                        as="div"
                        key={filters[0].id}
                        className="border-b border-gray-200 py-6"
                      >
                        <>
                          <h3 className="-my-3 flow-root">
                            <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {filters[0].name}
                              </span>
                              <span className="ml-6 flex items-center"></span>
                            </div>
                          </h3>

                          <div className="pt-6 space-y-4">
                            {filters[0].options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${filters[0].id}-${optionIdx}`}
                                  name={`${filters[0].id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  onClick={(e) => handleCheckBox(e)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${filters[0].id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </>
                      </Disclosure>
                    </form>

                    {/* Product grid */}
                    <div className="col-span-1 lg:col-span-3">
                      {bags || watches || glasses
                        ? categoryBolean.map((category) => {
                            return category.check ? (
                              <Card
                                products={products.filter(
                                  (item) => item.category === category.value
                                )}
                                productCategory={category.value}
                              />
                            ) : null;
                          })
                        : productSet.map((category) => (
                            <>
                              {}
                              <Card
                                products={products.filter(
                                  (item) => item.category === category
                                )}
                                productCategory={category}
                              />
                            </>
                          ))}
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        ) : (
          <Search searchedProduct={searchedProduct} />
        )}
      </Layout>
    </>
  );
}
