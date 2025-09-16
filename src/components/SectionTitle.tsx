// src/components/SectionTitle.tsx
"use client";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  /** center-align heading + subtitle */
  center?: boolean;
  /** extra classes for the wrapper */
  className?: string;
};

export function SectionTitle({
  title,
  subtitle,
  center = false,
  className = "",
}: SectionTitleProps) {
  return (
    <div
      className={["mb-8", center ? "text-center" : "", className]
        .join(" ")
        .trim()}
    >
      <h2 className="font-display text-2xl sm:text-3xl font-bold">{title}</h2>
      {subtitle ? (
        <p
          className={[
            "mt-2 text-black/70 max-w-3xl",
            center ? "mx-auto" : "",
          ].join(" ")}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export type { SectionTitleProps };
