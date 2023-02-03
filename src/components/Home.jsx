import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <div className="flex flex-col justify-center items-center min-h-[90vh] w-full lg:-mt-10">
        <div className="sm:text-center">
          <h1 className="text-2xl tracking-tight max-w-6xl font-bold text-slate-800 dark:text-gray-200 sm:text-3xl md:text-4xl lg:text-6xl">
            <span className="inline text-ld">
              <span className=" text-indigo-600 inline">Zero Censorship,</span>{" "}
              Free & Decentralized
            </span>{" "}
            <span className=" text-indigo-600 inline">Digital Items </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              MarketPlace.
            </span>
          </h1>
          <p className="text-center max-w-4xl mx-auto mt-4 text-slate-500">
            Allows artistes, creators and artists all over the world create
            their collections for free and allows their fans patronize them by
            purchasing their collection items.
          </p>

          {/* CTA buttons */}
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <Link
                to="/artists_creators"
                className="bttn bttn-primary md:px-16"
              >
                Explore
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-6">
              <Link className="bttn bttn-secondary" to="/signup">
                Sign up as an Artist
              </Link>
            </div>
          </div>
        </div>
      </div>
      <About />
    </main>
  );
};

export default Home;

function About() {
  return (
    <div className="transition-all duration-300 ease-in w-[90vw] mx-auto">
      <h1 className="text-indigo-700 text-center font-semibold mt-8 mb-20 text-3xl sm:text-5xl dark:text-slate-200 transition-all duration-300 ease-in">
        Why Fillion?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-ld gap-16 mx-10 lg:mx-20 mb-10 lg:mb-32">
        <figure className="flex gap-4 flex-col">
          <div className="bg-indigo-500 w-fit p-4 rounded-lg text-white dark:text-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>
          <div>
            <article>
              <h2 className="text-xl font-semibold pb-2">Zero Censorship</h2>
              <p className="text-sm text-small font-light">
                The Fillion will be eventually deployed on IPFS with zero censorship
              </p>
            </article>
          </div>
        </figure>
        <figure className="flex gap-4 flex-col">
          <div className="bg-indigo-500 w-fit p-4 rounded-lg text-white dark:text-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>
          <div>
            <article>
              <h2 className="text-xl font-semibold pb-2">
                Fully Decentralized
              </h2>
              <p className="text-sm text-small font-light">
                The Fillion smart contracts are non-upgradeable and fully
                decentralized.
              </p>
            </article>
          </div>
        </figure>
        <figure className="flex gap-4 flex-col">
          <div className="bg-indigo-500 w-fit p-4 rounded-lg  text-white dark:text-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <article>
              <h2 className="text-xl font-semibold pb-2">Security</h2>
              <p className="text-sm text-small font-light">
                Security is of great priority and the Fillion protocol will
                undergo vigorous testing and multiple audits.
              </p>
            </article>
          </div>
        </figure>
        <figure className="flex gap-4 flex-col">
          <div className="bg-indigo-500 w-fit p-4 rounded-lg text-white dark:text-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>
          <div>
            <article>
              <h2 className="text-xl font-semibold pb-2">Free for all</h2>
              <p className="text-sm text-small font-light">
                The Fillion Protocol is free to use for anyone, anywhere in the
                world.
              </p>
            </article>
          </div>
        </figure>
      </div>
    </div>
  );
}
