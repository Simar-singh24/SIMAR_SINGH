"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "mojito",
    title: "Mojito Experience",
    subtitle: "MIXOLOGY & COCKTAILS",
    description: "A premium cocktail menu and mixology experience with supreme ingredients and immersive UI.",
    src: "img/mocktail-ss.png",
    hexColor: "#6b1c1c",
  },
  {
    id: "devmatch",
    title: "DevMatch Hub",
    subtitle: "SOCIAL FOR DEVELOPERS",
    description: "A social hub connecting elite developers worldwide to find partners, mentors, and hackathon teams.",
    src: "img/devmatch-ss.png",
    hexColor: "#3b0764",
  },
  {
    id: "cinematch",
    title: "CineMatch AI",
    subtitle: "ML DISCOVERY ENGINE",
    description: "An AI-powered cinematic discovery engine matching plots and deep emotional themes with machine learning.",
    src: "img/machinelearning-ss.png",
    hexColor: "#1e3a8a",
  },
  {
    id: "restaurant",
    title: "Vasant Vihar",
    subtitle: "AUTHENTIC CUISINE",
    description: "A vibrant restaurant platform featuring gorgeous visualizations and authentic Indian dining experiences.",
    src: "img/restaurant-ss.png",
    hexColor: "#27272a",
  }
];

export default function Storyline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance animations for each project card
    const cards = gsap.utils.toArray(".project-card");
    
    cards.forEach((card: any) => {
      gsap.fromTo(card.querySelector(".project-image"), 
        { scale: 1.2, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(card.querySelector(".project-info"), 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-black text-white py-8 sm:py-12 md:py-20 lg:py-32">
      <div className="w-full px-3 sm:px-4 md:px-8 lg:px-12">

        {/* Section Header */}
        <div className="mb-8 sm:mb-12 md:mb-20 lg:mb-32">
          <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.6em] sm:tracking-[0.8em] text-white/30 font-bold mb-3 sm:mb-4 md:mb-6">SELECTED WORKS</p>
          <div className="h-[2px] w-8 sm:w-10 md:w-12 bg-white mb-4 sm:mb-6 md:mb-10" />
          <h2
            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9] w-fit"
            data-cursor-text="WORK"
          >
            CRAFTING <br /> DIGITAL <br /> EXCELLENCE.
          </h2>
        </div>

        {/* Project List - Simplified Layout */}
        <div className="space-y-8 sm:space-y-12 md:space-y-20 lg:space-y-32">
          {projects.map((proj, i) => (
            <div
              key={proj.id}
              className="project-card flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-16 items-center"
            >
              <div className={`relative w-full aspect-video overflow-hidden rounded-lg ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="project-image w-full h-full relative">
                  <Image
                    src={`/${proj.src}`}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Color Overlay */}
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-20 transition-opacity hover:opacity-10 z-[2]"
                    style={{ backgroundColor: proj.hexColor }}
                  ></div>
                </div>
              </div>

              {/* Info Column */}
              <div className="project-info w-full px-2 sm:px-3 md:px-4">
                <p className="text-[#7ef7e0] font-black text-[9px] sm:text-[10px] md:text-xs tracking-widest uppercase mb-2 sm:mb-3 md:mb-4">{proj.subtitle}</p>
                <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-black uppercase mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-tight">{proj.title}</h4>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/70 leading-relaxed max-w-xl mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  {proj.description}
                </p>
                <button className="group flex items-center gap-2 sm:gap-3 md:gap-4 text-[8px] sm:text-[9px] md:text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                  See Case Study
                  <div className="w-4 sm:w-5 md:w-6 h-[1px] bg-white/20 group-hover:w-8 sm:group-hover:w-10 md:group-hover:w-12 group-hover:bg-white transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
