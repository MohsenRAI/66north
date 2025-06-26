import { useState } from 'react'
import { TryOnModal } from './components/TryOnModal'

function App() {
  const [selectedColor, setSelectedColor] = useState('Arctic Fox')
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-gray-100 text-center py-2 text-sm">
        Free shipping on all orders over $350Due to recent changes in U.S. import tariffs, duties and taxes are not included in your purchase (excl. Canada)
        <a href="#" className="underline ml-1">Read more</a>
      </div>

      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold">66°North</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Men</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Women</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Norður Journal</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Circular</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Service</a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button className="text-gray-700 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <a href="#" className="hover:text-gray-700">Home</a>
          <span className="mx-2">/</span>
          <a href="#" className="hover:text-gray-700">Men</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Tops</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="https://ext.same-assets.com/3617477584/3003077863.png"
                alt="Básar Merino Wool Zip Neck"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="https://ext.same-assets.com/3617477584/4079152385.png"
                  alt="Product view 2"
                  className="w-full h-full object-cover cursor-pointer hover:opacity-75"
                />
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="https://ext.same-assets.com/3617477584/3003077863.png"
                  alt="Product view 3"
                  className="w-full h-full object-cover cursor-pointer hover:opacity-75"
                />
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="https://ext.same-assets.com/3617477584/4079152385.png"
                  alt="Product view 4"
                  className="w-full h-full object-cover cursor-pointer hover:opacity-75"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Básar</h1>
              <p className="text-sm text-gray-500 mt-1">Product code: Q01156-195-M</p>
              <p className="text-sm text-gray-600 mt-1">Merino wool zipneck</p>
              <p className="text-2xl font-bold text-gray-900 mt-4">$150.00</p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color: {selectedColor}</h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedColor('Arctic Fox')}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === 'Arctic Fox' ? 'border-gray-900' : 'border-gray-300'}`}
                  style={{ backgroundColor: '#c2aea3' }}
                />
                <button
                  onClick={() => setSelectedColor('Black')}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === 'Black' ? 'border-gray-900' : 'border-gray-300'}`}
                  style={{ backgroundColor: '#1e2125' }}
                />
                <button
                  onClick={() => setSelectedColor('Navy')}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === 'Navy' ? 'border-gray-900' : 'border-gray-300'}`}
                  style={{ backgroundColor: '#6f98b9' }}
                />
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Size: {selectedSize}</h3>
              <div className="flex space-x-3">
                {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border text-sm font-medium rounded-md ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex space-x-4">
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  -
                </button>
                <span className="px-4 py-2 border-l border-r border-gray-300 text-center min-w-[50px]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
              <button className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
            </div>
            
            {/* Try-On with AI Button */}
            <button 
              onClick={() => setIsTryOnModalOpen(true)}
              className="w-full mt-4 border border-gray-900 text-gray-900 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors"
            >
              Try-On with AI
            </button>

            {/* Product Description */}
            <div className="prose prose-sm text-gray-600">
              <p>
                100% Merino Wool. Regulates body temperature by controlling the rate of evaporate cooling.
                Soft next to skin with flat needle stitching for no-rub comfort and itch free.
                Naturally moves moisture away from skin with fine zipper at the neck for extra ventilation.
              </p>
              <p className="mt-4">
                Matching pants available. 10% set discount.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">66°North</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Full warranty against defects</p>
                <p>Free shipping on all orders over $350</p>
                <p>Delivery in 1 - 4 working days</p>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Shop</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-600 hover:text-gray-900 block">Men</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 block">Women</a>
              </div>
            </div>

            {/* Help */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Help & information</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-600 hover:text-gray-900 block">Contact Us</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 block">Shipping and delivery</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 block">Returns</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 block">Accessibility</a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Get in touch</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>66north@66north.com</p>
                <p>+354 535 6600</p>
                <p>Miðhraun 11, 210 Garðabær</p>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Social networks</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.017 0H7.983C3.58 0 0 3.58 0 7.983v4.034C0 16.42 3.58 20 7.983 20h4.034C16.42 20 20 16.42 20 12.017V7.983C20 3.58 16.42 0 12.017 0zM10 15c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>Keeping Iceland warm since 1926 66°North Iceland, All rights reserved</p>
          </div>
        </div>
      </footer>

      {/* Try-On Modal */}
      <TryOnModal
        isOpen={isTryOnModalOpen}
        onClose={() => setIsTryOnModalOpen(false)}
        selectedColor={selectedColor}
      />
    </div>
  )
}

export default App
