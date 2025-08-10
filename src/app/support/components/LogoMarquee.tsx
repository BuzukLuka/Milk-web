"use client";

import Image from "next/image";
import React from "react";

type LogoItem = { src: string; alt: string; href?: string };

type Props = {
  items: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  height?: number;
  width?: number;
  gap?: number;
  boxPad?: number;
  className?: string;
};

type CSSVars = React.CSSProperties & {
  ["--duration"]?: string;
  ["--direction"]?: "normal" | "reverse";
  ["--gap"]?: string;
};

export default function LogoMarquee({
  items,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  height = 72,
  width = 180,
  gap = 64,
  boxPad = 16,
  className = "",
}: Props) {
  const sequence = [...items, ...items];

  const styleVars: CSSVars = {
    ["--duration"]: `${speed}s`,
    ["--direction"]: direction === "right" ? "reverse" : "normal",
    ["--gap"]: `${gap}px`,
  };

  return (
    <div
      className={`relative overflow-hidden ${className} ${
        pauseOnHover ? "logo-marquee" : ""
      }`}
      style={styleVars}
    >
      <div
        className="logo-track flex flex-nowrap items-center will-change-transform select-none"
        style={{
          columnGap: "var(--gap)",
          height,
          animation: "logo-marquee var(--duration) linear infinite",
          animationDirection: "var(--direction)",
          width: "max-content",
        }}
      >
        {sequence.map((it, i) => {
          return (
            <div
              key={`${it.src}-${i}`}
              className="relative flex-none"
              style={{ height, width }}
              aria-label={it.alt}
              title={it.alt}
            >
              <div
                className="relative w-full h-full"
                style={{ padding: boxPad }}
              >
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  className="object-contain"
                  sizes={`${width - boxPad * 2}px`}
                  priority={i < items.length}
                />
              </div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes logo-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .logo-marquee:hover .logo-track {
          animation-play-state: ${pauseOnHover ? "paused" : "running"};
        }
      `}</style>
    </div>
  );
}
