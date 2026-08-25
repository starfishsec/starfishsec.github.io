import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Research } from "@/components/sections/Research";
import { Services } from "@/components/sections/Services";
import { StatsBar } from "@/components/sections/StatsBar";
import { Team } from "@/components/sections/Team";
import { UspStrip } from "@/components/sections/UspStrip";
import { WhyUs } from "@/components/sections/WhyUs";

// Section order per docs/02-CONTENT.md (AnnouncementBar, Navbar, Footer live in the root layout).
export default function HomePage() {
  return (
    <>
      <Hero />
      <UspStrip />
      <StatsBar />
      <Process />
      <Services />
      <Research />
      <Team />
      <WhyUs />
      <FinalCTA />
    </>
  );
}
