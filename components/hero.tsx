"use client";

import { useEffect, useRef } from "react";
import UnicornScene from "unicornstudio-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

  return (
    <section ref={containerRef} className="relative w-full min-h-screen md:min-h-[90vh] lg:h-screen overflow-hidden bg-black flex flex-col">
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
      <div className="hidden md:flex absolute bottom-[26px] left-1/2 -translate-x-1/2 z-[9999] bg-white/85 backdrop-blur-xl w-[200px] h-[42px] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/40 pointer-events-none">
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
      <div className="relative z-10 flex flex-col items-center justify-center md:justify-start md:pt-24 flex-1 w-full px-4 sm:px-6 md:px-8 pointer-events-none">
        {/* Name and Year - Top Left */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 md:top-8 md:left-8 flex items-center gap-3 sm:gap-4 transition-all duration-500">
          <p
            className="text-white text-[9px] sm:text-[10px] md:text-xs font-medium tracking-[0.6em] uppercase hero-entrance opacity-80"
            style={{ fontFamily: 'Abhaya Libre, serif' }}
          >
            SIMARJOT SINGH 19
          </p>
        </div>

        {/* Main Content - Top Aligned */}
        <div className="flex flex-col items-center justify-start w-full pointer-events-auto">
          <h1
            className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-3 sm:mb-4 md:mb-6 drop-shadow-lg text-center w-full max-w-6xl mx-auto leading-[0.9] hero-entrance"
            style={{ fontFamily: 'Abhaya Libre, serif' }}
            data-cursor-text="ROAR"
          >
            FULL STACK DEVELOPER & ML ENGINEER
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-3xl drop-shadow-md text-center leading-relaxed hero-entrance px-2">
            Integrating machine learning into scalable, high-performance applications with cinematic user experiences.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-white"
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
    </section>
  );
}
