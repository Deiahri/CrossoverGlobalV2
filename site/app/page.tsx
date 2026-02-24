import Image from "next/image";
import HomeHero from "../_components/HomeHero";
import SponsorStrip from "../_components/SponsorStrip";
import Button from "../_components/Button";
import { RiArrowRightLine } from "react-icons/ri";

const SECTION_IMAGE = "https://www.crossoverglobal.org/images/school-boys.jpg";

function SectionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative min-h-72 w-full md:min-h-120 md:w-1/2 rounded-sm overflow-none">
      <img src={src} alt={alt} className="h-full w-full object-cover rounded-sm" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* About — image left, text right */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <section
          className="flex flex-col md:flex-row"
          aria-labelledby="about-heading"
        >
          <SectionImage src={SECTION_IMAGE} alt="Crossover Global ministry" />
          <div className="flex w-full flex-col justify-center gap-5 px-8 py-14 md:w-1/2 md:px-16 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Who We Are
            </p>
            <h2
              id="about-heading"
              className="text-3xl font-bold leading-snug text-foreground sm:text-4xl"
            >
              A mission built from the inside out.
            </h2>
            <p className="leading-relaxed text-muted-fg">
              Crossover Global was founded on a simple conviction: the Gospel
              transforms lives. We mobilize believers, plant churches, and walk
              alongside communities — not as outsiders, but as family.
            </p>
            <Button
              href="/about"
              variant="ghost"
              size="md"
              className="self-start"
            >
              Our Story <RiArrowRightLine className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </section>
      </div>

      {/* Projects — text left, image right */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <section
          className="flex flex-col md:flex-row-reverse"
          aria-labelledby="projects-heading"
        >
          <SectionImage src={'https://www.crossoverglobal.org/images/ProjectsBG.png'} alt="Crossover Global ministry" />
          <div className="flex w-full flex-col justify-center gap-5 bg-surface px-8 py-14 md:w-1/2 md:px-16 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Our Work
            </p>
            <h2
              id="projects-heading"
              className="text-3xl font-bold leading-snug text-foreground sm:text-4xl"
            >
              From widows to water wells.
            </h2>
            <p className="leading-relaxed text-muted-fg">
              We go where the need is greatest — drilling clean-water wells in
              remote villages, equipping widows with a livelihood, planting
              churches, and rebuilding after disaster. Faith in action, every
              time.
            </p>
            <Button
              href="/projects"
              variant="ghost"
              size="md"
              className="self-start"
            >
              See Our Projects{" "}
              <RiArrowRightLine className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </section>
      </div>

      {/* Sponsorship — image left, text right */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <section
          className="flex flex-col md:flex-row"
          aria-labelledby="sponsorship-heading"
        >
          <SectionImage src={SECTION_IMAGE} alt="Crossover Global ministry" />
          <div className="flex w-full flex-col justify-center gap-5 px-8 py-14 md:w-1/2 md:px-16 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Sponsorship
            </p>
            <h2
              id="sponsorship-heading"
              className="text-3xl font-bold leading-snug text-foreground sm:text-4xl"
            >
              Change one life — one month at a time.
            </h2>
            <p className="leading-relaxed text-muted-fg">
              Behind every need is a name. Your monthly gift directly supports
              an individual, covering food, education, and spiritual mentorship
              for someone who needs it most.
            </p>
            <Button
              href="/sponsorship"
              variant="donate"
              size="md"
              className="self-start"
            >
              Sponsor Someone{" "}
              <RiArrowRightLine className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </section>
      </div>

      {/* Good News — text left, image right */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <section
          className="flex flex-col md:flex-row-reverse"
          aria-labelledby="good-news-heading"
        >
          <SectionImage src={SECTION_IMAGE} alt="Crossover Global ministry" />
          <div className="flex w-full flex-col justify-center gap-5 bg-surface px-8 py-14 md:w-1/2 md:px-16 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Good News
            </p>
            <h2
              id="good-news-heading"
              className="text-3xl font-bold leading-snug text-foreground sm:text-4xl"
            >
              The good news is spreading.
            </h2>
            <blockquote className="border-l-2 border-primary pl-4 text-sm italic text-muted-fg leading-relaxed">
              "How beautiful are the feet of those who bring good news!"
              <cite className="mt-1 block not-italic font-medium text-foreground">
                — Romans 10:15
              </cite>
            </blockquote>
            <p className="leading-relaxed text-muted-fg">
              God is moving. Read testimonies, field updates, and stories of
              transformation straight from our missionaries around the world.
            </p>
            <Button
              href="/good-news"
              variant="ghost"
              size="md"
              className="self-start"
            >
              Read the Good News{" "}
              <RiArrowRightLine className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </section>
      </div>

      <SponsorStrip />
    </>
  );
}
