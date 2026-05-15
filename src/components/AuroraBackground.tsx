import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";

/**
 * Aurora background : strict palette : violet + red on white.
 * Watercolor-style soft washes, very subtle on light bg.
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
          "absolute -inset-[15%] opacity-35",
          "[mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_80%)]",
        )}
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #a78bfa, #d946ef, #f87171, #dc2626, #a78bfa)",
          animation: "aurora 22s ease-in-out infinite",
          filter: "blur(100px) saturate(0.95)",
        }}
      />
      {showRadialGradient && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.16), transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(220,38,38,0.10), transparent 65%)",
            }}
          />
        </>
      )}
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
