"use client";

import type { ReactNode } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type TableCol<T extends Record<string, unknown>> = {
  key: keyof T;
  label: string;
  align?: "left" | "right" | "center";
  asPercent?: boolean;
  noGroup?: boolean;
  decimals?: number;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type StatTableProps<T extends Record<string, unknown>> = {
  caption?: string;
  note?: string;
  head?: ReactNode;
  cols: Array<TableCol<T>>;
  rows: T[];
  className?: string;
};

function formatCell(
  value: unknown,
  opts?: { asPercent?: boolean; noGroup?: boolean; decimals?: number }
) {
  const { asPercent, noGroup, decimals = 1 } = opts || {};
  if (value === null || value === undefined || Number.isNaN(value)) return "—";

  if (typeof value === "number") {
    if (noGroup) {
      const out =
        decimals > 0
          ? value.toFixed(decimals).replace(/\.0+$/, "")
          : String(Math.trunc(value));
      return asPercent ? `${out}%` : out;
    }
    const out = value.toLocaleString("mn-MN", {
      maximumFractionDigits: decimals,
    });
    return asPercent ? `${out}%` : out;
  }

  return String(value);
}

export function StatTable<T extends Record<string, unknown>>({
  caption,
  note,
  head,
  cols,
  rows,
  className,
}: StatTableProps<T>) {
  return (
    <figure
      className={cx(
        "overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm",
        className
      )}
    >
      {caption && (
        <figcaption className="px-4 py-3 text-sm font-medium text-gray-700 border-b bg-gray-50">
          {caption}
        </figcaption>
      )}

      <table className="w-full text-sm">
        <thead>
          {head ? (
            head
          ) : (
            <tr className="bg-gray-50/70 text-gray-600">
              {cols.map((c, i) => (
                <th
                  key={i}
                  className={cx(
                    "px-4 py-2 font-semibold",
                    c.align === "right" && "text-right",
                    c.align === "center" && "text-center"
                  )}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          )}
        </thead>

        <tbody>
          {rows.map((r, idx) => (
            <tr
              key={idx}
              className={cx(
                "border-t",
                idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
              )}
            >
              {cols.map((c, j) => {
                const raw = r[c.key];
                const content = c.render
                  ? c.render(raw, r)
                  : formatCell(raw, {
                      asPercent: c.asPercent,
                      noGroup: c.noGroup,
                      decimals: c.decimals,
                    });
                return (
                  <td
                    key={j}
                    className={cx(
                      "px-4 py-2 whitespace-nowrap",
                      c.align === "right" && "text-right",
                      c.align === "center" && "text-center"
                    )}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {note && (
        <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t">
          {note}
        </div>
      )}
    </figure>
  );
}
