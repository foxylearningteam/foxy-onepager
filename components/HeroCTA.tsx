"use client";

import Button from "./Button";

export default function HeroCTA({ label }: { label: string }) {
  function scrollToStories() {
    document
      .getElementById("exciting-stories")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Button size="lg" className="mt-8" onClick={scrollToStories}>
      {label}
    </Button>
  );
}
