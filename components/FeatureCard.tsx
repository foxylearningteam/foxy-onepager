type FeatureCardProps = {
  icon: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
  /** Stagger delay (ms) for the scroll-reveal animation. */
  revealDelay?: number;
};

export default function FeatureCard({
  icon,
  title,
  children,
  revealDelay = 0,
}: FeatureCardProps) {
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${revealDelay}ms` } as React.CSSProperties}
      className="flex flex-1 flex-col items-center rounded-[26px] bg-white px-8 py-9 text-center shadow-[0_3px_0_0_var(--color-lip)]"
    >
      <div className="mb-5">{icon}</div>
      <h3 className="mb-4 font-gluten text-3xl font-bold leading-[1.15] text-purple">
        {title}
      </h3>
      <p className="font-nunito text-lg leading-relaxed text-ink">{children}</p>
    </div>
  );
}
