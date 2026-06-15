import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { whatsappConfig } from "../../data/whatsappMessage";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isDetailPage = 
    location.pathname.startsWith("/produk/") ||
    location.pathname.startsWith("/resep/") ||
    location.pathname.startsWith("/article/");

  const activeTheme = isScrolled || isDetailPage;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("mobile-menu-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Tentang Kami", path: "/tentang-kami" },
    { name: "Layanan", path: "/layanan" },
    { name: "Produk", path: "/produk" },
    { name: "Resep", path: "/resep" },
    { name: "Artikel", path: "/article" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500 flex items-center border-b ${
          activeTheme
            ? "bg-yen-white backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.09)] border-yen-cream/40"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo & Tagline */}
          <Link
            to="/"
            className={`flex items-center group transition-opacity duration-300 -ml-5 sm:-ml-5 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <img
              src="/LOGO-YEN.png"
              alt="Baso Yen Logo"
              className="h-[80px] w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col items-start justify-center -ml-4 sm:-ml-1">
              <span
                className={`font-bebas text-xl md:text-2xl font-black tracking-wider transition-colors duration-300 uppercase leading-none ${
                  activeTheme
                    ? "text-yen-dark group-hover:text-yen-accent"
                    : "text-white group-hover:text-white/80"
                }`}
              >
                Baso Yen
              </span>
              <span
                className={`font-jakarta text-[8px] uppercase tracking-wider mt-0.5 font-bold transition-colors duration-300 ${
                  activeTheme ? "text-yen-neutral/80" : "text-white/80"
                }`}
              >
                Sajian Praktis Istimewa
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative font-jakarta font-extrabold text-[11px] tracking-widest uppercase transition-all duration-300 py-1.5 ${
                    isActive
                      ? activeTheme
                        ? "text-yen-accent"
                        : "text-white"
                      : activeTheme
                        ? "text-yen-dark hover:text-yen-accent"
                        : "text-white/80 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-colors duration-300 ${
                          activeTheme ? "bg-yen-accent" : "bg-white"
                        }`}
                        layoutId="activeNavUnderline"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Action Button & Mobile Burger */}
          <div className="flex items-center gap-4">
            {/* CTA Button (Order Now style) */}
            <a
              href={whatsappConfig.generateOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 bg-yen-accent hover:bg-yen-dark text-white font-jakarta font-extrabold text-[11px] tracking-widest uppercase px-5 py-2.5 rounded-full shadow-[0_4px_15px_rgba(227,30,36,0.15)] hover:shadow-[0_6px_20px_rgba(227,30,36,0.3)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.666.988 3.396 1.51 5.357 1.51 5.467 0 9.911-4.444 9.914-9.913.002-2.65-1.02-5.14-2.877-6.998C17.18 1.9 14.693.882 12.008.882c-5.474 0-9.915 4.446-9.918 9.916-.002 1.879.49 3.714 1.424 5.334l-.955 3.486 3.578-.938zm11.365-7.135c-.3-.15-1.77-.875-2.04-.972-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.225-.65.075-.302-.15-1.276-.47-2.43-1.502-.897-.8-1.502-1.79-1.678-2.09-.178-.3-.02-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.67-1.625-.92-2.225-.24-.58-.49-.5-.67-.513-.17-.008-.37-.01-.57-.01-.2 0-.525.075-.8.375-.27.3-1.03 1.01-1.03 2.46s1.07 2.85 1.22 3.05c.15.2 2.11 3.22 5.11 4.517.714.31 1.27.495 1.7.63.717.228 1.368.196 1.884.12.573-.085 1.77-.724 2.02-1.423.25-.7.25-1.3 1.75-1.423.075-.013.15-.025.22-.038z" />
              </svg>
              Pesan Sekarang
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden focus:outline-none z-50 cursor-pointer transition-colors duration-300 ${
                isOpen || activeTheme
                  ? "text-yen-dark hover:text-yen-accent"
                  : "text-white hover:text-white/80"
              }`}
              aria-label="Toggle Menu"
            >
              <div className="w-6 flex flex-col gap-1.5 justify-center items-end">
                <motion.span
                  animate={
                    isOpen
                      ? { rotate: 45, y: 7.5, width: "24px" }
                      : { rotate: 0, y: 0, width: "24px" }
                  }
                  className="block h-0.5 bg-current"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-0.5 w-4 bg-current"
                />
                <motion.span
                  animate={
                    isOpen
                      ? { rotate: -45, y: -7.5, width: "24px" }
                      : { rotate: 0, y: 0, width: "24px" }
                  }
                  className="block h-0.5 bg-current"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay & Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-yen-dark z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white border-l border-yen-cream/55 z-40 shadow-2xl p-8 flex flex-col justify-between lg:hidden"
            >
              <div className="pt-20">
                <div className="flex flex-col space-y-5">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={link.path}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `block font-jakarta font-extrabold text-sm tracking-wider uppercase transition-colors ${
                            isActive
                              ? "text-yen-accent"
                              : "text-yen-dark hover:text-yen-accent"
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </motion.div>
                  ))}

                  {/* Mobile CTA inside Drawer */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="pt-4"
                  >
                    <a
                      href="https://wa.me/6281223700010"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-yen-accent hover:bg-yen-dark text-white font-jakarta font-extrabold text-xs tracking-wider uppercase py-3.5 px-6 rounded-full shadow-md flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 fill-white"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.666.988 3.396 1.51 5.357 1.51 5.467 0 9.911-4.444 9.914-9.913.002-2.65-1.02-5.14-2.877-6.998C17.18 1.9 14.693.882 12.008.882c-5.474 0-9.915 4.446-9.918 9.916-.002 1.879.49 3.714 1.424 5.334l-.955 3.486 3.578-.938zm11.365-7.135c-.3-.15-1.77-.875-2.04-.972-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.225-.65.075-.302-.15-1.276-.47-2.43-1.502-.897-.8-1.502-1.79-1.678-2.09-.178-.3-.02-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.67-1.625-.92-2.225-.24-.58-.49-.5-.67-.513-.17-.008-.37-.01-.57-.01-.2 0-.525.075-.8.375-.27.3-1.03 1.01-1.03 2.46s1.07 2.85 1.22 3.05c.15.2 2.11 3.22 5.11 4.517.714.31 1.27.495 1.7.63.717.228 1.368.196 1.884.12.573-.085 1.77-.724 2.02-1.423.25-.7.25-1.3 1.75-1.423.075-.013.15-.025.22-.038z" />
                      </svg>
                      Pesan Sekarang
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* Drawer Footer Info */}
              <div className="border-t border-yen-cream/60 pt-6">
                <p className="font-bebas text-xl text-yen-dark mb-1 uppercase tracking-wide">
                  Baso Yen
                </p>
                <p className="font-jakarta text-[11px] text-yen-neutral">
                  Sajian Praktis Istimewa sejak 1988 asal Kota Bandung.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
