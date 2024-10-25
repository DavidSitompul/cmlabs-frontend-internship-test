"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export const Navbar = () => {
  const navigation = ["Product", "Features", "Pricing", "Company", "Blog"]
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full">
      <nav className="relative flex flex-wrap items-center justify-between p-2 w-[95%] mx-auto lg:justify-between xl:px-1">
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-900">
            <span>
              <Image src="/img/logo.jpeg" width="32" alt="..." height="32" className="w-8" />
            </span>
            <span>Meall Ap</span>
          </span>
        </Link>

        {/* Hamburger Icon */}
        <button className="block lg:hidden p-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Menu - responsive */}
        <div className={`${isOpen ? "block" : "hidden"} lg:flex lg:items-center lg:w-auto w-full`}>
          <ul className="flex flex-col lg:flex-row items-end justify-between flex-1 pt-6 list-none lg:pt-0 lg:flex lg:space-x-6">
            {navigation.map((menu, index) => (
              <li className="nav__item" key={index}>
                <Link href="/" className="block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-black hover:text-indigo-500 focus:text-indigo-500">
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}
