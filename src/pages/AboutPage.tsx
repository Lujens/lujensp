import { motion } from "framer-motion";
import portraitImg from "@/assets/lujens-pierre.jpg";

const sections = [
  {
    label: "Background",
    title: "Where It Started",
    text: "I've always been at the intersection of creativity and technology. Growing up, I was equally fascinated by visual design and the logic behind software — which naturally led me to software engineering and creative direction.",
  },
  {
    label: "Why I Build",
    title: "Building Is Thinking",
    text: "For me, building isn't just about shipping code or delivering designs. It's a way of thinking through problems, creating clarity from chaos, and turning abstract ideas into tangible systems that serve real people.",
  },
  {
    label: "Vision",
    title: "What I See Ahead",
    text: "I envision a future where I'm leading product teams that ship world-class digital experiences. Whether that's at a startup, a studio, or my own venture — the goal is always impact at scale.",
  },
  {
    label: "Mission",
    title: "The Long Game",
    text: "Build things that matter. Create leverage through technology. Help brands and products reach their full potential. Leave every project better than I found it.",
  },
];

const AboutPage = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding gradient-mesh">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">About</p>
            <h1 className="heading-xl text-foreground mb-6">
              Lujens <span className="text-gradient">Pierre</span>
            </h1>
            <p className="body-lg">
              Software Engineering student and Creative Technologist building at the intersection of design, code, and strategy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portrait + intro */}
      <section className="section-padding pt-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[3/4] rounded-3xl overflow-hidden relative shadow-2xl"
          >
            <img
              src={portraitImg}
              alt="Lujens Pierre"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-md text-foreground mb-6">The Short Version</h2>
            <p className="body-lg mb-6">
              I'm a software engineering student who also happens to run a creative studio. I work with founders, brands, and startups to design and build digital products that actually move the needle.
            </p>
            <p className="body-md">
              When I'm not coding or designing, I'm studying systems — business models, growth strategies, and the mechanics of great products. Everything I do is in service of building things that create real value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story sections */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto space-y-24">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm font-medium text-primary mb-2 tracking-wider uppercase">{section.label}</p>
              <h3 className="heading-lg text-foreground mb-6">{section.title}</h3>
              <p className="body-lg max-w-2xl">{section.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
