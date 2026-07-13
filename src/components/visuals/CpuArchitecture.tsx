import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { x: 56, y: 70, label: "repo" },
  { x: 284, y: 70, label: "policy" },
  { x: 56, y: 250, label: "data" },
  { x: 284, y: 250, label: "audit" },
  { x: 170, y: 34, label: "ai" },
  { x: 170, y: 286, label: "ops" },
];

const paths = [
  "M86 88 H132",
  "M254 88 H208",
  "M86 268 H132",
  "M254 268 H208",
  "M170 64 V116",
  "M170 236 V286",
  "M104 106 L132 132",
  "M236 106 L208 132",
  "M104 250 L132 224",
  "M236 250 L208 224",
];

export function CpuArchitecture() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="group relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-lg border border-white/10 bg-slate-950/70 p-4 shadow-panel backdrop-blur transition-shadow duration-700 hover:shadow-[0_0_48px_rgba(96,165,250,0.14)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(91,141,239,0.18),transparent_54%)] transition-opacity duration-700 group-hover:opacity-100" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/35 opacity-0 blur-[1px] transition-opacity duration-700 group-hover:animate-ping group-hover:opacity-25 motion-reduce:group-hover:animate-none" />
      <svg
        viewBox="0 0 340 340"
        role="img"
        aria-labelledby="cpu-title cpu-desc"
        className="relative h-full w-full"
      >
        <title id="cpu-title">Animated AI systems architecture visual</title>
        <desc id="cpu-desc">
          A central processor connected to data, policy, repository and audit
          workflow nodes.
        </desc>
        <defs>
          <linearGradient id="line-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#6ea8ff" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#9bd4c6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6ea8ff" stopOpacity="0.18" />
          </linearGradient>
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          className="origin-center transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.025]"
          style={{ transformBox: "fill-box" }}
        >
          <rect
            x="112"
            y="112"
            width="116"
            height="116"
            rx="14"
            fill="rgba(8, 16, 32, 0.92)"
            stroke="rgba(255,255,255,0.18)"
            className="transition-[filter,stroke] duration-700 group-hover:stroke-white/30"
          />
          <rect
            x="132"
            y="132"
            width="76"
            height="76"
            rx="10"
            fill="rgba(12, 26, 48, 0.88)"
            stroke="rgba(110,168,255,0.44)"
            className="transition-[filter,stroke] duration-700 group-hover:stroke-blue-300 group-hover:drop-shadow-[0_0_18px_rgba(96,165,250,0.34)]"
          />
        </g>

        {Array.from({ length: 8 }).map((_, index) => {
          const offset = 124 + index * 12;
          return (
            <g key={offset} opacity="0.56">
              <line x1={offset} x2={offset} y1="104" y2="112" stroke="#6ea8ff" />
              <line x1={offset} x2={offset} y1="228" y2="236" stroke="#6ea8ff" />
              <line x1="104" x2="112" y1={offset} y2={offset} stroke="#6ea8ff" />
              <line x1="228" x2="236" y1={offset} y2={offset} stroke="#6ea8ff" />
            </g>
          );
        })}

        {paths.map((path, index) => (
          <g key={path}>
            <path
              d={path}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
              className="transition-[stroke,opacity] duration-700 group-hover:opacity-90"
            />
            <motion.path
              d={path}
              fill="none"
              stroke="url(#line-gradient)"
              strokeLinecap="round"
              strokeWidth="2"
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: 0.65 }
                  : { pathLength: [0.15, 1, 0.15], opacity: [0.18, 0.9, 0.18] }
              }
              transition={{
                duration: 4.4,
                delay: index * 0.18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <path
              d={path}
              fill="none"
              stroke="rgba(147,197,253,0.72)"
              strokeLinecap="round"
              strokeWidth="2"
              className="opacity-0 transition-opacity duration-700 group-hover:opacity-70 motion-reduce:transition-none"
            />
          </g>
        ))}

        <circle
          cx="170"
          cy="170"
          r="42"
          fill="none"
          stroke="rgba(147,197,253,0.34)"
          strokeWidth="1"
          className="origin-center opacity-0 transition-opacity duration-700 group-hover:animate-pulse group-hover:opacity-100 motion-reduce:group-hover:animate-none"
          style={{ transformBox: "fill-box" }}
        />
        <circle
          cx="170"
          cy="170"
          r="31"
          fill="rgba(96,165,250,0.16)"
          className="opacity-0 blur-sm transition-opacity duration-700 group-hover:opacity-100"
        />

        <motion.circle
          cx="170"
          cy="170"
          r="25"
          fill="rgba(110,168,255,0.12)"
          stroke="#9bd4c6"
          strokeOpacity="0.72"
          filter="url(#soft-glow)"
          className="transition-[filter,stroke-opacity] duration-700 group-hover:stroke-opacity-100"
          animate={reduceMotion ? undefined : { r: [22, 27, 22], opacity: [0.62, 1, 0.62] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <text
          x="170"
          y="175"
          textAnchor="middle"
          className="fill-slate-100 font-mono text-[12px] uppercase"
        >
          CAUCO
        </text>

        {nodes.map((node, index) => (
          <g
            key={node.label}
            className="origin-center transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:-translate-y-1 group-hover:scale-[1.025]"
            style={{ transformBox: "fill-box", transitionDelay: `${index * 35}ms` }}
          >
            <rect
              x={node.x - 31}
              y={node.y - 18}
              width="62"
              height="36"
              rx="8"
              fill="rgba(8, 16, 32, 0.86)"
              stroke="rgba(255,255,255,0.16)"
              className="transition-[stroke] duration-500 group-hover:stroke-blue-300/45"
            />
            <circle
              cx={node.x - 20}
              cy={node.y}
              r="3"
              fill="#9bd4c6"
              className="transition-[filter] duration-500"
              style={{ filter: "drop-shadow(0 0 4px rgba(155, 212, 198, 0.35))" }}
            />
            <text
              x={node.x + 6}
              y={node.y + 4}
              textAnchor="middle"
              className="fill-slate-300 font-mono text-[8px] uppercase"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
