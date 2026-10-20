import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const SellerProducts = () => {
  const navigate = useNavigate()
  const { products, deleteProduct } = useAppContext()
                             
  return (
    <div className="mx-auto max-w-6xl py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Seller panel</p>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800">Listed products</h1>
        </div>
        <button onClick={() => navigate('/seller/add-product')} className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          Add product
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div key={product._id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <img src={product.image?.[0]} alt={product.name} className="h-52 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${product.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {product.inStock ? 'In stock' : 'Out of stock'}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-indigo-600">₹{product.offerPrice || product.price}</p>
                  <p className="text-sm text-gray-400 line-through">₹{product.price}</p>
                </div>
                <button onClick={() => deleteProduct(product._id)} className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SellerProducts
