import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import portraitImg from "@/assets/lujens-pierre.jpg";

const socials = [
  { label: "Instagram", href: "https://instagram.com/lujensp" },
  { label: "LinkedIn", href: "https://linkedin.com/in/lujensp" },
  { label: "GitHub", href: "https://github.com/Lujens" },
  { label: "YouTube", href: "https://youtube.com/@LujensP" },
  { label: "Facebook", href: "https://facebook.com/LujensPage" },
];

const Footer = () => {
  return (
    <footer className="bg-[#1a1b1e] text-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-28">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-16 md:mb-24">
          <div>
            <p className="text-body-sm font-medium text-white/90">
              Lujens Pierre
            </p>
            <p className="text-body-sm text-white/50">
              Web Designer + Creative Developer
            </p>
          </div>

          {/* Code icon */}
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black">
            <span className="text-lg font-semibold">&lt;/&gt;</span>
          </div>

          {/* Portrait */}
          <div className="w-24 h-24 rounded-full overflow-hidden grayscale">
            <img
              src={portraitImg}
              alt="Lujens Pierre"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Big CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <a
            href="https://wa.me/15619783888?text=Hi%20Lujens!%20I'm%20interested%20in%20working%20together."
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <span
              className="block font-light text-white leading-[1em] tracking-tight group-hover:text-white/70 transition-colors duration-300"
              style={{ fontSize: "clamp(50px, 8vw, 140px)" }}
            >
              Let's
            </span>
            <span
              className="block font-light text-white leading-[1em] tracking-tight group-hover:text-white/70 transition-colors duration-300"
              style={{ fontSize: "clamp(50px, 8vw, 140px)" }}
            >
              Connect
            </span>
          </a>
        </motion.div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-8 border-t border-white/10">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Lujens Pierre. All rights reserved.
          </p>

          <div className="flex flex-col items-end gap-3">
            <a
              href="mailto:contact@lujensp.com"
              className="text-body-sm text-white/50 hover:text-white transition-colors"
            >
              contact@lujensp.com
            </a>
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/40 hover:text-white transition-colors duration-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
