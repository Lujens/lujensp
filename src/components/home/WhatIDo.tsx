import { motion } from "framer-motion";
import { Palette, Box, Code2 } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Freelance & Brand Work",
    description: "Visual identity, branding, and creative direction that makes businesses unforgettable.",
  },
  {
    icon: Box,
    title: "Product & App Development",
    description: "End-to-end product design and development — from concept to launch.",
  },
  {
    icon: Code2,
    title: "Software Engineering",
    description: "Clean, scalable code. Full-stack applications built with modern technologies.",
  },
];

const WhatIDo = () => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Services</p>
          <h2 className="heading-lg text-foreground">What I Do</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group glass-hover rounded-2xl p-8 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                <service.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="body-md">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
