import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSponsorship, getSponsorshipSlugs } from "../../../lib/api";
import Badge from "../../../_components/Badge";
import RichText from "../../../_components/RichText";
import YoutubeEmbed from "../../../_components/YoutubeEmbed";
import DonorboxEmbed from "../../../_components/DonorboxEmbed";
import ShareLinks from "../../../_components/ShareLinks";
import ScrollIntoViewButton from "../../../_components/ScrollIntoViewButton";
import Reveal from "../../../_components/Reveal";
import { resolveStrapiMediaUrl } from "@/lib/tools";
import { RiArrowDownLine } from "react-icons/ri";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getSponsorshipSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const s = await getSponsorship(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.short_desc,
  };
}

export default async function SponsorshipDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const s = await getSponsorship(slug);
  if (!s) notFound();

  return (
    <article>
      {/* Header */}
      <div className="bg-brand-950 border-b border-border ">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-24 py-32 lg:py-24">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            {/* Portrait */}
            <Reveal variant="fadeLeft" className="relative w-full max-w-xs mx-auto lg:mx-0 lg:w-64 shrink-0">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-md bg-neutral-100">
                <img
                  src={resolveStrapiMediaUrl(s.image.url)}
                  alt={s.image.alternativeText ?? s.sponsee}
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                />
              </div>
            </Reveal>

            {/* Header info */}
            <div className="flex-1">
              <Reveal variant="fadeUp" delay={0}>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-2">Sponsorship</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge label={s.country} variant="country" />
                  {s.complete && <Badge label="Sponsored" variant="completed" />}
                </div>
              </Reveal>
              <Reveal variant="fadeUp" delay={100}>
                <h1 className="text-3xl font-bold text-white sm:text-4xl leading-tight mb-4">
                  {s.title}
                </h1>
              </Reveal>
              <Reveal variant="fadeUp" delay={200}>
                <p className="text-base text-white leading-relaxed max-w-xl mb-6">
                  {s.short_desc}
                </p>
              </Reveal>
              {!s.complete && (
                <Reveal variant="fadeUp" delay={300}>
                  <ScrollIntoViewButton targetId="donorbox-embed" variant="donate" size="md" className="self-start">
                    Donate <RiArrowDownLine className="h-4 w-4" aria-hidden />
                  </ScrollIntoViewButton>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Bio */}
        {s.sponsee_desc && (
          <Reveal variant="fadeUp">
            <section aria-labelledby="bio-heading">
              <h2
                id="bio-heading"
                className="text-4xl font-bold text-primary mb-4"
              >
                About {s.sponsee}
              </h2>
              <RichText content={s.sponsee_desc} />
            </section>
          </Reveal>
        )}

        {/* Video */}
        {s.sponsee_request_video && (
          <Reveal variant="fadeUp">
            <YoutubeEmbed
              url={s.sponsee_request_video}
              title={`${s.sponsee} sponsorship video`}
            />
          </Reveal>
        )}

        {/* Needs / itemized request */}
        {s.sponsee_request_desc && (
          <Reveal variant="fadeUp">
            <section aria-labelledby="needs-heading">
              <h2
                id="needs-heading"
                className="text-4xl font-bold text-primary mb-4"
              >
                Support Needs
              </h2>
              <RichText content={s.sponsee_request_desc} />
            </section>
          </Reveal>
        )}

        {/* Optional sections */}
        {s.optional_sections?.map((section, i) => (
          <Reveal key={i} variant="fadeUp">
            <section aria-labelledby={`optional-${i}`}>
              <h2
                id={`optional-${i}`}
                className="text-2xl font-bold text-foreground mb-4"
              >
                {section.title}
              </h2>
              <RichText content={section.content} />
            </section>
          </Reveal>
        ))}

        {/* Encouragement + Donate */}
        {!s.complete && (
          <Reveal variant="fadeUp">
            <section
              aria-labelledby="donate-heading"
              className="rounded-2xl bg-accent border border-brand-200 p-8 text-center flex flex-col justify-center align-middle"
            >
              {s.encouragement && (
                <p className="text-lg text-foreground font-medium mb-6 leading-relaxed">
                  {s.encouragement}
                </p>
              )}
              <h2
                id="donate-heading"
                className="text-2xl font-bold text-foreground mb-6"
              >
                Sponsor {s.sponsee}
              </h2>
              <DonorboxEmbed html={s.donorbox_code} id="donorbox-embed" />
            </section>
          </Reveal>
        )}

        {/* Share */}
        <Reveal variant="fadeUp">
          <ShareLinks title={s.title} subheading={s.encouragement} scrollTargetId={s.complete ? undefined : "donorbox-embed"} />
        </Reveal>
      </div>
    </article>
  );
}
