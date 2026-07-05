import type { StaticImageData } from "next/image";

import { fetchNotionContent, type ContentMap } from "./notion";

import educationImg from "@/assets/education.png";
import gamificationImg from "@/assets/gamification.png";
import intelligentImg from "@/assets/inteligent.png";
import researchImg from "@/assets/research.png";

export type FeatureContent = {
  label: string;
  title: string; // use "\n" for line breaks
  body: string;
  imageAlt: string;
  imageClassName: string;
  image?: StaticImageData;
  video?: string;
  reverse?: boolean;
};

export type CardContent = {
  key: string;
  icon: "checkmark" | "star" | "mail";
  title: string;
  body: string;
};

export type SiteContent = {
  hero: { title: string; subtitle: string; cta: string };
  stories: { heading: string; subtitle: string; features: FeatureContent[] };
  progress: { heading: string; subtitle: string; cards: CardContent[] };
  research: { features: FeatureContent[] };
  stand: { heading: string; items: string[] };
  subscribe: {
    heading: string;
    subtitle: string;
    formLabel: string;
    placeholder: string;
    submitLabel: string;
    consentIntro: string;
    termsLabel: string;
    privacyLabel: string;
    consentAnd: string;
    successMessage: string;
  };
};

/**
 * Static (non-text) config for each row/card lives here; only `label`, `title`
 * and `body` are pulled from the CMS. `key` maps to Notion content keys.
 */
const STORY_FEATURES: (Omit<FeatureContent, "label" | "title" | "body"> & {
  key: string;
  label: string;
  title: string;
  body: string;
})[] = [
  {
    key: "stories.0",
    label: "Education",
    title: "learn through\nstories",
    body: "Discover math through fun and exciting stories! Each story helps you learn something new while having fun. Learning has never been this enjoyable!",
    image: educationImg,
    imageAlt: "Foxy app character selection screen",
    imageClassName: "w-64",
  },
  {
    key: "stories.1",
    label: "Gamification",
    reverse: true,
    title: "backed by science",
    body: "Our learning method is backed by science! We combine proven educational techniques with modern technology to ensure you learn faster and more effectively.",
    image: gamificationImg,
    imageAlt: "Foxy app motivation and rewards screen",
    imageClassName: "w-64",
  },
  {
    key: "stories.2",
    label: "Intelligent",
    title: "personalized\nlearning",
    body: "We want offer a tailored learning experience just for you! Unlock additional features for only $1.99 per month and take your math skills to the next level!",
    image: intelligentImg,
    imageAlt: "Foxy app personalized learning screen",
    imageClassName: "w-64",
  },
];

const RESEARCH_FEATURES: (typeof STORY_FEATURES)[number][] = [
  {
    key: "research.0",
    label: "Research",
    title: "in Collaboration\nwith Psychologists",
    body: "We collaborate with psychologists and children to create the best learning experience, without overwhelming kids with screen time. Our research ensures kids stay motivated, learn faster, and spend less time on devices.",
    image: researchImg,
    imageAlt: "Foxy characters designed with psychologists",
    imageClassName: "w-72",
  },
  {
    key: "research.1",
    label: "Rewarding",
    reverse: true,
    title: "physical rewards",
    body: "Earn real-world rewards for your hard work! Learning math has never been this rewarding – both digitally and physically!",
    video: "/foxy_08.mp4",
    imageAlt: "Foxy physical rewards and merchandise",
    imageClassName: "w-full",
  },
];

const PROGRESS_CARDS: CardContent[] = [
  {
    key: "progress.0",
    icon: "checkmark",
    title: "stay super\nmotivated",
    body: "Keep the learning energy high with personalized goals and encouragements. Stay motivated and make progress every day!",
  },
  {
    key: "progress.1",
    icon: "star",
    title: "surprise games\nand rewards",
    body: "Unlock surprise games and rewards as you learn! The more you explore, the more fun you'll find!",
  },
  {
    key: "progress.2",
    icon: "mail",
    title: "reports to\nyour inbox",
    body: "Get detailed progress reports sent directly to your inbox, so you can track learning milestones and achievements!",
  },
];

const STAND_ITEMS = [
  "Simple math learning in 10 min.",
  "Available in your native language",
  "No ads, Ever. Period.",
  "Your data is yours – we never share it!",
  "Raising a Healthy, Educated Generation",
];

/** Builds the content tree, overlaying Notion values on top of the defaults. */
function build(map: ContentMap): SiteContent {
  const t = (key: string, fallback: string) => {
    const v = map[key];
    return v && v.trim() ? v : fallback;
  };

  const feature = (
    f: (typeof STORY_FEATURES)[number],
  ): FeatureContent => ({
    label: t(`${f.key}.label`, f.label),
    title: t(`${f.key}.title`, f.title),
    body: t(`${f.key}.body`, f.body),
    image: f.image,
    video: f.video,
    imageAlt: f.imageAlt,
    imageClassName: f.imageClassName,
    reverse: f.reverse,
  });

  const standRaw = map["stand.items"];
  const standItems = standRaw?.trim()
    ? standRaw
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : STAND_ITEMS;

  return {
    hero: {
      title: t("hero.title", "learn math easy!"),
      subtitle: t("hero.subtitle", "The free, fun, and effective way to learn math!"),
      cta: t("hero.cta", "Start Exploring"),
    },
    stories: {
      heading: t("stories.heading", "exciting stories"),
      subtitle: t("stories.subtitle", "Learn something new while having fun"),
      features: STORY_FEATURES.map(feature),
    },
    progress: {
      heading: t("progress.heading", "progress every day"),
      subtitle: t(
        "progress.subtitle",
        "Offering a tailored learning experience just for you",
      ),
      cards: PROGRESS_CARDS.map((c) => ({
        key: c.key,
        icon: c.icon,
        title: t(`${c.key}.title`, c.title),
        body: t(`${c.key}.body`, c.body),
      })),
    },
    research: {
      features: RESEARCH_FEATURES.map(feature),
    },
    stand: {
      heading: t("stand.heading", "What we stand for"),
      items: standItems,
    },
    subscribe: {
      heading: t("subscribe.heading", "Subscribe"),
      subtitle: t(
        "subscribe.subtitle",
        "Discover math through fun and exciting stories!",
      ),
      formLabel: t("subscribe.formLabel", "Enter your email here:"),
      placeholder: t("subscribe.placeholder", "Your email"),
      submitLabel: t("subscribe.submitLabel", "Subscribe"),
      consentIntro: t(
        "subscribe.consentIntro",
        "I am at least 18 years old and agree to Foxy's",
      ),
      termsLabel: t("subscribe.termsLabel", "Terms of Use"),
      privacyLabel: t("subscribe.privacyLabel", "Privacy Policy"),
      consentAnd: t("subscribe.consentAnd", "and"),
      successMessage: t("subscribe.successMessage", "Thanks! You're on the list."),
    },
  };
}

/** Fetches CMS content (falls back to built-in copy when Notion is unset). */
export async function getContent(): Promise<SiteContent> {
  return build(await fetchNotionContent());
}
