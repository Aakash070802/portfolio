import { useTransform, motion, useScroll } from "framer-motion";
import { div } from "framer-motion/client";
import { useEffect, useMemo, useRef, useState } from "react";

const experiences = [
  {
    role: "Web Developer Intern",
    company: "Tosscall Services",
    duration: "Feb 2025 - Aug 2025",
    description:
      "Worked on production-grade platforms including an NGO management system, partner portal, and LMS.",
  },
  {
    role: "Backend Creation",
    company: "Tosscall Services",
    duration: "During Internship",
    description:
      "Designed transaction flows, wallet logic, and role-based access systems. Focused on data consistency, validation, and handling real-world edge cases.",
  },
  {
    role: "Project Development",
    company: "Self-Driven Work",
    duration: "2024 - Present",
    description:
      "Developed systems like a banking backend with ledger-based transactions and idempotent APIs.",
  },
];

function ExperienceItem({ exp, index, start, end, scrollYProgress, layout }) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const yAxis = useTransform(
    scrollYProgress,
    [start, end],
    [index % 2 === 0 ? 30 : -30, 0],
  );
  const xAxis = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale, opacity }}
        ></motion.div>
        <motion.div
          className={`absolute ${index % 2 === 0 ? "-top-8" : "-bottom-8"} w-0.75 bg-white/40`}
          style={{ height: 40, opacity }}
        ></motion.div>
        <motion.article
          className={`absolute ${index % 2 === 0 ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity, yAxis, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-md text-gray-300 wrap-break-word">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }
  return (
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-3.5 top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{ scale, opacity }}
      ></motion.div>
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity, xAxis }}
        transition={{ duration: 0.4, delay: index * 0.15 }}
      >
        <h3 className="text-lg font-semibold wrap-break-word"> {exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2 wrap-break-word">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300 wrap-break-word">
          {exp.description}
        </p>
      </motion.article>
    </div>
  );
}

const Experience = () => {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCREEN_HEIGHT_VH = isMobile
    ? 160 * experiences.length
    : 120 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(
    () => experiences.map((_, index) => (index + 1) / experiences.length),
    [],
  );
  const lineSize = useTransform(scrollYProgress, (val) => `${val * 100}%`);
  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCREEN_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">
            My Work Journey
          </h2>
          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-1.5 bg-white/50 rounded">
                  <motion.div
                    className="absolute left-0 top-0 h-1.5 bg-white rounded origin-left"
                    style={{ width: lineSize }}
                  ></motion.div>
                </div>
                <div className="relative flex justify-between mt-0">
                  {experiences.map((exp, index) => (
                    <ExperienceItem
                      key={index}
                      exp={exp}
                      index={index}
                      start={index === 0 ? 0 : thresholds[index - 1]}
                      end={thresholds[index]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  ))}
                </div>
              </div>
            )}
            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/15 rounded">
                  <motion.div
                    className="absolute left-0 top-0 w-1.5 bg-white rounded origin-top"
                    style={{ height: lineSize }}
                  ></motion.div>
                </div>
                <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                  {experiences.map((exp, index) => (
                    <ExperienceItem
                      key={index}
                      exp={exp}
                      index={index}
                      start={index === 0 ? 0 : thresholds[index - 1]}
                      end={thresholds[index]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
