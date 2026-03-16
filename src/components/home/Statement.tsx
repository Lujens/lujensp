import { motion } from "framer-motion";

const Statement = () => {
  return (
    <section className="relative bg-black overflow-hidden py-32 md:py-48">
      {/* Halftone dot pattern border effect */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, black 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, black 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-light leading-[1.1em]"
          style={{ fontSize: "clamp(50px, 7vw, 130px)" }}
        >
          Build with
          <br />
          Purpose
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/40 text-body mt-8"
        >
          Since 2023
        </motion.p>
      </div>
    </section>
  );
};

export default Statement;
