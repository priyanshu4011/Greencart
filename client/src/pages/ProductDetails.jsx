import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import ProductCart from '../components/ProductCart'

const ProductDetails = () => {
  const { id } = useParams()
  const { products, currency, addToCart, removeFromCart, cartItems } = useAppContext()
  const [selectedImage, setSelectedImage] = useState(0)

  const product = products?.find((item) => item._id === id)

  useEffect(() => {
    setSelectedImage(0)
  }, [id])

  if (!product) {
    return (
      <div className="mt-20 flex flex-col items-start gap-4 px-4 md:px-6 lg:px-8">
        <Link to="/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          ← Back to Products
        </Link>
        <p className="text-gray-600">Product not found.</p>
      </div>
    )
  }

  const images = Array.isArray(product.image) ? product.image : [product.image]
  const imageSrc = images[selectedImage] || images[0]
  const rating = product.rating ?? 4
  const isAddedInCart = Boolean(cartItems[product._id])
  const relatedProducts = (products || [])
    .filter(
      (item) =>
        item._id !== product._id &&
        item.category?.toLowerCase() === product.category?.toLowerCase()
    )
    .slice(0, 4)

  return (
    <div className="mt-16 flex flex-col gap-8 px-4 md:px-6 lg:px-8">
      <Link to="/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <img
            src={imageSrc}
            alt={product.name}
            className="mx-auto h-80 w-full max-w-md object-contain"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            {images.map((img, index) => (
              <button
                key={`${product._id}-${index}`}
                onClick={() => setSelectedImage(index)}
                className={`rounded-lg border p-1 ${selectedImage === index ? 'border-indigo-500' : 'border-gray-200'}`}
              >
                <img src={img} alt={`${product.name}-${index + 1}`} className="h-16 w-16 object-contain" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">{product.category}</p>
          <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>

          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <img
                key={index}
                className="h-4 w-4"
                src={index < rating ? assets.star_icon : assets.star_dull_icon}
                alt="star"
              />
            ))}
            <span className="text-sm text-gray-500">({rating})</span>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-2xl font-semibold text-indigo-600">
              {currency}{product.offerPrice ?? product.price ?? 0}
            </p>
            {product.price && product.offerPrice && product.offerPrice < product.price ? (
              <span className="text-sm text-gray-500 line-through">{currency}{product.price}</span>
            ) : null}
          </div>

          <p className="text-gray-600 leading-7">
            {Array.isArray(product.description) ? product.description.join(' • ') : product.description || 'Fresh and quality product.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {isAddedInCart ? (
              <div className="flex items-center justify-center gap-3 rounded-full border border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
                <button onClick={() => removeFromCart(product._id)} className="px-1">
                  -
                </button>
                <span>{cartItems[product._id]}</span>
                <button onClick={() => addToCart(product._id)} className="px-1">
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product._id)}
                className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <img src={assets.cart_icon} alt="cart" className="h-4 w-4" />
                Add to cart
              </button>
            )}

            <button
              onClick={() => addToCart(product._id)}
              className="flex items-center gap-2 rounded-full border border-indigo-200 px-5 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              <img src={assets.nav_cart_icon} alt="buy" className="h-4 w-4" />
              Buy now
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Related Products</h2>
            <p className="text-sm text-gray-500">More from this category</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCart key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
