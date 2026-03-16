import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface CredentialRow {
  year: string;
  org: string;
  detail: string;
  url?: string;
}

const education: CredentialRow[] = [
  {
    year: "2026",
    org: "FGCU",
    detail: "B.S. Software Engineering",
  },
  {
    year: "2025",
    org: "Meta",
    detail: "Frontend Developer Certificate",
  },
  {
    year: "2024",
    org: "freeCodeCamp",
    detail: "Responsive Web Design",
  },
];

const experience: CredentialRow[] = [
  {
    year: "2024",
    org: "LujensP LLC",
    detail: "Founder — Web Design & Dev",
  },
  {
    year: "2024",
    org: "Freelance",
    detail: "E-Commerce & Branding",
  },
  {
    year: "2023",
    org: "Self-taught",
    detail: "WordPress / WooCommerce",
  },
];

const RowItem = ({ row, i }: { row: CredentialRow; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className="grid grid-cols-[60px_1fr_1fr_40px] md:grid-cols-[80px_1fr_1fr_40px] items-center py-5 border-b border-foreground/10 group"
  >
    <span className="text-body-sm text-muted-foreground">{row.year}</span>
    <span className="text-body-sm font-medium">{row.org}</span>
    <span className="text-body-sm text-muted-foreground">{row.detail}</span>
    {row.url ? (
      <a
        href={row.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowUpRight size={16} />
      </a>
    ) : (
      <span />
    )}
  </motion.div>
);

const CredentialsSection = () => {
  return (
    <section className="relative bg-background curve-top -mt-6 z-10">
      <div className="max-w-[1800px] mx-auto section-padding">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Experience */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              Experience
            </motion.h2>
            {experience.map((row, i) => (
              <RowItem key={i} row={row} i={i} />
            ))}
          </div>

          {/* Education */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-10"
            >
              Education
            </motion.h2>
            {education.map((row, i) => (
              <RowItem key={i} row={row} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;
