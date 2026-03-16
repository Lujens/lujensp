import Hero from "@/components/home/Hero";
import TitleReveal from "@/components/home/TitleReveal";
import AboutIntro from "@/components/home/AboutIntro";
import WorkShowcase from "@/components/home/WorkShowcase";
import CredentialsSection from "@/components/home/CredentialsSection";
import Statement from "@/components/home/Statement";
import Reviews from "@/components/home/Reviews";

const Index = () => {
  return (
    <>
      <Hero />
      <TitleReveal />
      <AboutIntro />
      <WorkShowcase />
      <CredentialsSection />
      <Statement />
      <Reviews />
    </>
  );
};

export default Index;
