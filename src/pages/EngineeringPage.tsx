import { motion } from "framer-motion";
import { Github, ExternalLink, Download, ArrowUpRight } from "lucide-react";

const techStack = [
  "React", "TypeScript", "Node.js", "Python", "SQL", "Firebase", "REST APIs", "Git", "Tailwind CSS", "Next.js",
];

const engineeringProjects = [
  {
    title: "Real-Time Chat Application",
    description: "Full-stack messaging platform with WebSocket connections, user authentication, and message persistence.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    title: "Task Management API",
    description: "RESTful API with JWT authentication, role-based access control, and comprehensive test coverage.",
    tech: ["Node.js", "Express", "PostgreSQL", "Jest"],
    github: "#",
  },
  {
    title: "E-Commerce Microservice",
    description: "Scalable microservice architecture handling product catalog, cart, and order processing.",
    tech: ["TypeScript", "Docker", "Redis", "PostgreSQL"],
    github: "#",
    live: "#",
  },
  {
    title: "ML Sentiment Analyzer",
    description: "Natural language processing tool that analyzes customer feedback sentiment with 92% accuracy.",
    tech: ["Python", "TensorFlow", "Flask", "React"],
    github: "#",
  },
];

const EngineeringPage = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding pb-16 gradient-mesh">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">For Recruiters</p>
            <h1 className="heading-xl text-foreground mb-6">
              Software Engineering <span className="text-gradient">Journey</span>
            </h1>
            <p className="body-lg max-w-2xl">
              Projects, experience, and technical growth. Building production-ready software with modern technologies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-padding pt-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Technical Stack</p>
            <h2 className="heading-md text-foreground mb-8">Technologies I Work With</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2.5 rounded-full glass-hover text-sm font-medium text-foreground cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Projects</p>
            <h2 className="heading-md text-foreground mb-10">Engineering Work</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {engineeringProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass-hover rounded-2xl p-7"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                  <div className="flex gap-2">
                    <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors"><Github size={16} /></a>
                    {project.live && <a href={project.live} className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={16} /></a>}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-10"
          >
            <h2 className="heading-md text-foreground mb-4">Resume</h2>
            <p className="body-md mb-8">
              Interested in product-focused software engineering internships where I can ship real impact.
            </p>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-primary">
              <Download size={16} />
              Download Resume
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EngineeringPage;
