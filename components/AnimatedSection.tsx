"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className = "" 
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ animationDelay: `${delay}s`, opacity: isVisible ? 1 : 0 }}
      className={`${isVisible ? 'animate-fadeInUp' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
