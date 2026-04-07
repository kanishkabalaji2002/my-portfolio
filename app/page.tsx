import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { ContactSection } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <div style={{ marginTop: "-60px" }}>
        <Projects />
      </div>
      <ContactSection />
      <Footer />
    </main>
  );
}
