import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className=" bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center  w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-white sm:text-center dark:text-white">
            © 2023{" "}
            <NavLink to="https://flowbite.com/" className="hover:underline">
              Penguin™
            </NavLink>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
            <li>
              <NavLink to="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="mr-4 hover:underline md:mr-6">
                Licensing
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:underline">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
