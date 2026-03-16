import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { label: "H.", path: "/" },
  { label: "About", path: "/about" },
  { label: "Work", path: "/freelance" },
  { label: "Engineering", path: "/engineering" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > 200) {
        setHidden(y > lastY);
      } else {
        setHidden(false);
      }
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Top header bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-background/80 backdrop-blur-lg"
            : "py-6"
        } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            lp.
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <span className="text-body-sm text-muted-foreground">
              Available for projects
            </span>
            <a
              href="https://wa.me/15619783888?text=Hi%20Lujens!%20I'm%20interested%20in%20working%20together."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-body-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Let's Connect <ArrowUpRight size={14} />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Bottom floating nav pill — desktop only */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bottom-nav hidden md:flex"
      >
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path ? "active" : ""
            }
          >
            {item.label}
          </Link>
        ))}
      </motion.nav>

      {/* Mobile fullscreen nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6"
          >
            <nav className="flex flex-col gap-6">
              {navItems.filter(n => n.label !== "H.").map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-3xl font-light ${
                    location.pathname === item.path
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://wa.me/15619783888?text=Hi%20Lujens!%20I'm%20interested%20in%20working%20together."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 btn-outline w-fit"
              >
                Let's Connect <ArrowUpRight size={16} />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
