import { motion } from "framer-motion";

interface Review {
  quote: string;
  name: string;
  role: string;
}

const reviews: Review[] = [
  {
    quote:
      "Lujens delivered beyond what we expected. The website looks professional, loads fast, and our customers love it. Communication was excellent throughout.",
    name: "Judith M.",
    role: "Founder, JUHMA All Nature",
  },
  {
    quote:
      "Working with Lujens was seamless. He understood our vision immediately and turned it into a beautiful online store. Highly recommend for any business.",
    name: "Rose C. Smith",
    role: "Owner, Smith Freight Connect",
  },
  {
    quote:
      "From branding to the full website build, Lujens handled everything with care and precision. Our online presence has never looked this good.",
    name: "Lourdie C.",
    role: "Founder, LourdieHair",
  },
];

const Reviews = () => {
  return (
    <section className="bg-background section-padding">
      <div className="max-w-[1800px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          Reviews
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Quote mark */}
              <div className="text-5xl font-bold text-foreground leading-none mb-6 select-none">
                "
              </div>

              <p className="text-body text-foreground/80 mb-8 leading-relaxed">
                {review.quote}
              </p>

              <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                <span>—</span>
                <span className="font-medium text-foreground">
                  {review.name}
                </span>
                , {review.role}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
