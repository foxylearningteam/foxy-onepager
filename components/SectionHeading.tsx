type SectionHeadingProps = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  className?: string;
};

/** Centered section title + subtitle used across the peach sections. */
export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div data-reveal className={`text-center ${className}`}>
      <h2 className="font-gluten text-[40px] font-bold leading-[1.05] text-purple sm:text-[64px]">
        {title}
      </h2>
      <p className="mt-3 font-nunito text-2xl font-medium text-navy sm:text-3xl">
        {subtitle}
      </p>
    </div>
  );
}
