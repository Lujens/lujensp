import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { getProjectsByCategory, type Project } from "@/lib/projects";

const categories = ["Graphic Design", "Product Design", "Web Development"] as const;

const FreelancePage = () => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>(categories[0]);
  const projects = getProjectsByCategory(activeCategory);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Freelance Portfolio</p>
            <h1 className="heading-xl text-foreground mb-6">Creative <span className="text-gradient">Work</span></h1>
            <p className="body-lg max-w-2xl">A curated selection of branding, product design, and web development projects for clients across industries.</p>
          </motion.div>
        </div>
      </section>

      {/* Sticky nav */}
      <div className="sticky top-16 z-30 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex gap-1 overflow-x-auto py-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects */}
      <section className="section-padding pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass-hover rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="aspect-video overflow-hidden relative">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <ArrowUpRight size={20} className="text-primary" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={14} className="text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            {projects.length === 0 && (
              <div className="col-span-2 text-center py-16 text-muted-foreground">
                <p>No projects in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreelancePage;
