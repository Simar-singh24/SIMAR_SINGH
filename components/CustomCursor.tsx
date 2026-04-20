"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorInnerRef = useRef<HTMLDivElement>(null);
    const [cursorText, setCursorText] = useState("");

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorInner = cursorInnerRef.current;
        if (!cursor || !cursorInner) return;

        // Hide default cursor
        document.body.style.cursor = 'none';

        // Use quickTo for buttery smooth interpolation
        const xTo = gsap.quickTo(cursor, "x", {duration: 0.6, ease: "power3"});
        const yTo = gsap.quickTo(cursor, "y", {duration: 0.6, ease: "power3"});
        
        const xInnerTo = gsap.quickTo(cursorInner, "x", {duration: 0.15, ease: "power2"});
        const yInnerTo = gsap.quickTo(cursorInner, "y", {duration: 0.15, ease: "power2"});

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            xInnerTo(e.clientX);
            yInnerTo(e.clientY);
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Only trigger on specific interactive elements or text tags
            // EXCLUDE elements inside a footer or with data-no-cursor
            const isNoCursor = target.closest('footer, [data-no-cursor="true"]');
            const isWord = !isNoCursor && target.closest('a, button, h1, h2, h3, h4, h5, h6, b, [data-cursor-text]');
            
            if (isWord) {
                const text = (isWord as HTMLElement).getAttribute('data-cursor-text');
                setCursorText(text || "");
                
                gsap.to(cursor, {
                    scale: 3.5,
                    backgroundColor: "white",
                    mixBlendMode: "difference",
                    opacity: 1,
                    duration: 0.3
                });
                gsap.to(cursorInner, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.2
                });
            } else {
                setCursorText("");
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: "transparent",
                    mixBlendMode: "normal",
                    opacity: 0.4, // Subtler on background
                    duration: 0.3
                });
                gsap.to(cursorInner, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3
                });
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
            document.body.style.cursor = 'auto';
        };
    }, []);

    return (
        <>
            <div 
                ref={cursorRef}
                className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[99999] flex items-center justify-center mix-blend-difference shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                style={{ transform: 'translate(-50%, -50%)', transition: 'all 0.3s' }}
            >
                {cursorText && (
                    <span className="text-[6px] uppercase font-black text-black tracking-tighter">
                        {cursorText}
                    </span>
                )}
            </div>
            <div 
                ref={cursorInnerRef}
                className="fixed top-0 left-0 w-2.5 h-2.5 bg-black border-[1.5px] border-white rounded-full pointer-events-none z-[99999] shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                style={{ transform: 'translate(-50%, -50%)' }}
            />
        </>
    );
};

export default CustomCursor;
