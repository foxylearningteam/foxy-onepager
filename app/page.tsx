import Image, { type StaticImageData } from "next/image";

import HeroCTA from "@/components/HeroCTA";
import FeatureRow from "@/components/FeatureRow";
import FeatureCard from "@/components/FeatureCard";
import EmailForm from "@/components/EmailForm";
import SectionHeading from "@/components/SectionHeading";

import checkmarkIcon from "@/assets/checkmark.svg";
import starIcon from "@/assets/star.svg";
import mailIcon from "@/assets/mail.svg";
import heroImg from "@/assets/hero.png";
import educationImg from "@/assets/education.png";
import gamificationImg from "@/assets/gamification.png";
import intelligentImg from "@/assets/inteligent.png";
import researchImg from "@/assets/research.png";
import FoxyNinja from "@/assets/Foxy-ninja.svg";
import FoxyTeacher from "@/assets/Foxy-teacher.svg";
import FoxyChild from "@/assets/foxy-child.svg";

type Feature = {
  label: string;
  title: React.ReactNode;
  body: string;
  image?: StaticImageData;
  video?: string;
  imageAlt: string;
  imageClassName: string;
  reverse?: boolean;
};

const STORY_FEATURES: Feature[] = [
  {
    label: "Education",
    title: (
      <>
        learn through
        <br />
        stories
      </>
    ),
    body: "Discover math through fun and exciting stories! Each story helps you learn something new while having fun. Learning has never been this enjoyable!",
    image: educationImg,
    imageAlt: "Foxy app character selection screen",
    imageClassName: "w-64",
  },
  {
    label: "Gamification",
    reverse: true,
    title: "backed by science",
    body: "Our learning method is backed by science! We combine proven educational techniques with modern technology to ensure you learn faster and more effectively.",
    image: gamificationImg,
    imageAlt: "Foxy app motivation and rewards screen",
    imageClassName: "w-64",
  },
  {
    label: "Intelligent",
    title: (
      <>
        personalized
        <br />
        learning
      </>
    ),
    body: "We want offer a tailored learning experience just for you! Unlock additional features for only $1.99 per month and take your math skills to the next level!",
    image: intelligentImg,
    imageAlt: "Foxy app personalized learning screen",
    imageClassName: "w-64",
  },
];

const RESEARCH_FEATURES: Feature[] = [
  {
    label: "Research",
    title: (
      <>
        in Collaboration
        <br />
        with Psychologists
      </>
    ),
    body: "We collaborate with psychologists and children to create the best learning experience, without overwhelming kids with screen time. Our research ensures kids stay motivated, learn faster, and spend less time on devices.",
    image: researchImg,
    imageAlt: "Foxy characters designed with psychologists",
    imageClassName: "w-72",
  },
  {
    label: "Rewarding",
    reverse: true,
    title: "physical rewards",
    body: "Earn real-world rewards for your hard work! Learning math has never been this rewarding – both digitally and physically!",
    video: "/foxy_06.mp4",
    imageAlt: "Foxy physical rewards and merchandise",
    imageClassName: "w-full",
  },
];

const PROGRESS_CARDS: {
  key: string;
  icon: StaticImageData;
  title: React.ReactNode;
  body: string;
}[] = [
  {
    key: "motivated",
    icon: checkmarkIcon,
    title: (
      <>
        stay super
        <br />
        motivated
      </>
    ),
    body: "Keep the learning energy high with personalized goals and encouragements. Stay motivated and make progress every day!",
  },
  {
    key: "rewards",
    icon: starIcon,
    title: (
      <>
        surprise games
        <br />
        and rewards
      </>
    ),
    body: "Unlock surprise games and rewards as you learn! The more you explore, the more fun you'll find!",
  },
  {
    key: "reports",
    icon: mailIcon,
    title: (
      <>
        reports to
        <br />
        your inbox
      </>
    ),
    body: "Get detailed progress reports sent directly to your inbox, so you can track learning milestones and achievements!",
  },
];

const STANDS = [
  "Simple math learning in 10 min.",
  "Available in your native language",
  "No ads, Ever. Period.",
  "Your data is yours – we never share it!",
  "Raising a Healthy, Educated Generation",
];

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-peach">
      {/* ===== Hero ===== */}
      <section className="overflow-hidden bg-navy px-6 pb-16 pt-24 text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <h1
            data-reveal
            className="font-gluten text-[44px] font-bold leading-[1.05] text-white sm:text-[64px]"
          >
            learn math easy!
          </h1>
          <p
            data-reveal
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            className="mt-3 font-nunito text-2xl font-medium text-white/85 sm:text-3xl"
          >
            The free, fun, and effective way to learn math!
          </p>
          <div
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            <HeroCTA />
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
            title="exciting stories"
            subtitle="Learn something new while having fun"
          />

          <div className="flex flex-col gap-24">
            {STORY_FEATURES.map((feature) => (
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
            title="progress every day"
            subtitle="Offering a tailored learning experience just for you"
          />

          <div className="flex flex-col gap-8 md:flex-row">
            {PROGRESS_CARDS.map((card, index) => (
              <FeatureCard
                key={card.key}
                revealDelay={index * 100}
                icon={
                  <Image src={card.icon} alt="" aria-hidden className="h-14 w-14" />
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
          {RESEARCH_FEATURES.map((feature) => (
            <FeatureRow key={feature.label} {...feature} />
          ))}
        </div>
      </section>

      {/* ===== What we stand for ===== */}
      <section className="bg-peach px-6 pb-24">
        <div className="mx-auto max-w-[860px]">
          <div
            data-reveal
            className="relative rounded-[32px] bg-white px-10 py-12 shadow-[0_3px_0_0_var(--color-peach-deep)] sm:px-14"
          >
            <h2 className="mb-8 font-gluten text-[40px] font-bold leading-[1.05] text-purple sm:text-[56px]">
              What we stand for
            </h2>
            <ul className="flex flex-col gap-6 md:max-w-[62%]">
              {STANDS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-nunito text-xl font-bold text-navy"
                >
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-purple" />
                  {item}
                </li>
              ))}
            </ul>
            {/* Foxy pops out past the card's bottom-right edge, overlaying it. */}
            <Image
              src={FoxyNinja}
              alt="Foxy ninja"
              className="pointer-events-none mx-auto mt-8 block w-44 md:absolute md:-bottom-0 md:right-0 md:mx-0 md:mt-0 md:w-56"
            />
          </div>
        </div>
      </section>

      {/* ===== Subscribe ===== */}
      <section className="bg-peach-deep px-6 py-24">
        <div className="mx-auto max-w-[900px]">
          <SectionHeading
            className="mb-14"
            title="Subscribe"
            subtitle="Discover math through fun and exciting stories!"
          />

          <div
            data-reveal
            className="flex items-center justify-center gap-2 sm:gap-6"
          >
            <Image
              src={FoxyTeacher}
              alt="Foxy teacher mascot"
              className="hidden h-auto w-28 shrink-0 sm:block md:w-48"
            />
            <EmailForm />
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
