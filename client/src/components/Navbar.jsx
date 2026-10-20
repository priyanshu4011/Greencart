import { useEffect, useState } from 'react'
import { assets } from '../assets/assets.js'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const location = useLocation()
  const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount } = useAppContext();
  const cartCount = getCartCount()

  const logout = async () => {
    setUser(null);
    setShowUserLogin(false);
    navigate('/');
  }

  useEffect(() => {
    setSearchText(searchQuery || '')
  }, [searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    const nextQuery = searchText.trim()
    setSearchQuery(nextQuery)

    if (location.pathname !== '/products') {
      navigate('/products')
      return
    }

    if (nextQuery) {
      navigate('/products', { replace: true })
    }
  }

  return (
    <nav className="relative flex items-center justify-between border-b border-gray-300 bg-white px-4 py-5 transition-all sm:px-6 md:px-10 lg:px-16 xl:px-24">

      <Link to="/">
        <img className="h-9" src={assets.logo} alt="Logo" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className="text-gray-700 transition hover:text-primary">Home</NavLink>
        <NavLink to="/products" className="text-gray-700 transition hover:text-primary">All Products</NavLink>
      </div>

      <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
        <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm ring-1 ring-gray-200">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-56 bg-transparent text-sm outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <button
            type="submit"
            className="flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            aria-label="Search"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.836 10.615L15 14.695" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path clipRule="evenodd" d="M9.141 11.738C6.962 13.902 3.258 13.902 1.079 11.738C-1.099 9.574 -1.099 6.087 1.079 3.923C3.258 1.759 6.962 1.759 9.141 3.923C11.319 6.087 11.319 9.574 9.141 11.738Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Search</span>
          </button>
        </form>

        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-100"
        >
          <img src={assets.nav_cart_icon} alt='Cart' className='h-5 w-5 opacity-80'/>
          <span>Cart</span>
          <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white">{cartCount}</span>
        </button>

        {!user ? (
          <button onClick={()=> setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
            Login
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/my-orders')} className="hidden rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition lg:inline-flex">
              My Orders
            </button>
            <button onClick={logout} className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dull transition">
              Logout
            </button>
            <img src={assets.profile_icon} className="w-10 rounded-full border border-gray-200" alt="Profile" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 sm:hidden">
        <button onClick={() => navigate('/cart')} className="flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 shadow-sm" aria-label="Open cart">
          <img src={assets.nav_cart_icon} alt="Cart" className="h-4 w-4 opacity-80" />
          <span>Cart</span>
          <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white">{cartCount}</span>
        </button>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="rounded-full border border-gray-300 p-2">
          <img src={ assets.menu_icon } alt='Menu'/>
        </button>
      </div>
      {open && (
        <div className="absolute top-15 left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
          <form onSubmit={handleSearch} className="mt-2 flex w-full items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-2">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500"
              type="search"
              placeholder="Search products"
              aria-label="Search products"
            />
            <button type="submit" className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white">Search</button>
          </form>
          {user && (
            <NavLink to="/products" onClick={() => setOpen(false)}>My Order</NavLink>
          )}
          {!user ? (
            <button
              onClick={() => {
                setOpen(false)
                setShowUserLogin(true)
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
      )
    }
  


export default Navbar