import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-sm text-ld px-6 py-20 border-t-2 border-slate-100 dark:border-slate-800 transition-all duration-300 ease-in">
      <div className="w-[80vw] mx-auto grid grid-cols-1 space-y-8 lg:space-y-0 lg:grid-cols-3 gap-x-4">
        {/* First Grid */}
        <div className="flex flex-col px-6">
          {/* Logo */}
          <div className="mb-4">
            <Link
              to="/"
              className="font-bold text-center align-middle text-black text-2xl"
            >
              <span className="text-indigo-600">
                Fill
                <span className="text-gray-900 dark:text-gray-200">ion</span>
              </span>
            </Link>
          </div>
          <p className="text-xs md:text-sm">
            Free Decentralized Digital MarketPlace, Zero censorship, fast
            transactions with cheap fees, on Filecoin Network.
          </p>
        </div>
        {/* Second Grid */}
        <div className="col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-y-8 text-xs md:text-sm lg:gap-y-0 lg:grid-cols-4">
          <div>
            <h1 className="text-base lg:text-md font-medium text-slate-500 dark:text-slate-100">
              COMPANY
            </h1>
            <ul className="mt-4 flex flex-col space-y-4">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>
          <div>
            <h1 className="text-base lg:text-md font-medium text-slate-500 dark:text-slate-100">
              SOLUTIONS
            </h1>
            <ul className="mt-4 flex flex-col space-y-4">
              <li>Marketing</li>
              <li>Commerce</li>
              <li>Insights</li>
            </ul>
          </div>
          <div>
            <h1 className="text-base lg:text-md font-medium text-slate-500 dark:text-slate-100">
              SUPPORT
            </h1>
            <ul className="mt-4 flex flex-col space-y-4">
              <li>Documentation</li>
              <li>Guides</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div>
            <h1 className="text-base lg:text-md font-medium text-slate-500 dark:text-slate-100">
              LEGAL
            </h1>
            <ul className="mt-4 flex flex-col space-y-4">
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
              <li>Claim</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
