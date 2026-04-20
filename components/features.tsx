"use client";

import React, { useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import { IoCloseOutline } from 'react-icons/io5';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetail {
  title: string;
  description: string;
  longDescription: string;
  src: string;
  github?: string;
}

const ProjectModal = ({ project, onClose }: { project: ProjectDetail | null, onClose: () => void }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-neutral-900 shadow-2xl transition-all duration-500 animate-in zoom-in-95 fade-in">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 z-[110] rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        >
          <IoCloseOutline size={24} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="h-64 w-full md:h-full">
            <img 
              src={project.src} 
              alt={project.title}
              className="size-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="special-font text-4xl font-black text-white md:text-6xl mb-6">
              {project.title.replace(/<b>|<\/b>/g, '')}
            </h2>
            <p className="text-lg text-blue-50/70 leading-relaxed mb-8">
              {project.longDescription}
            </p>
            {project.github && (
              <a 
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="w-fit rounded-full bg-white px-6 py-3 text-black font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface BentoTiltProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const BentoTilt = ({ children, className = '', onClick }: BentoTiltProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const tiltX = ((y - height / 2) / height) * -10;
    const tiltY = ((x - width / 2) / width) * 10;

    itemRef.current.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
  };

  const handleMouseLeave = () => {
    if (!itemRef.current) return;
    itemRef.current.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      className={`${className} cursor-pointer transition-transform duration-700 ease-out active:scale-95`}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description?: string;
  isVideo?: boolean;
  imageClassName?: string;
}

const BentoCard = ({ src, title, description, isVideo = false, imageClassName = "parallax-img object-cover object-center scale-[1.15]" }: BentoCardProps) => {
  return (
    <div className="relative size-full overflow-hidden rounded-md bg-black">
      {isVideo ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className={`absolute left-0 top-0 size-full ${imageClassName}`}
        />
      ) : (
        <img
          src={src}
          className={`absolute left-0 top-0 size-full ${imageClassName}`}
          alt={typeof title === 'string' ? title : 'Project Image'}
        />
      )}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] drop-shadow-md">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-sm bg-black/40 backdrop-blur-sm p-3 rounded-lg border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
              {description}
            </p>
          )}
        </div>
        <div className="self-end opacity-0 group-hover:opacity-80 transition-opacity max-md:hidden">
          <p className="text-[10px] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Click for Details
          </p>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.bento-animate');
    
    cards.forEach((card: any, index: number) => {
      const isEven = index % 2 === 0;
      
      gsap.fromTo(card, 
        { 
          opacity: 0, 
          x: isEven ? -100 : 100,
          y: 100,
          rotate: isEven ? -3 : 3
        },
        {
          opacity: 1, 
          x: 0,
          y: 0,
          rotate: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Image Parallax Effect
      const img = card.querySelector('.parallax-img');
      if (img) {
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });
  }, []);

  const projects: Record<string, ProjectDetail> = {
    cinematch: {
      title: "Cinematch",
      description: "AI-powered movie prediction engine.",
      longDescription: "CineMatch is an intelligent cinematic discovery platform. It uses advanced AI to analyze movie plots, genres, and themes to predict and recommend your next favorite masterpiece.",
      src: "img/machinelearning-ss.png",
      github: "https://github.com/Simar-singh24/Cinematch.git"
    },
    devmatch: {
      title: "DevMatch",
      description: "Social hub for developers to find partners and collaborate.",
      longDescription: "DevMatch is a social nexus for the modern engineer. It uses a proprietary matching algorithm based on tech-stack synergy to help developers find project partners and mentors.",
      src: "img/devmatch-ss.png",
      github: "https://github.com/Simar-singh24/Devmatch.git"
    },
    restaurant: {
      title: "Ice Cube",
      description: "Authentic Indian cuisine restaurant website.",
      longDescription: "A vibrant and immersive restaurant website for Ice Cube, offering users a deep dive into genuine Indian flavors. Features interactive menus and seamless table reservations.",
      src: "img/restaurant-ss.png",
      github: "https://github.com/Simar-singh24/restaurant-project.git"
    },
    cocktail: {
      title: "Mojito",
      description: "Premium cocktail menu and mixology experience.",
      longDescription: "Sip the spirit of summer. This premium platform offers a curated selection of cocktails blending premium ingredients, creative flair, and timeless recipes to delight the senses.",
      src: "img/mocktail-ss.png",
      github: "https://github.com/Simar-singh24/cocktail-bar-website.git"
    }
  };

  return (
    <section className="bg-black min-h-screen">
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
      
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32 pb-14">
          <AnimatedTitle
            title="Feat<b>u</b>red <br /> Pr<b>o</b>jects"
            containerClass="!text-left justify-start !text-white bento-title special-font !text-6xl md:!text-9xl w-fit [&>div]:justify-start [&>div]:px-0 mb-2"
            data-cursor-text="DISCOVER"
          />
          <p className="max-w-md font-canela text-xl md:text-2xl text-blue-50 opacity-80 mt-4 group-hover:opacity-100 transition-opacity leading-relaxed italic">
            Explore a collection of innovative digital experiences, blending 
            cutting-edge technology with cinematic storytelling.
          </p>
        </div>

        {/* Major Project */}
        <BentoTilt 
          className="group bento-animate border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]"
          onClick={() => setSelectedProject(projects.devmatch)}
          data-cursor-text="VIEW"
        >
          <BentoCard
            src={projects.devmatch.src}
            title="DevMatch"
            description={projects.devmatch.description}
            imageClassName="scale-100 object-cover object-[center_top] w-full h-full"
          />
        </BentoTilt>

        {/* Grid */}
        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="group bento-animate bento-tilt_2 row-span-1 md:col-span-1 md:row-span-2">
            <div className="flex size-full flex-col justify-between bg-black p-5 text-white rounded-md overflow-hidden border border-white/10">
              <h1 className="bento-title special-font max-w-64 text-white">
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on!
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end text-white/50" />
            </div>
          </BentoTilt>

          <BentoTilt 
            className="group bento-animate bento-tilt_1 me-14 md:col-span-1 md:me-0"
            onClick={() => setSelectedProject(projects.cinematch)}
            data-cursor-text="VIEW"
          >
            <BentoCard
              src={projects.cinematch.src}
              title="Cinematch"
              description={projects.cinematch.description}
            />
          </BentoTilt>

          <BentoTilt 
            className="group bento-animate bento-tilt_1 md:col-span-1 md:ms-0"
            onClick={() => setSelectedProject(projects.restaurant)}
            data-cursor-text="VIEW"
          >
            <BentoCard
              src={projects.restaurant.src}
              title="Ice Cube"
              description={projects.restaurant.description}
            />
          </BentoTilt>

          <BentoTilt 
            className="group bento-animate bento-tilt_1 col-span-2"
            onClick={() => setSelectedProject(projects.cocktail)}
          >
            <BentoCard
              src={projects.cocktail.src}
              title="Mojito"
              description={projects.cocktail.description}
              imageClassName="scale-100 object-cover object-[center_35%] w-full h-full"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};


export default Features;
