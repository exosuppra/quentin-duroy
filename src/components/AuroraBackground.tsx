import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";

/**
 * Aurora background — inspired by aceternity/aurora-background.
 * Pure CSS animations, no per-frame JS. Hydrated for prefers-reduced-motion handling.
 */
export default function AuroraBackground({
  className,
  showRadialGradient = true,
}: {
  className?: string;
  showRadialGradient?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce && ref.current) {
      ref.current.style.animation = "none";
    }
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        ref={ref}
        className={cn(
          "absolute -inset-[10%] opacity-60 blur-3xl",
          "[mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_75%)]",
        )}
        style={{
          /* coucher de soleil sur Valensole : lavande -> terracotta -> ocre */
          background:
            "conic-gradient(from 180deg at 50% 50%, #7c3aed, #c026d3, #c2410c, #d97706, #7c3aed)",
          animation: "aurora 22s ease-in-out infinite",
          filter: "blur(60px) saturate(1.15)",
        }}
      />
      {showRadialGradient && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.35), transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(217,119,6,0.18), transparent 65%)",
            }}
          />
        </>
      )}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
