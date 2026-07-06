import React, { useEffect, useMemo, useState } from "react";

type SparkleColor = string;

interface SparkleData {
  id: number;
  x: number; // %
  y: number; // %
  size: number;
  color: SparkleColor;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  floatDuration: number;
  floatDelay: number;
}

interface SparkleOverlayProps {
  count?: number;
  colors?: SparkleColor[];
  sizes?: number[];
  className?: string;
}

const DEFAULT_COLORS = ["#2f6f52", "#7fb89a", "#b8d9c5", "#4a8c68"];
const DEFAULT_SIZES = [10, 14, 18, 24, 30, 32];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function generateSparkles(
  count: number,
  colors: SparkleColor[],
  sizes: number[]
): SparkleData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: randomBetween(0, 100),
    y: randomBetween(0, 100),
    size: sizes[Math.floor(Math.random() * sizes.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: randomBetween(0.3, 0.8),
    duration: randomBetween(3, 6),
    delay: randomBetween(0, 4),
    driftX: randomBetween(-8, 8),
    driftY: randomBetween(-10, 10),
    floatDuration: randomBetween(4, 9),
    floatDelay: randomBetween(0, 5),
  }));
}


function SparkleShape({ size, color }: { size: number; color: string }) {
  const s = size;
  const c = s * 0.30; // "pinch": controla o quanto a cintura da estrela se afina
  const path = `M${s / 2},0 C${s / 2},${c} ${s - c},${s / 2} ${s},${s / 2
    } C${s - c},${s / 2} ${s / 2},${s - c} ${s / 2},${s} C${s / 2},${s - c
    } ${c},${s / 2} 0,${s / 2} C${c},${s / 2} ${s / 2},${c} ${s / 2},0 Z`;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <path d={path} fill={color} />
    </svg>
  );
}

/**
 * Camada de sparkles (estrelas de 4 pontas) para sobrepor em heros, banners e carousels.
 * Uso: posicionar dentro de um container com position: relative,
 * como primeiro elemento, para que fique atrás do conteúdo.
 */
export default function SparkleOverlay({
  count = 30,
  colors = DEFAULT_COLORS,
  sizes = DEFAULT_SIZES,
  className = "",
  concavity = 0.16,
}: SparkleOverlayProps) {
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    setSeed((s) => s + 1);
  }, []);

  const sparkles = useMemo(
    () => generateSparkles(count, colors, sizes),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, seed]
  );

  return (
    <div
      className={`sparkle-overlay ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          style={{
            position: "absolute",
            left: `${sp.x}%`,
            top: `${sp.y}%`,
            ["--base-opacity" as string]: sp.opacity,
            ["--drift-x" as string]: `${sp.driftX}px`,
            ["--drift-y" as string]: `${sp.driftY}px`,
            animation: `
              sparkle-twinkle ${sp.duration}s ease-in-out infinite,
              sparkle-float ${sp.floatDuration}s ease-in-out infinite
            `,
            animationDelay: `${sp.delay}s, ${sp.floatDelay}s`,
            transformOrigin: "center",
          } as React.CSSProperties}
        >
          <SparkleShape size={sp.size} color={sp.color} />
        </div>
      ))}

      <style>{`
        @keyframes sparkle-twinkle {
          0%, 100% { opacity: var(--base-opacity, 0.6); }
          50%      { opacity: calc(var(--base-opacity, 0.6) * 0.4); }
        }

        @keyframes sparkle-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(var(--drift-x, 0px), var(--drift-y, 0px)) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}