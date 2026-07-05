import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AmbientGlow from "@/components/ui/AmbientGlow";
import Values from "@/components/sections/Values";
import Team from "@/components/sections/Team";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "About Us — Healora",
  description:
    "Learn about Healora's vision, company values, and the expert team building high-performance software solutions.",
};

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <AmbientGlow />
      <Navbar />
      <main className="pt-16 overflow-x-clip">
        <Values />
        <Team />
      </main>
      <Footer />
    </>
  );
}
