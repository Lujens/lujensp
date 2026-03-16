import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedProjects, type Project } from "@/lib/projects";

const WorkShowcase = () => {
  const projects = getFeaturedProjects().slice(0, 6);

  if (projects.length === 0) {
    return (
      <section className="bg-[#1a1b1e] py-24">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 text-center">
          <p className="text-white/30 text-body">
            Projects coming soon — check back shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#1a1b1e]">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const hasImage = !!project.imageUrl;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full min-h-[70vh] md:min-h-[80vh] overflow-hidden group"
    >
      {/* Background image */}
      {hasImage ? (
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `hsl(${(index * 50 + 200) % 360}, 15%, ${
              25 + index * 5
            }%)`,
          }}
        />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />

      {/* Content overlay */}
      <div className="relative z-10 h-full min-h-[70vh] md:min-h-[80vh] flex flex-col justify-between p-6 md:p-10 lg:p-14">
        {/* Top: tags + arrow */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-label text-white/70 mb-2">
              {project.tags.join(", ").toUpperCase()}
            </p>
            <h3 className="text-white text-2xl md:text-4xl font-light">
              {project.title}
            </h3>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-all duration-300"
            >
              <ArrowUpRight size={18} />
            </a>
          )}
          {!project.liveUrl && (
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all duration-300">
              <ArrowUpRight size={18} />
            </div>
          )}
        </div>

        {/* Bottom spacer */}
        <div />
      </div>
    </motion.div>
  );
};

export default WorkShowcase;
