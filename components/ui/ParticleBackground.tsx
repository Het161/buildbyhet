'use client';

import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      depth: number;
      opacity: number;

      constructor(isLarge: boolean = false) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        this.depth = Math.random();
        
        if (isLarge) {
          // ✅ REDUCED: From 2-5px to 0.8-1.5px (70% smaller!)
          this.size = 0.8 + (this.depth * 0.7);
          this.opacity = 0.15 + (this.depth * 0.25); // Reduced opacity
        } else {
          // ✅ REDUCED: From 0.5-1.5px to 0.3-0.6px
          this.size = 0.3 + (this.depth * 0.3);
          this.opacity = 0.1 + (this.depth * 0.15);
        }
        
        const baseSpeed = 0.1 + (this.depth * 0.3);
        this.speedX = (Math.random() - 0.5) * baseSpeed;
        this.speedY = (Math.random() - 0.5) * baseSpeed;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        
        // ✅ REDUCED: Blur from 2 to 0.5
        const blur = (1 - this.depth) * 0.5;
        ctx.shadowBlur = blur;
        ctx.shadowColor = `rgba(102, 126, 234, ${this.opacity})`;
        
        ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    
    // ✅ REDUCED: From 30 to 20 large particles
    for (let i = 0; i < 20; i++) {
      particles.push(new Particle(true));
    }
    
    // ✅ REDUCED: From 100 to 80 tiny particles
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle(false));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }} // ✅ REDUCED from 0.5 to 0.4
    />
  );
}
