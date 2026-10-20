import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import ProductCart from '../components/ProductCart'
import ProductCategory from '../components/ProductCategory'

const AllProducts = () => {
  const { products, searchQuery } = useAppContext()
  const { categoryName } = useParams()
  const [filteredProducts, setFilteredProducts] = useState(products || [])
  const [visibleCount, setVisibleCount] = useState(8)

  useEffect(() => {
    const query = searchQuery?.trim().toLowerCase() || ''
    const selectedCategory = categoryName?.trim().toLowerCase() || ''

    let results = products || []

    if (selectedCategory) {
      results = results.filter((product) => product.category?.toLowerCase() === selectedCategory)
    }

    if (query.length > 0) {
      results = results.filter((product) => {
        const nameMatch = product.name?.toLowerCase().includes(query)
        const categoryMatch = product.category?.toLowerCase().includes(query)
        return nameMatch || categoryMatch
      })
    }

    setFilteredProducts(results)
  }, [searchQuery, products, categoryName])

  useEffect(() => {
    setVisibleCount(8)
  }, [searchQuery, categoryName, products])

  const pageTitle = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'All Products'
  const showCategorySections = !searchQuery && !categoryName
  const hasSearchQuery = Boolean(searchQuery?.trim())
  const visibleProducts = filteredProducts.slice(0, visibleCount)
  const hasMoreProducts = filteredProducts.length > visibleCount
  const categories = [...new Set((products || []).map((product) => product.category).filter(Boolean))]

  return (
    <div className='mt-16 flex flex-col px-4 md:px-6 lg:px-8'>
      <div className='mb-6'>
        <p className='text-sm font-semibold uppercase tracking-wide text-indigo-500'>Shop</p>
        <h1 className='text-2xl font-semibold text-gray-800 md:text-3xl'>{pageTitle}</h1>
      </div>

      {hasSearchQuery && (
        <div className='mb-4 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm text-indigo-700'>
          Showing results for: <span className='font-semibold'>{searchQuery}</span>
        </div>
      )}

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {filteredProducts?.length > 0 ? (
          visibleProducts.map((product) => <ProductCart key={product._id} product={product} />)
        ) : (
          <p className='text-gray-500'>No products available.</p>
        )}
      </div>

      {filteredProducts?.length > 0 && (
        <div className='mt-6 flex justify-center'>
          <button
            onClick={() => setVisibleCount((prev) => (prev >= filteredProducts.length ? 8 : filteredProducts.length))}
            className='rounded-full border border-indigo-200 px-5 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50'
          >
            {hasMoreProducts ? 'See more' : 'See less'}
          </button>
        </div>
      )}

      {showCategorySections && (
        <>
          {categories.map((category) => (
            <ProductCategory key={category} categoryName={category} />
          ))}
        </>
      )}
    </div>
  )
}

export default AllProducts