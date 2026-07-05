import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AmbientGlow from "@/components/ui/AmbientGlow";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Contact Us — Healora",
  description:
    "Get in touch with Healora. Tell us about your project requirements, request a consultation, or view our frequently asked questions.",
};

export default function ContactPage() {
  return (
    <>
      <ScrollProgress />
      <AmbientGlow />
      <Navbar />
      <main className="pt-16 overflow-x-clip">
        <Contact />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
