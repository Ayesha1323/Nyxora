import React from 'react';

interface MarqueeTickerProps {
  items?: string[];
  direction?: 'left' | 'right';
  className?: string;
  speed?: number; // seconds
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items = [
    'FULL STACK DEVELOPER',
    'REACT.JS & NEXT.JS',
    'NODE.JS ARCHITECTURE',
    'POSTGRESQL & SQL OPTIMIZATION',
    'AWS EC2 & CLOUDFLARE DEPLOYMENTS',
    'GENERATIVE AI & GEMINI API',
    'CREATIVE 3D WEBGL'
  ],
  direction = 'left',
  className = '',
  speed = 28
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden whitespace-nowrap select-none py-3 border-y border-purple-900/20 bg-[#240733] text-[#faf8f5] shadow-inner ${className}`}
    >
      <div
        className="inline-flex gap-8 items-center"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`
        }}
      >
        {/* Render 3 copies for seamless infinite scroll */}
        {[0, 1, 2].map(copyIdx => (
          <div key={copyIdx} className="inline-flex gap-8 items-center shrink-0">
            {items.map((item, idx) => (
              <span key={`${copyIdx}-${idx}`} className="inline-flex items-center gap-4 text-xs sm:text-sm font-mono tracking-widest uppercase font-medium">
                <span className="text-[#faf8f5]">{item}</span>
                <span className="text-violet-400 font-bold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};
