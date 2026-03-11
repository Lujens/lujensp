import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const FloatingCTA = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-3 glass rounded-2xl p-5 w-72 glow-primary"
          >
            <p className="text-sm font-medium text-foreground mb-3">
              Ready to build something amazing?
            </p>
            <a
              href="https://wa.me/15619783888?text=Hi%20Lujens!%20I'm%20interested%20in%20working%20together."
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm font-medium px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Message on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg glow-primary"
      >
        {expanded ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>
    </div>
  );
};

export default FloatingCTA;
