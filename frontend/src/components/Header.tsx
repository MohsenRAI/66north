import React, { useState } from 'react'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      {/* Banner with light gray background instead of blue */}
      <div className="bg-gray-100 py-2 text-center text-sm text-gray-800">
        <p>Not a GAZCLUB Member yet? Sign up for 25% Off Full Price Styles</p>
      </div>

      <div className="container relative mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Left section with search */}
          <div className="w-1/3">
            <div className="relative max-w-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-[#253344] focus:outline-none focus:ring-1 focus:ring-[#253344]"
              />
            </div>
          </div>

          {/* Center logo */}
          <div className="flex w-1/3 justify-center">
            <a href="/" className="text-[#253344]">
              <img src="/images/gazman-logo.png" alt="GAZMAN" className="h-12" />
            </a>
          </div>

          {/* Right section with icons */}
          <div className="flex w-1/3 items-center justify-end space-x-6">
            <button className="text-[#253344] hover:text-[#1a2430]" aria-label="Wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="flex items-center text-[#253344] hover:text-[#1a2430]" aria-label="Account">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Account</span>
            </button>
            <button className="text-[#253344] hover:text-[#1a2430]" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Menu - below the logo with more spacing */}
        <nav className="mt-6 hidden border-t border-gray-100 pt-4 md:block">
          <ul className="flex justify-center space-x-10">
            <li><a href="#" className="text-sm font-medium hover:text-[#1a2430]">New Arrivals</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-[#1a2430]">Clothing</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-[#1a2430]">Everyday Essentials</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-[#1a2430]">Accessories</a></li>
            <li><a href="#" className="text-sm font-medium text-red-600 hover:text-red-800">Sale</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-[#1a2430]">Offers</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-[#1a2430]">Gifting</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-[#1a2430]">Outfit Guide</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-[#1a2430]">Stores</a></li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="absolute top-16 left-4 md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Open main menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#253344]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white p-4 md:hidden">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <a href="/" className="text-[#253344]">
              <img src="/images/gazman-logo.png" alt="GAZMAN" className="h-8" />
            </a>
            <button
              className="text-[#253344]"
              onClick={toggleMobileMenu}
              aria-label="Close main menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-4">
              <li><a href="#" className="block py-2 text-base font-medium hover:text-[#1a2430]">New Arrivals</a></li>
              <li><a href="#" className="block py-2 text-base font-medium hover:text-[#1a2430]">Clothing</a></li>
              <li><a href="#" className="block py-2 text-base font-medium hover:text-[#1a2430]">Everyday Essentials</a></li>
              <li><a href="#" className="block py-2 text-base font-medium hover:text-[#1a2430]">Accessories</a></li>
              <li><a href="#" className="block py-2 text-base font-medium text-red-600 hover:text-red-800">Sale</a></li>
              <li><a href="#" className="block py-2 text-base font-medium hover:text-[#1a2430]">Offers</a></li>
              <li><a href="#" className="block py-2 text-base font-medium hover:text-[#1a2430]">Gifting</a></li>
              <li><a href="#" className="block py-2 text-base font-medium hover:text-[#1a2430]">Outfit Guide</a></li>
              <li><a href="#" className="block py-2 text-base font-medium hover:text-[#1a2430]">Stores</a></li>
            </ul>
          </nav>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <a href="#" className="flex items-center text-sm font-medium text-[#253344]">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                My Account
              </a>
              <a href="#" className="flex items-center text-sm font-medium text-[#253344]">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Wishlist
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
