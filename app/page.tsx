import Navbar from "@/components/Navbar";
import PortfolioHome from "@/components/PortfolioHome";
import Footer from "@/components/Footer";
import { ContactSection } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white pt-14 sm:pt-16">
      <Navbar />
      <PortfolioHome />
      <ContactSection />
      <Footer />
    </main>
  );
}
