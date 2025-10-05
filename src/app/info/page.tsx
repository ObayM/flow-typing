'use client';
import React, { useState, useEffect, useRef, ReactNode, FC } from 'react';
import { FaMoon, FaFeather } from "react-icons/fa";
import { GiDeathZone } from "react-icons/gi";
import { IoStatsChartOutline } from "react-icons/io5";

import Link from 'next/link';

interface SectionProps {
  children: ReactNode;
  className?: string; 
}

const Section: FC<SectionProps> = ({ children, className = '' }) => {

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {

        if (entries[0].isIntersecting) {
          setIsVisible(true);
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); 

  return (
    <section
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </section>
  );
};


interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function LandingPage() {
  const features: Feature[] = [
    {
      icon: <FaFeather />,
      title: 'Distraction-Free Writing',
      description: 'A clean, beautiful interface that gets out of your way. Just you and your words.',
    },
    {
      icon: <FaMoon />,
      title: 'Beautiful Dark Mode',
      description: 'Crafted for focus and comfort. Perfect for late-night sessions and sensitive eyes.',
    },
    {
      icon: <GiDeathZone />,
      title: 'Write or Die Mode',
      description: 'Stay in the zone with our Write or Die mode. Keep writing or face the consequences!',
    },
    {
      icon: <IoStatsChartOutline />,
      title: 'Real-Time Stats',
      description: 'Track your word count, writing speed, and session duration to stay motivated and on target.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative flex flex-col items-center justify-center text-center px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow -z-10"></div>
        <div className="z-10 animate-[fadeIn_1s_ease-out]">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-headings to-secondary bg-clip-text text-transparent mb-2">
            Flow
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-headings max-w-2xl mx-auto mt-4">
            writing is a journey, i guess <br/> zero distractions, for real
          </h2>
          <p className="text-lg text-secondary max-w-xl mx-auto mt-6">
            {"it's like, a super simple app to help you just... write. ya know?"}
          </p>

          <Link href="/" className="mt-8 inline-block bg-blue-500 text-background font-bold py-3 px-8 rounded-full transition-colors hover:bg-accent-default/90">
            {"let's write or something"}
          </Link>
        </div>
      </header>

      <main className="w-full max-w-6xl mx-auto px-6 py-8 space-y-12">
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-surface p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20">
                <div className="text-accent mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-headings mb-2">{feature.title}</h3>
                <p className="text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>

      <footer className="w-full text-center p-8 mt-auto border-t border-white/10">
        <p className="text-secondary text-sm">
          Created with ❤️ by <a href="https://github.com/ObayM/">Obay</a> &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}