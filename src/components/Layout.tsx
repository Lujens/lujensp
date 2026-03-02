import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";
import FloatingCTA from "./FloatingCTA";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Layout;
