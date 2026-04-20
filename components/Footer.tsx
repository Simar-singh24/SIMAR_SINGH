"use client";

import React, { useRef } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaArrowUp } from "react-icons/fa";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/simarjot-singh", icon: <FaLinkedin /> },
  { label: "GitHub", href: "https://github.com/Simar-singh24", icon: <FaGithub /> },
  { label: "Twitter", href: "https://twitter.com", icon: <FaTwitter /> },
  { label: "Instagram", href: "https://instagram.com", icon: <FaInstagram /> },
];

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const socialListRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
      },
    });

    // 1. Main Headline Animation (Light color -> Appear -> Fade out)
    tl.fromTo(headlineRef.current, 
        { opacity: 0.1, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }
    );
    
    tl.to(headlineRef.current, {
        opacity: 0,
        y: -100,
        scale: 1.1,
        duration: 1,
        ease: "power1.in"
    }, "+=0.5");

    // 2. Social List Entrance (The "Same to Same" UI from the reference)
    tl.fromTo(socialListRef.current, 
        { opacity: 0, y: 150 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
        "-=0.5"
    );

    // Stagger divider lines expansion
    const lines = socialListRef.current?.querySelectorAll(".social-divider");
    if (lines) {
        tl.from(lines, {
            scaleX: 0,
            stagger: 0.1,
            duration: 1,
            transformOrigin: "left center"
        }, "-=1");
    }

    // 3. Watermark Appearance
    tl.to(socialListRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power2.in"
    });

    tl.fromTo(watermarkRef.current, 
        { opacity: 0.1, y: 100 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" },
        "-=0.5"
    );

    // Badge Rotation
    gsap.to(".portfolio-badge-rotate", {
        rotate: 360,
        duration: 15,
        repeat: -1,
        ease: "none"
    });

  }, { scope: containerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black text-white overflow-hidden font-sans">
      
      {/* Background Decor - Subtle Grid for ML/Tech feel */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Phase 1: High-Fidelity Headline */}
      <div 
        ref={headlineRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center p-10 text-center"
      >
        <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-white/40 font-bold mb-8">
            AVAILABLE FOR NEW CHALLENGES
        </p>
        <h2 className="text-[8vw] md:text-[5vw] font-black leading-[0.9] tracking-tighter uppercase text-white">
            LET'S BUILD <br /> <span className="text-white/60">THE FUTURE.</span>
        </h2>
      </div>

      {/* Phase 2: Social Links (The "Footer Folder" UI Structure) */}
      <div 
        ref={socialListRef}
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none opacity-0"
      >
        <div className="w-full max-w-5xl px-8 pointer-events-auto">
            <div className="mb-16 md:mb-24">
                <p className="text-xs uppercase tracking-widest text-white/30 mb-2">Connect with me</p>
                <div className="h-[2px] w-12 bg-white" />
            </div>
            
            {socialLinks.map((link, i) => (
                <div key={i} className="group transition-all">
                    <div className="social-divider h-[1px] w-full bg-white/10" />
                    <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-6 md:py-10 px-4 hover:bg-white/[0.02] transition-colors"
                    >
                        <span className="text-3xl md:text-5xl font-light text-white group-hover:text-white group-hover:pl-4 transition-all duration-500">
                            {link.label}
                        </span>
                        <div className="text-2xl md:text-4xl text-white group-hover:text-white transition-all group-hover:scale-125">
                            {link.icon}
                        </div>
                    </a>
                </div>
            ))}
            <div className="social-divider h-[1px] w-full bg-white/10" />
        </div>
      </div>

      {/* Phase 3: Final Watermark & Info */}
      <div 
        ref={watermarkRef}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center p-10 pointer-events-none opacity-0"
      >
        <h2 className="text-[8vw] font-black text-white uppercase tracking-tighter select-none leading-none text-center">
            SIMARJOT SINGH
        </h2>
        
        <div className="mt-20 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left pointer-events-auto">
            <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Contact</p>
                <a href="mailto:baljeetsimarsingh@gmail.com" className="text-lg md:text-xl font-medium hover:text-blue-400 transition-colors block mb-1">baljeetsimarsingh@gmail.com</a>
                <p className="text-lg md:text-xl font-medium text-white/70">+91 9555197836</p>
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Profile</p>
                <p className="text-lg md:text-xl font-medium">Full Stack & ML</p>
                <p className="text-sm text-white/40 mt-1">Age: 19 Years</p>
            </div>
            <div className="flex flex-col items-center md:items-end justify-center">
                 <button 
                    onClick={scrollToTop}
                    className="group relative flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/20 hover:border-white transition-all"
                 >
                    <FaArrowUp className="text-2xl group-hover:-translate-y-2 transition-transform" />
                    <div className="portfolio-badge-rotate absolute inset-0 text-[10px]">
                        {/* Circle Text SVG would go here, using a simpler visual representation */}
                        <div className="w-full h-full border border-dashed border-white/10 rounded-full animate-spin-slow" />
                    </div>
                 </button>
            </div>
        </div>
      </div>

      {/* Bottom Footer Detail */}
      <div className="absolute bottom-10 left-10 z-50">
        <p className="text-[10px] tracking-[0.3em] font-black text-white/20">PUNJAB, INDIA ©2026</p>
      </div>

    </section>
  );
};

export default Footer;
