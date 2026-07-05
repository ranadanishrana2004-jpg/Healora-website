import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AmbientGlow from "@/components/ui/AmbientGlow";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Our Services — Healora",
  description:
    "Explore our software development expertise, including web development, AI integration, mobile apps, and digital transformation.",
};

export default function ServicesPage() {
  return (
    <>
      <ScrollProgress />
      <AmbientGlow />
      <Navbar />
      <main className="pt-16 overflow-x-clip">
        <Services />
        <Process />
      </main>
      <Footer />
    </>
  );
}
