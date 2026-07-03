"use client";

import { useEffect } from "react";

/**
 * Reveals `[data-reveal]` elements as they scroll into view by toggling the
 * `.is-visible` class. The initial hidden state is applied via the `.js-reveal`
 * class on <html> (added by an inline script in layout.tsx before paint, so
 * there is no flash of hidden content). Users who prefer reduced motion never
 * get `.js-reveal`, so everything stays visible and this manager no-ops.
 */
export default function RevealManager() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("js-reveal")) return;
    if (!("IntersectionObserver" in window)) {
      root.classList.remove("js-reveal");
      return;
    }

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
