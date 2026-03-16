import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const AboutIntro = () => {
  return (
    <section className="bg-[#1a1b1e] py-24 md:py-32">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28">
        <div className="max-w-3xl">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/90 mb-10"
          >
            I'm Lujens Pierre
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-body-lg text-white/60 mb-6"
          >
            A software engineering student and creative technologist building
            digital experiences for businesses ready to grow. I design, develop,
            and launch websites, e-commerce stores, and brand identities that
            actually move the needle.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-body-lg text-white/60 mb-6"
          >
            Working with small businesses, entrepreneurs, and founders — I
            specialize in WordPress, WooCommerce, Shopify, and custom React
            builds that prioritize clarity, speed, and conversion.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-body-lg text-white/60 mb-10"
          >
            When I'm not building for clients, I'm engineering full-stack
            applications and sharpening my craft — always looking for the next
            challenge.
          </motion.p>

          <motion.a
            href="https://wa.me/15619783888?text=Hi%20Lujens!%20I'm%20interested%20in%20working%20together."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 text-body-sm"
          >
            Get in touch <ArrowUpRight size={16} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
