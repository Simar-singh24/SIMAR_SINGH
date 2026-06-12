"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // 1. Desktop Pinning & Clip Animation
    mm.add("(min-width: 1024px)", () => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "center center",
          end: "+=2000 center", // Slightly shorter as we only have one main phase now
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      // Expand the masked image to full screen
      clipAnimation.to(".mask-clip-path", {
        width: "100%",
        height: "100%",
        borderRadius: 0,
        duration: 3,
        ease: "power2.inOut",
      });

      // Fade overlay simultaneously
      clipAnimation.to("#mask-overlay", {
        opacity: 1,
        duration: 3,
      }, 0);

      // Synchronized Word Parallax Reveal
      // Starts exactly when scrolling begins and ends when expansion finishes
      clipAnimation.fromTo(".about-me-word",
        { 
          opacity: 0, 
          y: 100, 
          filter: "blur(10px)" 
        },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)", 
          stagger: {
            amount: 2.8, // Stretch word reveal across the duration
          }, 
          duration: 3, 
          ease: "power1.inOut" 
        },
        0
      );

      // Pause at the end for reading before scrolling out
      clipAnimation.to({}, { duration: 2 });
    });

    // 2. Mobile/Tablet (Static/Natural Flow with ScrollTriggers)
    mm.add("(max-width: 1023px)", () => {
      // Reveal the image when scrolling
      gsap.fromTo(".mask-clip-path", 
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mask-clip-path",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Fast reveal of words paragraphs as container scrolls into view
      gsap.fromTo(".about-me-word",
        { 
          opacity: 0, 
          y: 30, 
        },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.005, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-me-text-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div id="about" className="w-full min-h-screen bg-black text-white" ref={containerRef}>
      <div className="relative mb-8 sm:mb-12 md:mb-16 mt-8 sm:mt-12 md:mt-20 flex flex-col items-center gap-3 sm:gap-4 md:gap-5 px-4 sm:px-6">
        <h2 className="font-general text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider">
          Welcome to portfolio
        </h2>

        <AnimatedTitle
          as="h2"
          title={`Integrating <b>M</b>achine <br /> L<b>e</b>arning into Reality`}
          containerClass="mt-3 sm:mt-5 text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl uppercase leading-[0.9] font-bold"
        />

        <div className="about-subtext max-w-2xl text-center px-4 sm:px-6 mt-4">
          <p className="text-[11px] sm:text-sm md:text-base leading-relaxed text-white/80">I build scalable platforms and integrate intelligent models.</p>
          <p className="text-[11px] sm:text-sm md:text-base leading-relaxed text-white/80 mt-2">Passionate about UI/UX and resilient system architecture.</p>
        </div>
      </div>

      <div className="w-full min-h-screen lg:h-dvh relative flex flex-col items-center justify-start py-8 sm:py-12 md:py-16 lg:py-0 px-4 sm:px-6 md:px-8 lg:block lg:px-0 bg-black" id="clip">
        {/* Masked image that expands based on GSAP */}
        <div className="mask-clip-path w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-none h-40 sm:h-48 md:h-64 lg:h-96 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[50px] overflow-hidden relative lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-[1] shadow-lg sm:shadow-xl md:shadow-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-0">
          <Image
            src="/img/about.jpg"
            alt="About Me Background"
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 85vw, 50vw"
            priority
            className="absolute left-0 top-0 w-full h-full object-cover"
          />
          {/* Enhanced cinematic dark overlay for premium readability */}
          <div className="absolute inset-0 bg-black/85 opacity-0" id="mask-overlay"></div>
        </div>

        {/* About Me Text Layer - Focus on fitting the frame elegantly */}
        <div className="about-me-text-container relative w-full max-w-3xl lg:absolute lg:inset-0 z-10 flex flex-col justify-start lg:justify-center items-start p-3 sm:p-4 md:p-6 lg:p-24 pointer-events-auto lg:pointer-events-none h-auto lg:h-full lg:max-w-6xl lg:left-0 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] font-canela">
          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 flex flex-wrap gap-x-2 sm:gap-x-3 text-white uppercase tracking-tight">
            {"About Me".split(" ").map((word, i) => (
              <span key={i} className="about-me-word opacity-0 inline-block translate-y-[100px]">{word}</span>
            ))}
          </h2>

          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 text-[10px] sm:text-xs md:text-base lg:text-lg xl:text-xl leading-relaxed text-white/90 pr-2 sm:pr-3 md:pr-4 max-w-4xl">
            <div className="flex flex-wrap gap-x-1 sm:gap-x-2">
              {"I am a Full Stack Developer and Machine Learning Engineer focused on building scalable, high-performance, and AI-powered applications.".split(" ").map((word, i) => (
                <span key={i} className="about-me-word opacity-0 inline-block translate-y-[100px]">{word}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-1 sm:gap-x-2 opacity-90">
              {"I work with React, Next.js, Tailwind CSS, GSAP, Three.js, and Framer Motion for interactive experiences. Backend: FastAPI, Node.js, and RESTful APIs.".split(" ").map((word, i) => (
                <span key={i} className="about-me-word opacity-0 inline-block translate-y-[100px]">{word}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-1 sm:gap-x-2 opacity-90">
              {"Strong expertise in Python for ML with NumPy, Pandas, Scikit-learn, and TensorFlow/PyTorch. I integrate ML models into real-world applications via FastAPI APIs.".split(" ").map((word, i) => (
                <span key={i} className="about-me-word opacity-0 inline-block translate-y-[100px]">{word}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-1 sm:gap-x-2 opacity-90">
              {"Data pipelines, model deployment, real-time data handling, Git, GitHub, Docker basics, and cloud fundamentals with AWS/GCP.".split(" ").map((word, i) => (
                <span key={i} className="about-me-word opacity-0 inline-block translate-y-[100px]">{word}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-1 sm:gap-x-2 font-bold italic mt-3 sm:mt-4 md:mt-6 text-white border-l-2 border-white/30 pl-2 sm:pl-3 md:pl-4 lg:pl-6 leading-snug">
              {"Combining frontend engineering + backend architecture + AI/ML systems to build intelligent, scalable digital products.".split(" ").map((word, i) => (
                <span key={i} className="about-me-word opacity-0 inline-block translate-y-[100px]">{word}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
