"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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

    // 1. Expand the masked image to full screen
    clipAnimation.to(".mask-clip-path", {
      width: "100%",
      height: "100%",
      borderRadius: 0,
      duration: 3,
      ease: "power2.inOut",
    });

    // 2. Fade overlay simultaneously
    clipAnimation.to("#mask-overlay", {
      opacity: 1,
      duration: 3,
    }, 0);

    // 3. Synchronized Word Parallax Reveal
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

  }, { scope: containerRef });

  return (
    <div id="about" className="min-h-screen w-screen" ref={containerRef}>
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Simarjot Singh's portfolio
        </h2>

        <AnimatedTitle  
          title={`Integrating <b>M</b>achine <br /> L<b>e</b>arning into Reality`}
          containerClass="mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]"
        />

        <div className="about-subtext max-w-2xl text-center">
          <p>I build scalable platforms and integrate intelligent models.</p>
          <p>Passionate about UI/UX and resilient system architecture.</p>
        </div>
      </div>

      <div className="h-dvh w-screen relative" id="clip">
        {/* Masked image that expands based on GSAP */}
        <div className="mask-clip-path absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-[50px] overflow-hidden z-[1] shadow-2xl">
          <img
            src="/img/about.jpg"
            alt="About Me Background"
            className="absolute left-0 top-0 w-full h-full object-cover"
          />
          {/* Enhanced cinematic dark overlay for premium readability */}
          <div className="absolute inset-0 bg-black/85 opacity-0" id="mask-overlay"></div>
        </div>

        {/* About Me Text Layer - Focus on fitting the frame elegantly */}
        <div className="about-me-text-container absolute inset-0 z-10 flex flex-col justify-center items-start p-6 md:p-16 lg:p-24 pointer-events-none h-full max-w-6xl left-0 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] font-canela">
           <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 flex flex-wrap gap-x-3 text-white uppercase tracking-tight">
              {"About Me (Tech-Focused, High Impact)".split(" ").map((word, i) => (
                <span key={i} className="about-me-word opacity-0 inline-block translate-y-[100px]">{word}</span>
              ))}
           </h1>
           
           <div className="space-y-4 md:space-y-6 text-sm md:text-lg lg:text-xl leading-relaxed text-white pr-4 max-w-4xl">
              <div className="flex flex-wrap gap-x-2">
                {"I am a Full Stack Developer and Machine Learning Engineer focused on building scalable, high-performance, and AI-powered applications.".split(" ").map((word, i) => (
                  <span key={i} className="about-me-word opacity-0 inline-block translate-y-[100px]">{word}</span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-x-2 opacity-90">
                {"I work across modern web technologies including React, Next.js (App Router), Tailwind CSS, GSAP, Three.js (3D/WebGL), and Framer Motion to create immersive, interactive user experiences. On the backend, I use FastAPI, Node.js, and RESTful APIs to develop efficient, production-ready systems.".split(" ").map((word, i) => (
                  <span key={i} className="about-me-word opacity-0 inline-block translate-y-[100px]">{word}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-2 opacity-90">
                {"I have strong expertise in Python for Machine Learning, working with libraries like NumPy, Pandas, Scikit-learn, and TensorFlow/PyTorch, and I integrate ML models into real-world applications using FastAPI-based APIs.".split(" ").map((word, i) => (
                  <span key={i} className="about-me-word opacity-0 inline-block translate-y-[100px]">{word}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-2 opacity-90">
                {"I am also experienced with data pipelines, model deployment, and real-time data handling, along with tools like Git, GitHub, Docker (basics), and cloud fundamentals (AWS/GCP basics).".split(" ").map((word, i) => (
                  <span key={i} className="about-me-word opacity-0 inline-block translate-y-[100px]">{word}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-2 font-bold italic mt-4 md:mt-6 text-white border-l-2 border-white/30 pl-4 md:pl-6 leading-snug">
                {"My focus is on combining modern frontend engineering + backend architecture + AI/ML systems to build intelligent, scalable, and visually advanced digital products.".split(" ").map((word, i) => (
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
