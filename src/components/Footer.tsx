import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Facebook, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="heading-md text-foreground mb-2">
              Let's build something <span className="text-gradient">together.</span>
            </h3>
            <p className="body-md">Ready to bring your idea to life?</p>
          </div>
          <a
            href="https://wa.me/15619783888?text=Hi%20Lujens!%20I'm%20interested%20in%20working%20together."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Get In Touch
          </a>
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lujens Pierre. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { icon: Instagram, href: "https://instagram.com/lujensp" },
              { icon: Facebook, href: "https://facebook.com/LujensPage" },
              { icon: Youtube, href: "https://youtube.com/@LujensP" },
              { icon: Github, href: "https://github.com/Lujens" },
              { icon: Linkedin, href: "https://linkedin.com/in/lujensp" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
