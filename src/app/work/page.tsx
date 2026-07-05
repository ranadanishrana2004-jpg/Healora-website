import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AmbientGlow from "@/components/ui/AmbientGlow";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import CtaBand from "@/components/sections/CtaBand";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Our Work — Healora",
  description:
    "Explore our portfolio of custom software solutions, including web apps, mobile apps, and machine learning integrations.",
};

export default function WorkPage() {
  return (
    <>
      <ScrollProgress />
      <AmbientGlow />
      <Navbar />
      <main className="pt-16 overflow-x-clip">
        <Work />
        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
