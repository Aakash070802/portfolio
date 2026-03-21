import { useTransform, motion, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import ExperienceItem from "../components/ExperienceItem";

const experiences = [
  {
    role: "Software Developer Intern",
    company: "Tosscall Services",
    duration: "Feb 2025 - Aug 2025",
    description:
      "Built and shipped real-world platforms including an NGO system, LMS, and partner portal used by active users.",
  },
  {
    role: "Independent Projects",
    company: "Self-Driven",
    duration: "2024 - Present",
    description:
      "Developed systems like a ledger-based banking API and an AI-powered attendance system using OpenCV.",
  },
];

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

  const { scrollYProgress: rawProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const scrollYProgress = useTransform(rawProgress, [0, 1], [0, 1], {
    clamp: true,
  });

  const thresholds = useMemo(
    () => experiences.map((_, index) => (index + 1) / experiences.length),
    [],
  );

  const lineSize = useTransform(scrollYProgress, (val) => `${val * 100}%`);

  return (
    <section
      id="experience"
      className="relative bg-black text-white"
      style={{ position: "relative" }}
    >
      <div
        ref={sceneRef}
        style={{
          height: `${SCREEN_HEIGHT_VH}vh`,
          minHeight: "120vh",
          position: "relative",
        }}
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">
            My Work Journey
          </h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-1.5 bg-white/20 rounded">
                  <motion.div
                    className="absolute left-0 top-0 h-1.5 bg-white rounded origin-left"
                    style={{ width: lineSize }}
                  />
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
                  />
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
