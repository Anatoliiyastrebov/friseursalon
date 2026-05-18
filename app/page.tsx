import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Services } from "@/sections/Services";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Gallery } from "@/sections/Gallery";
import { Team } from "@/sections/Team";
import { Testimonials } from "@/sections/Testimonials";
import { Booking } from "@/sections/Booking";
import { FAQ } from "@/sections/FAQ";
import { InstagramSection } from "@/sections/Instagram";
import { Contact } from "@/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <CtaBanner
        title="Bereit für Ihren neuen Look?"
        description="Vereinbaren Sie noch heute Ihren persönlichen Beratungstermin – wir freuen uns auf Sie."
      />
      <Services />
      <Gallery />
      <Team />
      <CtaBanner
        title="Geschenkgutscheine verfügbar"
        description="Überraschen Sie Ihre Liebsten mit einem Moment der Schönheit und Entspannung."
        buttonText="Gutschein anfragen"
        buttonHref="#contact"
      />
      <Testimonials />
      <Booking />
      <FAQ />
      <InstagramSection />
      <Contact />
    </>
  );
}
