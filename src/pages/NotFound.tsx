import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <h1 className="mb-4">404</h1>
        <p className="text-body text-muted-foreground mb-8">
          This page doesn't exist.
        </p>
        <Link to="/" className="btn-outline">
          Back to Home <ArrowUpRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
