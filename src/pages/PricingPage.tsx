import { motion } from "framer-motion";
import { useState } from "react";
import { Check, X, ArrowRight, MessageCircle } from "lucide-react";

type PackageType = "ecommerce" | "organization";

interface Tier {
  name: string;
  price: number;
  tagline: string;
  badge?: string;
  features: string[];
  excluded: string[];
  note?: string;
}

const ecommerceTiers: Tier[] = [
  {
    name: "Starter",
    price: 299,
    tagline: "For those who need a foundation and can handle the rest",
    features: [
      "WordPress + WooCommerce setup",
      "Pre-built theme (no custom design)",
      "3 pages (Home, Shop, Contact)",
      "Payment gateway configured",
      "1 revision round",
    ],
    excluded: [
      "Custom design",
      "Product uploads by us",
      "SEO setup",
      "Post-launch support",
    ],
    note: "You upload all products & content",
  },
  {
    name: "Professional",
    price: 599,
    tagline: "A fully designed store, ready for customers on day one",
    badge: "Most Popular",
    features: [
      "WordPress + WooCommerce setup",
      "Custom homepage + branded pages",
      "Up to 5 designed pages",
      "Up to 25 products uploaded for you",
      "Payment + shipping configured",
      "Mobile-responsive design",
      "Basic SEO (meta titles & descriptions)",
      "2 revision rounds",
      "1 week post-launch support",
    ],
    excluded: [
      "Professional email setup",
      "Social media profiles",
    ],
  },
  {
    name: "Full Service",
    price: 899,
    tagline: "Hand us your products — we build your entire online business",
    badge: "Best Value",
    features: [
      "Everything in Professional, plus:",
      "Fully custom design on ALL pages",
      "Up to 7 designed pages",
      "Up to 50 products uploaded",
      "Payment, shipping + tax configured",
      "Full SEO (sitemap, Google indexing)",
      "Professional email (you@yourdomain)",
      "Google Business profile created",
      "Social media profiles created",
      "Marketing starter guide",
      "Launch flyer + social graphics",
      "Domain + DNS setup",
      "3 revision rounds",
      "30 days post-launch support",
    ],
    excluded: [],
  },
];

const organizationTiers: Tier[] = [
  {
    name: "Basic",
    price: 199,
    tagline: "A simple landing page to establish your online presence",
    features: [
      "One-page scrolling website",
      "Pre-built theme (no custom design)",
      "Basic contact form",
      "1 revision round",
    ],
    excluded: [
      "Custom branding",
      "Booking forms",
      "SEO setup",
      "Post-launch support",
    ],
    note: "You provide all content & images",
  },
  {
    name: "Professional",
    price: 399,
    tagline: "A complete website that makes your business look established",
    badge: "Most Popular",
    features: [
      "Up to 5 custom-designed pages",
      "Branded to your colors, logo & fonts",
      "Booking or contact form integration",
      "Mobile-responsive design",
      "Basic SEO (meta titles & descriptions)",
      "2 revision rounds",
      "1 week post-launch support",
    ],
    excluded: [
      "Payment integration",
      "Professional email setup",
      "Social media profiles",
    ],
  },
  {
    name: "Full Service",
    price: 649,
    tagline: "We handle everything — you focus on running your business",
    badge: "Best Value",
    features: [
      "Everything in Professional, plus:",
      "Up to 7 fully custom pages",
      "Payment integration included",
      "Advanced booking + contact forms",
      "Full SEO (sitemap, indexing, meta)",
      "Professional email (you@yourdomain)",
      "Google Business profile created",
      "Social media profiles created",
      "Marketing starter guide",
      "Launch flyer + social graphics",
      "3 revision rounds",
      "30 days post-launch support",
    ],
    excluded: [],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const PricingPage = () => {
  const [activeType, setActiveType] = useState<PackageType>("ecommerce");
  const tiers = activeType === "ecommerce" ? ecommerceTiers : organizationTiers;

  const whatsappNumber = "15619783888";
  const getWhatsAppLink = (tierName: string, typeName: string) => {
    const message = encodeURIComponent(
      `Hi Lujens! I'm interested in the ${tierName} ${typeName === "ecommerce" ? "E-Commerce" : "Organization"} package. I'd love to discuss the details.`
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero */}
      <section className="section-padding pb-12 gradient-mesh">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">
              Packages & Pricing
            </p>
            <h1 className="heading-xl text-foreground mb-6">
              Transparent <span className="text-gradient">Pricing</span>
            </h1>
            <p className="body-lg max-w-2xl mx-auto mb-10">
              No hidden fees. No surprises. Pick the package that fits your
              business — or let's build something custom.
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-1 p-1.5 rounded-full glass"
          >
            <button
              onClick={() => setActiveType("ecommerce")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeType === "ecommerce"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              E-Commerce
            </button>
            <button
              onClick={() => setActiveType("organization")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeType === "organization"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Organization
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding pt-12">
        <motion.div
          key={activeType}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 items-stretch"
        >
          {tiers.map((tier, i) => {
            const isPopular = tier.badge === "Most Popular";
            const isBest = tier.badge === "Best Value";
            const isHighlighted = isPopular || isBest;

            return (
              <motion.div
                key={`${activeType}-${tier.name}`}
                variants={cardVariants}
                className={`relative rounded-2xl p-[1px] ${
                  isHighlighted
                    ? "bg-gradient-to-b from-primary/60 to-accent/40"
                    : ""
                }`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full text-xs font-semibold tracking-wide ${
                      isPopular
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {tier.badge}
                  </div>
                )}

                <div
                  className={`h-full rounded-2xl p-7 flex flex-col ${
                    isHighlighted
                      ? "bg-card border-0"
                      : "glass"
                  }`}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground font-display mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {tier.tagline}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground font-display">
                        ${tier.price}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border mb-6" />

                  {/* Features */}
                  <div className="flex-1 space-y-3 mb-8">
                    {tier.note && (
                      <div className="flex items-start gap-2.5 text-sm text-amber-500/90">
                        <span className="mt-0.5 text-xs">⚠</span>
                        <span>{tier.note}</span>
                      </div>
                    )}
                    {tier.features.map((feat, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <div className="w-4.5 h-4.5 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-primary" />
                        </div>
                        <span
                          className={`text-sm leading-relaxed ${
                            feat.startsWith("Everything in")
                              ? "font-medium text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {feat}
                        </span>
                      </div>
                    ))}
                    {tier.excluded.map((feat, j) => (
                      <div key={`ex-${j}`} className="flex items-start gap-2.5 opacity-40">
                        <div className="w-4.5 h-4.5 mt-0.5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <X size={12} className="text-muted-foreground" />
                        </div>
                        <span className="text-sm text-muted-foreground line-through">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={getWhatsAppLink(tier.name, activeType)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm transition-all duration-300 ${
                      isHighlighted
                        ? "bg-primary text-primary-foreground hover:opacity-90 glow-primary"
                        : "glass hover:border-primary/40 text-foreground"
                    }`}
                  >
                    <MessageCircle size={16} />
                    Get Started
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8 md:p-10 text-center"
          >
            <h2 className="heading-md text-foreground mb-4">How It Works</h2>
            <p className="body-md mb-6">
              50% deposit to begin, balance due before launch. All packages
              include a signed agreement.
            </p>
            <div className="h-px bg-border mb-6" />
            <p className="text-sm text-muted-foreground">
              Need something custom? Let's talk — we'll build a package that
              fits your exact needs.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Hi Lujens! I'm looking for a custom package. Can we discuss?"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 glow-primary mt-6"
            >
              <MessageCircle size={16} />
              Let's Talk
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
