import React from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const ProductCart = ({ product = {} }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext()

    const imageSrc = Array.isArray(product.image) ? product.image[0] : product.image
    const rating = product.rating ?? 4
    const isAddedInCart = Boolean(cartItems[product._id])

    const handleAddToCart = (e) => {
        e.stopPropagation()
        addToCart(product._id)
    }

    const handleRemoveFromCart = (e) => {
        e.stopPropagation()
        removeFromCart(product._id)
    }

    return  product && (
        <div
            onClick={() => navigate(`/product/${product._id}`)}
            className="w-full min-w-0 max-w-none cursor-pointer rounded-md border border-gray-500/20 bg-white px-2 py-2 sm:px-3 md:px-4"
        >
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={imageSrc} alt={product.name || 'Product'} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <img key={i} className="md:w-3.5 w-3" src={i < rating ? assets.star_icon : assets.star_dull_icon} alt="star" />
                    ))}
                    <p>({rating})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-indigo-500">
                        {currency}{product.offerPrice ?? 0}
                        <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price ?? 0}</span>
                    </p>
                    <div onClick={(e) => { e.stopPropagation(); }} className="text-indigo-500">
                        {isAddedInCart ? (
                            <div className="flex items-center justify-center gap-2 md:w-24 w-20 h-9 bg-indigo-500/25 rounded select-none">
                                <button onClick={handleRemoveFromCart} className="cursor-pointer text-md px-2 h-full">
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={(e) => { e.stopPropagation(); addToCart(product._id) }} className="cursor-pointer text-md px-2 h-full">
                                    +
                                </button>
                            </div>
                        ) : (
                            <button className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-24 w-20 h-9 rounded cursor-pointer text-indigo-600 font-medium" onClick={handleAddToCart} >
                                <img src={assets.cart_icon} alt="cart_icon" className="h-4 w-4"/>
                                Buy
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCart
