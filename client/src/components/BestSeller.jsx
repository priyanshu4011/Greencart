import ProductCart from './ProductCart'
import { dummyProducts } from '../assets/assets'

export default function BestSeller() {
  return (
    <div className="mt-12">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5'>
        {dummyProducts.filter((product) => product.inStock).slice(0, 5).map((product, index) => (
          <ProductCart key={index} product={product} />
        ))}
      </div>
    </div>
  )
}