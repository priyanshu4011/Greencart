import React from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCart from './ProductCart'

const ProductCategory = ({ categoryName }) => {
  const { products } = useAppContext()

  const filteredProducts = products?.filter(
    (product) => product.category?.toLowerCase() === categoryName?.toLowerCase()
  ) || []

  if (!filteredProducts.length) {
    return null
  }

  return (
    <div className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">{categoryName}</h2>
        <p className="text-sm text-gray-500">{filteredProducts.length} items</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCart key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductCategory
