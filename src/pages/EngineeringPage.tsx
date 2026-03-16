import { motion } from "framer-motion";
import { Github, ExternalLink, Download, ArrowUpRight } from "lucide-react";
import { getProjectsByCategory } from "@/lib/projects";

const techStack = [
  "React", "TypeScript", "Node.js", "Python", "Next.js",
  "Tailwind CSS", "PostgreSQL", "MongoDB", "Firebase",
  "REST APIs", "Git", "WordPress", "WooCommerce",
];

const EngineeringPage = () => {
  const projects = getProjectsByCategory("Engineering");

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding pb-16">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-label text-muted-foreground mb-4">For Recruiters</p>
            <h1>Software Engineering</h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Projects, experience, and technical growth. Building
              production-ready software with modern technologies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-padding-sm">
        <div className="max-w-[1800px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-label text-muted-foreground mb-6"
          >
            Technical Stack
          </motion.p>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                className="px-5 py-2.5 text-sm font-medium border border-foreground/15 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding">
        <div className="max-w-[1800px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-label text-muted-foreground mb-4"
          >
            Projects
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            Engineering Work
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group border border-foreground/10 p-7 hover:border-foreground/30 transition-colors duration-300"
              >
                {project.imageUrl && (
                  <div className="overflow-hidden mb-5">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <h4 className="group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex gap-3 ml-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-body-sm text-muted-foreground mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(project.techStack ?? project.tags).map((t) => (
                    <span key={t} className="text-xs px-3 py-1 border border-foreground/10 text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-body">Engineering projects coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Resume CTA */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="border border-foreground/10 p-12"
          >
            <h3 className="mb-4">Resume</h3>
            <p className="text-body text-muted-foreground mb-8">
              Interested in product-focused software engineering internships
              where I can ship real impact.
            </p>
            <button className="btn-outline">
              <Download size={16} /> Download Resume
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EngineeringPage;
