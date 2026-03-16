import { motion } from "framer-motion";

const roles = [
  "Web",
  "Designer",
  "+",
  "Creative",
  "Frontend",
  "Developer",
];

const TitleReveal = () => {
  return (
    <section className="relative bg-[#1a1b1e] py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 flex flex-col items-center text-center">
        {roles.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: word === "+" ? 0.3 : 0.5, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`block font-light leading-[1em] tracking-tight ${
              word === "+"
                ? "text-[clamp(30px,3vw,50px)] text-white/30 my-2"
                : "text-[clamp(40px,8vw,140px)] text-white/50"
            }`}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default TitleReveal;
