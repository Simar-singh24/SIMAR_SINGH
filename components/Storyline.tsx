"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

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
    <section ref={containerRef} className="bg-black text-white py-32">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-32">
            <h2 className="text-[10px] uppercase tracking-[1em] text-white/30 font-bold mb-6">SELECTED WORKS</h2>
            <div className="h-[2px] w-12 bg-white mb-10" />
            <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                CRAFTING <br /> DIGITAL <br /> EXCELLENCE.
            </h3>
        </div>

        {/* Project List - Simplified Layout as requested */}
        <div className="space-y-64">
          {projects.map((proj, i) => (
            <div 
              key={proj.id} 
              className="project-card grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
            >
              {/* Image Column */}
              <div className={`relative aspect-[16/10] overflow-hidden group rounded-lg ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="project-image w-full h-full">
                  <img 
                    src={proj.src} 
                    alt={proj.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Color Overlay */}
                  <div 
                    className="absolute inset-0 mix-blend-multiply opacity-20 transition-opacity group-hover:opacity-10"
                    style={{ backgroundColor: proj.hexColor }}
                  ></div>
                </div>
              </div>

              {/* Info Column */}
              <div className="project-info">
                <p className="text-[#7ef7e0] font-black text-xs tracking-widest uppercase mb-4">{proj.subtitle}</p>
                <h4 className="text-4xl md:text-6xl font-black uppercase mb-8 leading-tight">{proj.title}</h4>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mb-12">
                  {proj.description}
                </p>
                <button className="group flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                    See Case Study
                    <div className="w-8 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-white transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
