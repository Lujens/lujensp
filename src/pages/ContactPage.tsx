import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-24">
      <section className="section-padding gradient-mesh min-h-[80vh] flex items-center">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Contact</p>
            <h1 className="heading-xl text-foreground mb-6">
              Let's Build Something <span className="text-gradient">Together</span>
            </h1>
            <p className="body-lg">
              Have a project in mind? Looking for a creative technologist? Drop me a line.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-10 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                <Send size={24} className="text-primary" />
              </div>
              <h3 className="heading-md text-foreground mb-2">Message Sent</h3>
              <p className="body-md">I'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="glass rounded-2xl p-8 md:p-10 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Project Type</label>
                <select className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                  <option>Branding & Design</option>
                  <option>Web Development</option>
                  <option>Product Design</option>
                  <option>Internship Opportunity</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-primary"
              >
                Send Message
                <Send size={16} />
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
