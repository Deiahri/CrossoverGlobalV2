import HomeHero from "../_components/HomeHero";
import SponsorStrip from "../_components/SponsorStrip";
import Button from "../_components/Button";
import Reveal from "../_components/Reveal";
import { RiArrowRightLine } from "react-icons/ri";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* About — image left, text right */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <section className="flex flex-col md:flex-row" aria-labelledby="about-heading">

          <Reveal variant="fadeLeft" className="relative h-72 w-full md:h-auto md:min-h-120 md:w-1/2 rounded-sm overflow-hidden">
            <img src={'/img/school-boys-2.jpg'} alt="Crossover Global ministry" className="h-full w-full object-cover" />
          </Reveal>

          <div className="flex w-full flex-col justify-center gap-5 px-8 py-14 md:w-1/2 md:px-16 md:py-20">
            <Reveal variant="fadeUp" delay={0}>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Who We Are</p>
            </Reveal>
            <Reveal variant="fadeUp" delay={100}>
              <h2 id="about-heading" className="text-3xl font-bold leading-snug text-foreground sm:text-4xl">
                A mission built from the inside out.
              </h2>
            </Reveal>
            <Reveal variant="fadeUp" delay={200}>
              <p className="leading-relaxed text-muted-fg">
                Crossover Global was founded on a simple conviction: the Gospel transforms lives. We mobilize believers,
                plant churches, and walk alongside communities — not as outsiders, but as family.
              </p>
            </Reveal>
            <Reveal variant="fadeUp" delay={300}>
              <Button href="/about" variant="ghost" size="md" className="self-start">
                Our Story <RiArrowRightLine className="h-4 w-4" aria-hidden />
              </Button>
            </Reveal>
          </div>

        </section>
      </div>

      {/* Projects — text left, image right */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <section className="flex flex-col md:flex-row-reverse" aria-labelledby="projects-heading">

          <Reveal variant="fadeRight" className="relative h-72 w-full md:h-auto md:min-h-120 md:w-1/2 rounded-sm overflow-hidden">
            <img src="/img/ProjectsBG.png" alt="Crossover Global projects" className="h-full w-full object-cover" />
          </Reveal>

          <div className="flex w-full flex-col justify-center gap-5 bg-surface px-8 py-14 md:w-1/2 md:px-16 md:py-20">
            <Reveal variant="fadeUp" delay={0}>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our Work</p>
            </Reveal>
            <Reveal variant="fadeUp" delay={100}>
              <h2 id="projects-heading" className="text-3xl font-bold leading-snug text-foreground sm:text-4xl">
                From widows to water wells.
              </h2>
            </Reveal>
            <Reveal variant="fadeUp" delay={200}>
              <p className="leading-relaxed text-muted-fg">
                We go where the need is greatest — drilling clean-water wells in remote villages, equipping widows with
                a livelihood, planting churches, and rebuilding after disaster. Faith in action, every time.
              </p>
            </Reveal>
            <Reveal variant="fadeUp" delay={300}>
              <Button href="/projects" variant="ghost" size="md" className="self-start">
                See Our Projects <RiArrowRightLine className="h-4 w-4" aria-hidden />
              </Button>
            </Reveal>
          </div>

        </section>
      </div>

      {/* Sponsorship — image left, text right */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <section className="flex flex-col md:flex-row" aria-labelledby="sponsorship-heading">

          <Reveal variant="fadeLeft" className="relative h-72 w-full md:h-auto md:min-h-120 md:w-1/2 rounded-sm overflow-hidden">
            <img src={'/img/little-girls.png'} alt="Crossover Global ministry" className="h-full w-full object-cover" />
          </Reveal>

          <div className="flex w-full flex-col justify-center gap-5 px-8 py-14 md:w-1/2 md:px-16 md:py-20">
            <Reveal variant="fadeUp" delay={0}>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Sponsorship</p>
            </Reveal>
            <Reveal variant="fadeUp" delay={100}>
              <h2 id="sponsorship-heading" className="text-3xl font-bold leading-snug text-foreground sm:text-4xl">
                Change one life — one month at a time.
              </h2>
            </Reveal>
            <Reveal variant="fadeUp" delay={200}>
              <p className="leading-relaxed text-muted-fg">
                Behind every need is a name. Your monthly gift directly supports an individual, covering food,
                education, and spiritual mentorship for someone who needs it most.
              </p>
            </Reveal>
            <Reveal variant="fadeUp" delay={300}>
              <Button href="/sponsorship" variant="donate" size="md" className="self-start">
                Sponsor Someone <RiArrowRightLine className="h-4 w-4" aria-hidden />
              </Button>
            </Reveal>
          </div>

        </section>
      </div>

      {/* Good News — text left, image right */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <section className="flex flex-col md:flex-row-reverse" aria-labelledby="good-news-heading">

          <Reveal variant="fadeRight" className="relative h-72 w-full md:h-auto md:min-h-120 md:w-1/2 rounded-sm overflow-hidden">
            <img src={'/img/independent-widows.jpg'} alt="Crossover Global ministry" className="h-full w-full object-cover" />
          </Reveal>

          <div className="flex w-full flex-col justify-center gap-5 bg-surface px-8 py-14 md:w-1/2 md:px-16 md:py-20">
            <Reveal variant="fadeUp" delay={0}>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Good News</p>
            </Reveal>
            <Reveal variant="fadeUp" delay={100}>
              <h2 id="good-news-heading" className="text-3xl font-bold leading-snug text-foreground sm:text-4xl">
                The good news is spreading.
              </h2>
            </Reveal>
            <Reveal variant="fadeUp" delay={200}>
              <blockquote className="border-l-2 border-primary pl-4 text-sm italic text-muted-fg leading-relaxed">
                "How beautiful are the feet of those who bring good news!"
                <cite className="mt-1 block not-italic font-medium text-foreground">— Romans 10:15</cite>
              </blockquote>
            </Reveal>
            <Reveal variant="fadeUp" delay={280}>
              <p className="leading-relaxed text-muted-fg">
                God is moving. Read testimonies, field updates, and stories of transformation straight from our
                missionaries around the world.
              </p>
            </Reveal>
            <Reveal variant="fadeUp" delay={360}>
              <Button href="/good-news" variant="ghost" size="md" className="self-start">
                Read the Good News <RiArrowRightLine className="h-4 w-4" aria-hidden />
              </Button>
            </Reveal>
          </div>

        </section>
      </div>

      <Reveal variant="fade" duration={800}>
        <SponsorStrip />
      </Reveal>
    </>
  );
}
