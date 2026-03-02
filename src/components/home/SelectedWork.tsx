import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedProjects, type Project } from "@/lib/projects";

const categoryPathMap: Record<string, string> = {
  "Graphic Design": "/freelance",
  "Product Design": "/freelance",
  "Web Development": "/freelance",
  Engineering: "/engineering",
};

const SelectedWork = () => {
  const projects = getFeaturedProjects().slice(0, 6);

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Portfolio</p>
            <h2 className="heading-lg text-foreground">Selected Work</h2>
          </div>
          <Link to="/freelance" className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            View all <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to={categoryPathMap[project.category] ?? "/freelance"} className="group block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-hover mb-4">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 flex items-center justify-center">
                      <ArrowUpRight size={20} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-primary font-medium mb-1">{project.category}</p>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
