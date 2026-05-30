"use client";

import { useEffect, useRef } from "react";
import UnicornScene from "unicornstudio-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ResponsiveContainer from "./ResponsiveContainer";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-entrance", {
      y: 50,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out",
      delay: 0.5,
    });
  }, { scope: containerRef });

  return (<ResponsiveContainer>
    <section ref={containerRef} className="relative w-full min-h-screen sm:min-h-[80vh] md:min-h-[90vh] lg:h-screen overflow-hidden bg-black">
      {/* Global Style Override to Hide Unicorn Watermark DOM nodes Native to the Library */}
      <style>{`
        a[href*="unicorn.studio"], 
        .unicorn-watermark,
        [class*="unicorn-watermark"] {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
          visibility: hidden !important;
        }
      `}</style>

      {/* Ultra-Elegant Welcome Badge (Premium Glassmorphism Overlay) */}
      <div className="absolute bottom-[26px] left-1/2 -translate-x-1/2 z-[9999] bg-white/85 backdrop-blur-xl w-[200px] h-[42px] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/40 pointer-events-none">
        <span className="font-canela text-black/90 text-[8px] font-bold uppercase tracking-[0.7em] translate-x-[0.35em]">
          Welcome
        </span>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <UnicornScene
          projectId="wdtVnCxvDiVjDdSCulTL"
          width="100%"
          height="100%"
          scale={1}
          dpi={1.5}
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.9/dist/unicornStudio.umd.js"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-24 h-full px-4 pointer-events-none">
        {/* Name and Year - Top Left */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-4 transition-all duration-500">
          <p 
            className="text-white text-[10px] md:text-xs font-medium tracking-[0.6em] uppercase hero-entrance opacity-80"
            style={{ fontFamily: 'Abhaya Libre, serif' }}
          >
            SIMARJOT SINGH 19
          </p>
        </div>

        {/* Main Content - Top Aligned */}
        <div className="flex flex-col items-center justify-start w-full pointer-events-auto">
          <h1 
            className="text-white text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 drop-shadow-lg text-center w-full max-w-5xl mx-auto leading-[0.9] hero-entrance"
            style={{ fontFamily: 'Abhaya Libre, serif' }}
            data-cursor-text="ROAR"
          >
            FULL STACK DEVELOPER & ML ENGINEER
          </h1>
          
          <p className="text-gray-300 text-sm md:text-lg mb-8 max-w-2xl drop-shadow-md text-center leading-relaxed hero-entrance px-6">
            Integrating machine learning into scalable, high-performance applications with cinematic user experiences.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg 
          className="w-6 h-6 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </ResponsiveContainer></section>
  );
}
