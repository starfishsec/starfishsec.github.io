import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Research } from "@/components/sections/Research";
import { Services } from "@/components/sections/Services";
import { StatsBar } from "@/components/sections/StatsBar";
import { Team } from "@/components/sections/Team";
import { UspStrip } from "@/components/sections/UspStrip";

/**
 * Section order (redesign 2026-08-26): proof strip directly under the hero, then the four USPs.
 * The former `WhyUs` section repeated the USPs almost verbatim and was folded into `UspStrip`
 * (which keeps the `#why` anchor). AnnouncementBar, Navbar, Footer live in the root layout.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <UspStrip />
      <Process />
      <Services />
      <Research />
      <Team />
      <FinalCTA />
    </>
  );
}
