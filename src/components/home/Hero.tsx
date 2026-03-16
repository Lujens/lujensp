import { motion } from "framer-motion";
import portraitImg from "@/assets/lujens-pierre.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background">
      {/* Portrait image — centered, B&W */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-[50vw] max-w-[600px] h-[80vh] max-h-[700px]"
        >
          <img
            src={portraitImg}
            alt="Lujens Pierre"
            className="w-full h-full object-cover object-top grayscale"
            style={{ filter: "grayscale(100%) contrast(1.1)" }}
          />
        </motion.div>
      </div>

      {/* Name overlay — massive text in front of portrait */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-hero mix-blend-difference text-white pointer-events-none select-none"
            style={{ fontSize: "clamp(50px, 8vw, 140px)" }}
          >
            Lujens
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-hero mix-blend-difference text-white pointer-events-none select-none ml-[10vw] md:ml-[15vw]"
            style={{ fontSize: "clamp(50px, 8vw, 140px)" }}
          >
            Pierre
          </motion.h1>
        </div>
      </div>

      {/* Wave divider into dark section */}
      <div className="relative z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 L0,60 Q360,0 720,60 Q1080,120 1440,60 L1440,120 Z"
            fill="#1a1b1e"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
