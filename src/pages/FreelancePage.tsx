import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";

const categories = ["Graphic Design", "Product Design", "Web Development"];

const projects = {
  "Graphic Design": [
    { title: "Luxe Studio — Brand Identity", desc: "Complete brand system including logo, typography, color palette, and brand guidelines.", tags: ["Branding", "Logo", "Guidelines"] },
    { title: "Flavor Co. — Social Campaign", desc: "Multi-platform social media campaign with cohesive visual language across Instagram, TikTok, and LinkedIn.", tags: ["Social Media", "Campaign"] },
    { title: "Noir Magazine — Editorial", desc: "Editorial design and layout for a 48-page fashion magazine spread.", tags: ["Print", "Editorial"] },
    { title: "Summit Conference — Marketing", desc: "Event branding, promotional materials, and digital assets for a 500+ attendee tech conference.", tags: ["Event", "Marketing"] },
  ],
  "Product Design": [
    { title: "FitTrack — Fitness App", desc: "End-to-end mobile app design for a personalized fitness tracking platform with social features.", tags: ["Mobile", "UX/UI"] },
    { title: "PayFlow — Fintech Dashboard", desc: "Complex financial dashboard with data visualization, transaction management, and analytics.", tags: ["Dashboard", "Data Viz"] },
    { title: "MealPrep — Recipe Platform", desc: "Recipe discovery and meal planning app with smart grocery list generation.", tags: ["Mobile", "UX Research"] },
  ],
  "Web Development": [
    { title: "Artisan Collective — E-Commerce", desc: "Custom Shopify store with unique product customizer and seamless checkout experience.", tags: ["Shopify", "E-Commerce"] },
    { title: "Venture Studio — Corporate Site", desc: "High-performance corporate website with CMS, blog, and lead generation system.", tags: ["React", "CMS"] },
    { title: "Greenleaf — Restaurant", desc: "Restaurant website with online ordering, reservation system, and dynamic menu management.", tags: ["WordPress", "Booking"] },
  ],
};

const FreelancePage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Freelance Portfolio</p>
            <h1 className="heading-xl text-foreground mb-6">
              Creative <span className="text-gradient">Work</span>
            </h1>
            <p className="body-lg max-w-2xl">
              A curated selection of branding, product design, and web development projects for clients across industries.
            </p>
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
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
            {projects[activeCategory as keyof typeof projects].map((project, i) => (
              <motion.div
                key={`${activeCategory}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass-hover rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <ArrowUpRight size={20} className="text-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                    <ExternalLink size={14} className="text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreelancePage;
