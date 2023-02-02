import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import DarkMode from "../utils/DarkMode";
import {
  MenuIcon,
  XIcon,
  ViewGridIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [colorScheme, setTheme] = DarkMode();
  return (
    <Popover className="relative bg-inherit">
      <div className="w-full mx-auto px-4 sm:px-6">
        <div className="flex justify-between lg:justify-evenly items-center pt-6 pb-4  md:space-x-10 ">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link
              to="/"
              className="font-bold  text-black text-base sm:text-2xl mr-1"
            >
              <div className="flex gap-2">
                <img
                  className="h-8 w-10 sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
                <span className="text-indigo-600">
                  File
                  <span className="text-gray-900 dark:text-gray-200">
                    chain
                  </span>
                </span>
              </div>
            </Link>
          </div>
          {/* Navbar(Larger screens) */}
          <Popover.Group
            as="nav"
            className="hidden lg:flex items-center justify-center space-x-10 text-ld font-medium"
          >
            <NavLink exact="true" to="/collection/create">
              Create a collection
            </NavLink>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "text-indigo-600" : `text-ld`,
                      "group bg-transparent outline-none inline-flex items-center text-base hover:text-white-900"
                    )}
                  >
                    <div className="flex items-center">
                      Artists & Creators
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-ld rotate-180 transform" : "text-ld",
                          "ml-1 lg:ml-2 h-4 w-4 font-bold group-hover:text-white-500 transition-all duration-200 ease-in-out"
                        )}
                        aria-hidden="true"
                      />
                    </div>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-20 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-full max-w-md sm:px-0">
                      <div className="rounded-sm shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-2 py-6 sm:gap-8">
                          <Link to="/newArtist">
                            <div className="text-[12px] lg:text-base text-gray-900">
                              <Popover.Button>Sign up</Popover.Button>
                            </div>
                          </Link>
                          <Link to="/artists_creators">
                            <div className="text-[12px] lg:text-base text-gray-900">
                              <Popover.Button>
                                Artists & Creators
                              </Popover.Button>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <NavLink exact="true" to="/profile">
              Your Profile
            </NavLink>
            <div
              onClick={() => setTheme(colorScheme)}
              className="cursor-pointer"
            >
              {colorScheme === "light" ? (
                <div className="flex gap-2 items-center justify-center">
                  <span className="w-10 h-10 bg-gray-700 dark:bg-slate-500 rounded-full shadow-lg cursor-pointer text-white flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="#fff"
                      viewBox="0 0 24 24"
                      stroke="#fff"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                <div className="flex gap-2 items-center justify-center">
                  <span className="w-10 h-10 bg-gray-700 dark:bg-slate-500 rounded-full shadow-lg cursor-pointer text-white flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="bg-yellow-200"
                      viewBox="0 0 24 24"
                      stroke="#fff"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          </Popover.Group>
          {/* Connect Button*/}
          <div className="flex gap-4 items-center justify-end md:flex-1 lg:w-0">
            <ConnectButton
              showBalance={false}
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              chainStatus="icon"
            />
          </div>
          {/*Menu Button(smaller buttons) */}
          <div className="-mr-2 -my-2 flex gap-2 items-center lg:hidden">
            <Popover.Button className=" rounded-md p-2 inline-flex items-center justify-center text-gray-400  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-8 w-8" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
      </div>

      {/* Responsive Navbar for smaller phones*/}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden z-50"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-slate-100 dark:bg-slate-800 trans divide-y divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="FileChain"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-ld rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-4 space-y-6">
              <div className="flex flex-col items-start gap-y-4 gap-x-8 font-metro text-ld text-base font-medium">
                <NavLink
                  exact="true"
                  to="/collection/create"
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 w-full flex gap-2 items-center rounded-md"
                >
                  <ShoppingCartIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  Create a Collection
                </NavLink>
                <NavLink
                  exact="true"
                  to="/artists_creators"
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 w-full flex gap-2 items-center rounded-md"
                >
                  <UserGroupIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  Artists & Creators
                </NavLink>
                <NavLink
                  exact="true"
                  to="/profile"
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 w-full flex gap-2 items-center rounded-md"
                >
                  <ViewGridIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  Your Profile
                </NavLink>
                <div
                  onClick={() => setTheme(colorScheme)}
                  className="cursor-pointer flex gap-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-3 w-full "
                >
                  {colorScheme === "light" ? (
                    <div className="flex gap-2 items-center justify-center">
                      <span className="w-8 h-8 bg-gray-700 dark:bg-slate-500 rounded-full shadow-lg cursor-pointer text-white flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="#fff"
                          viewBox="0 0 24 24"
                          stroke="#fff"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center justify-center">
                      <span className="w-8 h-8 bg-gray-700 dark:bg-slate-500 rounded-full shadow-lg cursor-pointer text-white flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="bg-yellow-200"
                          viewBox="0 0 24 24"
                          stroke="#fff"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
