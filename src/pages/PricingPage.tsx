import { motion } from "framer-motion";
import { useState } from "react";
import { Check, X, ArrowUpRight, MessageCircle } from "lucide-react";

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
    excluded: ["Custom design", "Product uploads by us", "SEO setup", "Post-launch support"],
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
    excluded: ["Professional email setup", "Social media profiles"],
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
    excluded: ["Custom branding", "Booking forms", "SEO setup", "Post-launch support"],
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
    excluded: ["Payment integration", "Professional email setup", "Social media profiles"],
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

const whatsappNumber = "15619783888";

const PricingPage = () => {
  const [activeType, setActiveType] = useState<PackageType>("ecommerce");
  const tiers = activeType === "ecommerce" ? ecommerceTiers : organizationTiers;

  const getWhatsAppLink = (tierName: string) => {
    const typeName = activeType === "ecommerce" ? "E-Commerce" : "Organization";
    const msg = encodeURIComponent(
      `Hi Lujens! I'm interested in the ${tierName} ${typeName} package. I'd love to discuss the details.`
    );
    return `https://wa.me/${whatsappNumber}?text=${msg}`;
  };

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding pb-12 text-center">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-label text-muted-foreground mb-4">Packages & Pricing</p>
            <h1 className="mb-6">Transparent Pricing</h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              No hidden fees. No surprises. Pick the package that fits your
              business — or let's build something custom.
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1 border border-foreground/15 p-1"
          >
            <button
              onClick={() => setActiveType("ecommerce")}
              className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeType === "ecommerce"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              E-Commerce
            </button>
            <button
              onClick={() => setActiveType("organization")}
              className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeType === "organization"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Organization
            </button>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="section-padding pt-8">
        <div
          key={activeType}
          className="max-w-[1800px] mx-auto grid md:grid-cols-3 gap-6 items-stretch"
        >
          {tiers.map((tier, i) => {
            const isHighlighted = !!tier.badge;
            return (
              <motion.div
                key={`${activeType}-${tier.name}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative border p-8 flex flex-col ${
                  isHighlighted
                    ? "border-foreground"
                    : "border-foreground/15"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-8 bg-foreground text-background px-4 py-1 text-xs font-semibold tracking-wide">
                    {tier.badge}
                  </div>
                )}

                <div className="mb-8">
                  <h4 className="mb-2">{tier.name}</h4>
                  <p className="text-body-sm text-muted-foreground mb-6">{tier.tagline}</p>
                  <span className="text-4xl font-light">${tier.price}</span>
                </div>

                <div className="h-px bg-foreground/10 mb-6" />

                <div className="flex-1 space-y-3 mb-8">
                  {tier.note && (
                    <p className="text-sm text-amber-700 flex items-start gap-2">
                      <span>⚠</span> {tier.note}
                    </p>
                  )}
                  {tier.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Check size={14} className="text-foreground mt-0.5 flex-shrink-0" />
                      <span className={`text-sm ${f.startsWith("Everything") ? "font-medium" : "text-muted-foreground"}`}>
                        {f}
                      </span>
                    </div>
                  ))}
                  {tier.excluded.map((f, j) => (
                    <div key={`ex-${j}`} className="flex items-start gap-3 opacity-35">
                      <X size={14} className="mt-0.5 flex-shrink-0" />
                      <span className="text-sm line-through">{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={getWhatsAppLink(tier.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full justify-center ${isHighlighted ? "btn-filled" : "btn-outline"}`}
                >
                  <MessageCircle size={16} />
                  Get Started
                  <ArrowUpRight size={14} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="border border-foreground/10 p-10"
          >
            <h3 className="mb-4">How It Works</h3>
            <p className="text-body text-muted-foreground mb-6">
              50% deposit to begin, balance due before launch. All packages
              include a signed agreement.
            </p>
            <div className="h-px bg-foreground/10 mb-6" />
            <p className="text-body-sm text-muted-foreground mb-6">
              Need something custom? Let's talk — we'll build a package that
              fits your exact needs.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Lujens! I'm looking for a custom package. Can we discuss?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
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
