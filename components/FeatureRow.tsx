import Image, { type StaticImageData } from "next/image";
import SectionLabel from "./SectionLabel";

type FeatureRowProps = {
  label: string;
  title: React.ReactNode;
  body: React.ReactNode;
  imageAlt: string;
  /** Static illustration. Provide this or `video`. */
  image?: StaticImageData;
  /** Looping video (public/ path). Takes precedence over `image`. */
  video?: string;
  reverse?: boolean;
  imageClassName?: string;
};

export default function FeatureRow({
  label,
  title,
  body,
  image,
  video,
  imageAlt,
  reverse = false,
  imageClassName = "",
}: FeatureRowProps) {
  return (
    <div
      className={`flex flex-col items-center gap-6 md:gap-12 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div data-reveal className="flex-1">
        <div className="mb-2">
          <SectionLabel>{label}</SectionLabel>
        </div>
        <h3 className="mb-5 font-gluten text-[32px] font-bold leading-[1.15] text-purple sm:text-4xl">
          {title}
        </h3>
        <p className="max-w-md font-nunito text-xl leading-relaxed text-ink">
          {body}
        </p>
      </div>
      <div
        data-reveal
        style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        className={`flex flex-1 justify-center ${video ? "md:flex-[1.6]" : ""}`}
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            aria-label={imageAlt}
            className={`h-auto ${imageClassName}`}
          />
        ) : (
          image && (
            <Image
              src={image}
              alt={imageAlt}
              className={`h-auto w-auto ${imageClassName}`}
            />
          )
        )}
      </div>
    </div>
  );
}
