import { motion } from "framer-motion";

const lines = [
  "I don't just build things.",
  "I build systems.",
  "I build clarity.",
  "I build leverage.",
];

const Philosophy = () => {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={`heading-lg mb-4 ${
              i === 0 ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
};

export default Philosophy;
