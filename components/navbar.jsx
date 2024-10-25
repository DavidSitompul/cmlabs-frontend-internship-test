"use client"
import Link from "next/link"
import Image from "next/image"

export const Navbar = () => {
  const navigation = ["Product", "Features", "Pricing", "Company", "Blog"]

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-900">
            <span>
              <Image src="/img/logo.svg" width="32" alt="..." height="32" className="w-8" />
            </span>
            <span>Meall Ap</span>
          </span>
        </Link>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link href="/" className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-black hover:text-indigo-500 focus:text-indigo-500 ">
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