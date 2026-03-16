import { motion } from "framer-motion";
import portraitImg from "@/assets/lujens-pierre.jpg";

const sections = [
  {
    label: "Background",
    title: "Where It Started",
    text: "Growing up in Haiti and Florida, I was always drawn to both creativity and technology. I started tinkering with websites in high school, teaching myself design and code — which naturally led me to pursue software engineering at FGCU while building a freelance business on the side.",
  },
  {
    label: "Why I Build",
    title: "Building Is Thinking",
    text: "For me, building isn't just about shipping code or delivering designs. It's a way of solving problems, creating clarity from chaos, and turning ideas into systems that serve real people and real businesses.",
  },
  {
    label: "Vision",
    title: "What I See Ahead",
    text: "I'm working toward leading product teams that ship world-class digital experiences. Whether that's at a startup, a studio, or through my own company — the goal is always impact at scale.",
  },
];

const AboutPage = () => {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding pb-16">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-label text-muted-foreground mb-4">About</p>
            <h1>Lujens Pierre</h1>
            <p className="text-body-lg text-muted-foreground mt-6">
              Software Engineering student and Creative Technologist building at
              the intersection of design, code, and strategy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portrait + intro */}
      <section className="section-padding-sm">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[3/4] overflow-hidden"
          >
            <img
              src={portraitImg}
              alt="Lujens Pierre"
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="mb-8">The Short Version</h3>
            <p className="text-body-lg text-muted-foreground mb-6">
              I'm a software engineering student at FGCU who also runs a web
              design and development business. I work with founders, brands, and
              small businesses to design and build digital products that actually
              move the needle.
            </p>
            <p className="text-body text-muted-foreground">
              When I'm not coding or designing, I'm studying systems — business
              models, growth strategies, and the mechanics of great products.
              Everything I do is in service of building things that create real
              value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story sections */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto space-y-28">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-label text-muted-foreground mb-3">
                {section.label}
              </p>
              <h2 className="mb-8">{section.title}</h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl">
                {section.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
