import { motion } from "framer-motion";
import { ArrowUpRight, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE"; // Replace with your Web3Forms access key

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try WhatsApp instead.");
      }
    } catch {
      setError("Failed to send. Please try WhatsApp instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-28">
      <section className="section-padding min-h-[80vh]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left — heading + WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-label text-muted-foreground mb-4">Contact</p>
              <h1 className="mb-8">Let's Talk</h1>
              <p className="text-body-lg text-muted-foreground mb-10 max-w-md">
                Have a project in mind? Looking for a creative technologist?
                Reach out — I'd love to hear what you're building.
              </p>

              <a
                href="https://wa.me/15619783888?text=Hi%20Lujens!%20I'm%20interested%20in%20working%20together."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mb-8"
              >
                <MessageCircle size={16} />
                Message on WhatsApp
                <ArrowUpRight size={14} />
              </a>

              <div className="mt-12 space-y-3 text-body-sm text-muted-foreground">
                <p>
                  <a href="mailto:contact@lujensp.com" className="hover:text-foreground transition-colors">
                    contact@lujensp.com
                  </a>
                </p>
                <p>Cape Coral, Florida</p>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {submitted ? (
                <div className="border border-foreground/10 p-12 text-center">
                  <div className="w-16 h-16 border border-foreground/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Send size={24} className="text-foreground" />
                  </div>
                  <h3 className="mb-3">Message Sent</h3>
                  <p className="text-body text-muted-foreground">
                    I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label className="text-label text-muted-foreground block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-label text-muted-foreground block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@email.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-label text-muted-foreground block mb-2">
                      Project Type
                    </label>
                    <select name="project_type" className="w-full bg-transparent">
                      <option>Branding & Design</option>
                      <option>Web Development</option>
                      <option>E-Commerce Store</option>
                      <option>Internship Opportunity</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-label text-muted-foreground block mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-outline w-full justify-center disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Send Message"}
                    <Send size={14} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
