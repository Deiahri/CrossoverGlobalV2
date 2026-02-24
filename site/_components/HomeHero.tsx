import Button from './Button'
import { RiArrowRightLine, RiHeartLine } from 'react-icons/ri'

export default function HomeHero() {
  return (
    <section
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-brand-950"
      aria-label="Mission hero"
    >
      {/* Background gradient texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 20%, var(--brand-700) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 80% 70%, var(--brand-900) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      {/* Subtle cross-hatch texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 40px, var(--brand-400) 40px, var(--brand-400) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, var(--brand-400) 40px, var(--brand-400) 41px)',
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center text-white">
        {/* Eyebrow */}
        {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-600 bg-brand-900/60 px-4 py-1.5 text-sm text-brand-200 backdrop-blur-sm">
          <RiHeartLine className="w-4 h-4 text-brand-400" aria-hidden />
          501(c)(3) Charitable Organization
        </div> */}

        {/* Headline */}
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Providing Life Assistance
          <br />
          <span className="text-brand-300">Where It Matters Most</span>
        </h1>

        {/* Mission statement */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-brand-100 sm:text-xl">
          &ldquo;To provide life assistance to those of our brothers and sisters who need it.&rdquo;
          — Supporting widows, orphans, missionaries, and underprivileged communities worldwide.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href="/projects"
            variant="donate"
            size="lg"
            className="w-full sm:w-auto"
          >
            <RiHeartLine className="w-5 h-5" aria-hidden />
            Give Now
          </Button>
          <Button
            href="/about"
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 hover:border-white/60"
          >
            Learn More
            <RiArrowRightLine className="w-5 h-5" aria-hidden />
          </Button>
        </div>

        {/* Trust signal */}
        <p className="mt-10 text-xs text-brand-400 tracking-wide uppercase">
          Listed on Charity Navigator · EIN 81-3269633
        </p>
      </div>

      {/* Bottom gradient fade */}
      {/* <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
        aria-hidden
      /> */}
    </section>
  )
}
