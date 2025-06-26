import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-10 bg-white">
      <div className="border-t border-gray-200 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase">CUSTOMER SERVICE</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">Delivery</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">Returns</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">FAQs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">Size Guide</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">GAZCLUB Terms & Conditions</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase">COMPANY</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">Store Locator</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">Join the GAZCLUB</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">Catalogue</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">Sitemap</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#253344] hover:underline">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase">STAY CONNECTED</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-[#253344] hover:underline">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#3b5998] text-white">f</span>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-[#253344] hover:underline">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e4405f] text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </span>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-[#253344] hover:underline">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#00b2ff] text-white">@</span>
                    Join the newsletter
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase">Store Locator</h3>
              <p className="mb-2 text-sm text-gray-600">
                Proudly Australian owned & operated. GAZMAN has over 90 stores across Australia. Search below to find your local GAZMAN store.
              </p>
              <div className="mt-4 flex">
                <input
                  type="text"
                  placeholder="Type postcode, city or state..."
                  className="flex-1 rounded-l border border-gray-300 px-3 py-2 focus:border-[#253344] focus:outline-none focus:ring-1 focus:ring-[#253344]"
                />
                <button className="rounded-r bg-[#253344] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a2430]">
                  FIND A STORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0f1923] py-10 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
              <div className="flex items-center">
                <div className="mr-4">
                  <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0C13.6 0 8.5 5.6 8.5 12.5C8.5 19.4 20 30 20 30C20 30 31.5 19.4 31.5 12.5C31.5 5.6 26.4 0 20 0ZM20 17C17.5 17 15.5 15 15.5 12.5C15.5 10 17.5 8 20 8C22.5 8 24.5 10 24.5 12.5C24.5 15 22.5 17 20 17Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Proudly Australian</h4>
                  <p className="text-xs text-gray-400">Owned & Operated</p>
                </div>
              </div>

              <div className="flex items-center mt-4 md:mt-0">
                <div className="mr-4">
                  <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35 5H5C2.8 5 1 6.8 1 9V24C1 26.2 2.8 28 5 28H35C37.2 28 39 26.2 39 24V9C39 6.8 37.2 5 35 5ZM35 9V24H5V9H35Z" fill="white"/>
                    <path d="M30 12H10V16H30V12Z" fill="white"/>
                    <path d="M20 19H10V21H20V19Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-xs text-gray-400">on Aus orders over $100</p>
                </div>
              </div>

              <div className="flex items-center mt-4 md:mt-0">
                <div className="mr-4">
                  <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 10H12C10.9 10 10 10.9 10 12V22C10 23.1 10.9 24 12 24H28C29.1 24 30 23.1 30 22V12C30 10.9 29.1 10 28 10ZM28 22H12V16H28V22ZM28 14H12V12H28V14Z" fill="white"/>
                    <path d="M15 18H25V20H15V18Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Easy Returns</h4>
                  <p className="text-xs text-gray-400">In Store or Via Post</p>
                </div>
              </div>

              <div className="flex items-center mt-4 md:mt-0">
                <div className="mr-4">
                  <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 12H29V8C29 4.1 25.9 1 22 1H18C14.1 1 11 4.1 11 8V12H8C6.9 12 6 12.9 6 14V26C6 27.1 6.9 28 8 28H32C33.1 28 34 27.1 34 26V14C34 12.9 33.1 12 32 12ZM13 8C13 5.2 15.2 3 18 3H22C24.8 3 27 5.2 27 8V12H13V8ZM32 26H8V14H32V26Z" fill="white"/>
                    <path d="M20 19C21.1 19 22 18.1 22 17C22 15.9 21.1 15 20 15C18.9 15 18 15.9 18 17C18 18.1 18.9 19 20 19Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Order Tracking</h4>
                  <p className="text-xs text-gray-400">Every step of the way</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-4 text-center text-xs text-gray-600">
        <p>©2024 — GAZMAN</p>
        <div className="mt-2 flex items-center justify-center space-x-2">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
          <span>|</span>
          <a href="#" className="hover:underline">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
