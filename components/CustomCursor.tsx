"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    const dot = dotRef.current;
    if (!blob || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.05,
        ease: "none",
      });
    };

    // Smooth blob lag
    const ticker = gsap.ticker.add(() => {
      blobX += (mouseX - blobX) * 0.08;
      blobY += (mouseY - blobY) * 0.08;
      gsap.set(blob, { x: blobX, y: blobY });
    });

    // Scale blob on hover over interactive elements
    const onEnter = () => {
      gsap.to(blob, { scale: 1.6, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(blob, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    const interactiveEls = document.querySelectorAll("a, button, [data-cursor]");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(ticker);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Dark orb blob */}
      <div
        ref={blobRef}
        className="custom-cursor-blob"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(10,10,10,0.92) 0%, rgba(30,30,30,0.6) 60%, transparent 100%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "normal",
          backdropFilter: "blur(2px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 0 40px 8px rgba(0,0,0,0.5)",
          willChange: "transform",
        }}
      />
      {/* Tiny bright dot in center */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#7ef7e0",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 100000,
          boxShadow: "0 0 8px 2px #7ef7e0",
          willChange: "transform",
        }}
      />
    </>
  );
}
