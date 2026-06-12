"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTick = (time: number) => {
      lenis.raf(time);
    };
    gsap.ticker.add(updateTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTick);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
