/* ICON IMPORTS */
import { BiLogoPostgresql } from "react-icons/bi";
import { BsJavascript, BsTypescript } from "react-icons/bs";
import {
  FaAws,
  FaCode,
  FaDocker,
  FaGithub,
  FaLinux,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { IoLogoNodejs } from "react-icons/io";
import { RiNextjsFill, RiTailwindCssFill, RiVercelFill } from "react-icons/ri";
import {
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiMysql,
  SiPhp,
  SiPostman,
  SiRender,
} from "react-icons/si";
import { TbBrandRedux } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
/* ICON IMPORTS */
import { motion, useMotionValue } from "framer-motion";
import Glows from "../components/Glows";
import { useEffect, useRef, useState } from "react";

const Skills = () => {
  const skills = [
    { icon: <FaPython />, name: "Python" },
    { icon: <BsJavascript />, name: "JavaScript" },
    { icon: <BsTypescript />, name: "TypeScript" },
    { icon: <FaReact />, name: "React" },
    { icon: <TbBrandRedux />, name: "Redux" },
    { icon: <RiNextjsFill />, name: "Next.js" },
    { icon: <RiTailwindCssFill />, name: "Tailwind CSS" },
    { icon: <IoLogoNodejs />, name: "Node.js" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <SiPhp />, name: "PHP" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <BiLogoPostgresql />, name: "PostgreSQL" },
    { icon: <FaCode title="REST API" />, name: "REST API" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <FaDocker />, name: "Docker" },
    { icon: <FaLinux />, name: "Linux" },
    { icon: <FaAws />, name: "AWS" },
    { icon: <FaGithub />, name: "GitHub" },
    { icon: <SiPostman />, name: "Postman" },
    { icon: <VscVscode />, name: "VS Code" },
    { icon: <RiVercelFill />, name: "Vercel" },
    { icon: <SiRender />, name: "Render" },
  ];

  const repeatedSkills = [...skills, ...skills];

  const [direction, setDirection] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  /* ANIMATION */
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const intersectionObsv = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1] },
    );

    intersectionObsv.observe(element);

    return () => intersectionObsv.disconnect(element);
  }, []);

  useEffect(() => {
    if (!active) return;
    /* Mouse Devices */
    const onWheel = (e) => setDirection(e.deltaY > 0 ? -1 : 1);

    /* Touch Devices */
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;

      const delta = e.touches[0].clientY - touchY.current;
      setDirection(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80; // pixels per second

    const tick = (now) => {
      const timeDiff = (now - last) / 1000;
      last = now;

      let nextX = x.get() + SPEED * timeDiff * direction;
      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (nextX <= -loop) nextX += loop;
        if (nextX >= 0) nextX -= loop;
      }
      x.set(nextX);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [direction, x]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >
      <Glows />
      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-t from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        How I Build
      </motion.h2>
      <motion.p
        className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Modern Application | Modern Technologies
      </motion.p>
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
          className="flex gap-10 text-6xl text-[#1cd8d2]"
        >
          {repeatedSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 min-w-30 cursor-pointer"
              aria-label={skill.name}
              title={skill.name}
            >
              <span className="hover:scale-125 transition-transform duration-300">
                {skill.icon}
              </span>
              <p className="text-sm">{skill.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
