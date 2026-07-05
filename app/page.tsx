import Image from "next/image";

import HeroCTA from "@/components/HeroCTA";
import FeatureRow from "@/components/FeatureRow";
import FeatureCard from "@/components/FeatureCard";
import EmailForm from "@/components/EmailForm";
import SectionHeading from "@/components/SectionHeading";
import { getContent } from "@/lib/content";

import checkmarkIcon from "@/assets/checkmark.svg";
import starIcon from "@/assets/star.svg";
import mailIcon from "@/assets/mail.svg";
import heroImg from "@/assets/hero.png";
import FoxyNinja from "@/assets/Foxy-ninja.svg";
import FoxyTeacher from "@/assets/Foxy-teacher.svg";
import FoxyChild from "@/assets/foxy-child.svg";

// Re-fetch CMS content at most every 30 seconds (ISR); /api/revalidate forces
// an immediate refresh.
export const revalidate = 30;

const CARD_ICONS = { checkmark: checkmarkIcon, star: starIcon, mail: mailIcon };

export default async function Home() {
  const content = await getContent();

  return (
    <main className="w-full overflow-x-hidden bg-peach">
      {/* ===== Hero ===== */}
      <section className="overflow-hidden bg-navy px-6 pb-16 pt-24 text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <h1
            data-reveal
            className="font-gluten text-[44px] font-bold leading-[1.05] text-white sm:text-[64px]"
          >
            {content.hero.title}
          </h1>
          <p
            data-reveal
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            className="mt-3 font-nunito text-2xl font-medium text-white/85 sm:text-3xl"
          >
            {content.hero.subtitle}
          </p>
          <div
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            <HeroCTA label={content.hero.cta} />
          </div>

          <Image
            data-reveal
            style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
            src={heroImg}
            alt="Foxy and Didi with the Foxy math app"
            priority
            className="mt-8 h-auto w-full max-w-2xl"
          />
        </div>
      </section>

      {/* ===== Exciting stories ===== */}
      <section id="exciting-stories" className="scroll-mt-6 bg-peach px-6 py-24">
        <div className="mx-auto max-w-[900px]">
          <SectionHeading
            className="mb-24"
            title={content.stories.heading}
            subtitle={content.stories.subtitle}
          />

          <div className="flex flex-col gap-24">
            {content.stories.features.map((feature) => (
              <FeatureRow key={feature.label} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Progress every day ===== */}
      <section className="bg-peach-deep px-6 py-24">
        <div className="mx-auto max-w-[1060px]">
          <SectionHeading
            className="mb-16"
            title={content.progress.heading}
            subtitle={content.progress.subtitle}
          />

          <div className="flex flex-col gap-8 md:flex-row">
            {content.progress.cards.map((card, index) => (
              <FeatureCard
                key={card.key}
                revealDelay={index * 100}
                icon={
                  <Image
                    src={CARD_ICONS[card.icon]}
                    alt=""
                    aria-hidden
                    className="h-14 w-14"
                  />
                }
                title={card.title}
              >
                {card.body}
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Research + Rewarding ===== */}
      <section className="bg-peach px-6 py-24">
        <div className="mx-auto flex max-w-[900px] flex-col gap-24">
          {content.research.features.map((feature) => (
            <FeatureRow key={feature.label} {...feature} />
          ))}
        </div>
      </section>

      {/* ===== What we stand for ===== */}
      <section className="bg-peach px-6 pb-24">
        <div className="mx-auto max-w-[860px]">
          <div
            data-reveal
            className="rounded-[32px] bg-white px-10 py-12 shadow-[0_3px_0_0_var(--color-peach-deep)] sm:px-14"
          >
            <h2 className="mb-8 font-gluten text-[40px] font-bold leading-[1.05] text-purple sm:text-[56px]">
              {content.stand.heading}
            </h2>
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
              <ul className="flex flex-col gap-6">
                {content.stand.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-nunito text-xl font-bold text-navy"
                  >
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-purple" />
                    {item}
                  </li>
                ))}
              </ul>
              <Image
                src={FoxyNinja}
                alt="Foxy ninja mascot"
                className="w-44 shrink-0 sm:w-52"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Subscribe ===== */}
      <section className="bg-peach-deep px-6 py-24">
        <div className="mx-auto max-w-[900px]">
          <SectionHeading
            className="mb-14"
            title={content.subscribe.heading}
            subtitle={content.subscribe.subtitle}
          />

          <div className="flex items-center justify-center gap-2 sm:gap-6">
            <Image
              src={FoxyTeacher}
              alt="Foxy teacher mascot"
              className="hidden h-auto w-28 shrink-0 sm:block md:w-48"
            />
            <EmailForm text={content.subscribe} />
            <Image
              src={FoxyChild}
              alt="Foxy child mascot"
              className="hidden h-auto w-28 shrink-0 sm:block md:w-48"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
