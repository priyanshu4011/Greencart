import { footerLinks, assets } from "../assets/assets";

const Footer = () => {
    return (
        <footer className="mt-24 w-full overflow-hidden bg-[#123c32] text-white">
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
                <div className="flex flex-col gap-8 border-b border-white/15 py-12 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#8de0ad]">Freshness, delivered</p>
                        <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Good food starts with GreenCart.</h2>
                        <p className="mt-4 max-w-lg text-sm leading-6 text-white/65 md:text-base">
                            Fresh groceries and everyday essentials, delivered to your door with care.
                        </p>
                    </div>
                    <form className="flex w-full max-w-md rounded-xl bg-white p-1.5" onSubmit={(event) => event.preventDefault()}>
                        <label className="sr-only" htmlFor="footer-email">Email address</label>
                        <input
                            id="footer-email"
                            type="email"
                            placeholder="Your email address"
                            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        />
                        <button type="submit" className="rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dull">
                            Subscribe
                        </button>
                    </form>
                </div>

                <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_2fr]">
                    <div>
                        <img className="w-36 brightness-0 invert" src={assets.logo} alt="GreenCart" />
                        <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
                            Your trusted neighborhood grocery store for fresh produce, pantry staples, and more.
                        </p>
                        <p className="mt-6 text-sm font-medium text-[#8de0ad]">Open every day, 7:00 AM - 10:00 PM</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
                        {footerLinks.map((section, index) => (
                            <div key={index}>
                                <h3 className="mb-4 text-sm font-semibold text-white">{section.title}</h3>
                                <ul className="space-y-3 text-sm text-white/60">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <a href={link.url} className="transition hover:text-[#8de0ad]">{link.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-white/15 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
                    <p>Copyright 2026 GreenCart. All rights reserved.</p>
                    <p>Made for fresher, happier homes.</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer