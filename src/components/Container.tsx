// src/components/Container.tsx
import React from "react";

export function Container({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id || undefined}
      className={`container-px max-w-7xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
