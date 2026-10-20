import { Link } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const MainBanner = () => {
  return (
    <section className="px-0 pb-16 pt-8 sm:px-2 lg:px-4">
      <div className="relative mx-auto max-w-360 overflow-hidden rounded-[40px] shadow-2xl">
        <img
          src={assets.main_banner_bg}
          alt="Main Banner"
          className="hidden w-full object-cover md:block"
        />
        <img
          src={assets.main_banner_bg_sm}
          alt="Main Banner"
          className="w-full object-cover md:hidden"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/25 via-black/5 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-6 py-10 text-center text-white md:items-start md:px-20 lg:px-28">
          <span className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black md:text-base">
            Fresh groceries delivered fast and safe
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Fresher You Can Trust, Savings You'll Love
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80 md:mx-0 md:text-base">
            Shop fresh produce, organic essentials, and everyday favorites with fast delivery and great offers.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-dull"
            >
              Shop now
              <img className="h-4 w-4" src={assets.white_arrow_icon} alt="arrow" />
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Explore deals
              <img className="h-4 w-4" src={assets.black_arrow_icon} alt="arrow" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-xl">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 text-left text-sm text-white">
              <p className="font-semibold">Free delivery</p>
              <p className="mt-2 text-gray-200">On first order over ₹499</p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 text-left text-sm text-white">
              <p className="font-semibold">24/7 support</p>
              <p className="mt-2 text-gray-200">Fast help whenever you need it</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainBanner