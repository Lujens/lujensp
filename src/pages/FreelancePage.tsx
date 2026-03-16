import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { getProjectsByCategory, type Project } from "@/lib/projects";

const categories = ["Graphic Design", "Product Design", "Web Development"] as const;

const FreelancePage = () => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>(categories[0]);
  const projects = getProjectsByCategory(activeCategory);

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
            <p className="text-label text-muted-foreground mb-4">Freelance Portfolio</p>
            <h1>Creative Work</h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              A curated selection of branding, product design, and web
              development projects for clients across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <div className="sticky top-16 z-30 border-b border-foreground/10 bg-background/80 backdrop-blur-lg">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 flex gap-1 overflow-x-auto py-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      <section className="section-padding pt-12">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <div className="aspect-video overflow-hidden bg-foreground/5 mb-5">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                      <span className="text-body-sm">No image yet</span>
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-label text-muted-foreground mb-1">
                      {project.tags.slice(0, 3).join(" · ")}
                    </p>
                    <h4 className="group-hover:text-muted-foreground transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-body-sm text-muted-foreground mt-2">
                      {project.description}
                    </p>
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="arrow-circle flex-shrink-0 ml-4 mt-1"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          {projects.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-body">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FreelancePage;
