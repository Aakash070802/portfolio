import { useEffect, useRef } from "react";
import ParticleClass from "../utils/Particle";

const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 50;
    const colors = ["rgba(255, 255, 255, 0.7)"];

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new ParticleClass(canvas, ctx, colors));
      }
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed left-0 top-0 w-full h-full pointer-events-none z-0"
    ></canvas>
  );
};

export default Particles;
