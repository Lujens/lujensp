import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-mesh overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Available for projects & internships
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="heading-xl text-foreground mb-6"
            >
              Building Digital{" "}
              <span className="text-gradient">Experiences</span>{" "}
              That Actually Move People.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="body-lg mb-10 max-w-lg"
            >
              Software Engineering Student. Product Builder. Creative Director.
              <br />I design, build, and scale digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/freelance"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 glow-primary"
              >
                View My Work
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/engineering"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass font-medium text-foreground hover:border-primary/40 transition-all duration-300"
              >
                <Briefcase size={16} />
                For Recruiters
              </Link>
            </motion.div>
          </div>

          {/* Right - Animated project cards */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full h-[500px]">
              {[
                { title: "Brand Identity", color: "from-primary/20 to-accent/20", rotate: -6, y: 0 },
                { title: "Mobile App", color: "from-accent/20 to-primary/20", rotate: 3, y: 30 },
                { title: "Web Platform", color: "from-primary/30 to-accent/10", rotate: -2, y: 60 },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [card.y, card.y - 10, card.y],
                    rotate: [card.rotate, card.rotate + 1, card.rotate],
                  }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-72 h-48 rounded-2xl bg-gradient-to-br ${card.color} glass border border-border/50 p-6 flex flex-col justify-end`}
                  style={{ zIndex: 3 - i }}
                >
                  <div className="w-8 h-1 rounded-full bg-primary/60 mb-3" />
                  <p className="text-sm font-medium text-foreground">{card.title}</p>
                  <p className="text-xs text-muted-foreground">Case Study</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
