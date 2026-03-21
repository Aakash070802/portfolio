import { useTransform, motion, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const experiences = [
  {
    role: "Software Developer Intern",
    company: "Tosscall Services",
    duration: "Feb 2025 - Aug 2025",
    description:
      "Built and shipped real-world platforms including an NGO system, LMS, and partner portal used by active users.",
  },
  {
    role: "System & Backend Development",
    company: "Tosscall Services",
    duration: "Internship Phase",
    description:
      "Worked on transaction flows, wallet logic, and role-based access systems with a focus on data integrity and edge cases.",
  },
  {
    role: "Independent Projects",
    company: "Self-Driven",
    duration: "2024 - Present",
    description:
      "Developed systems like a ledger-based banking API and an AI-powered attendance system using OpenCV.",
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
        {/* Dot
            FIX: `initial={{ opacity: 0, scale: 0 }}` ensures the element is
            invisible on first paint, before any scroll MotionValue is read.
            Without this, React renders the element at CSS defaults (opacity:1,
            scale:1) for one frame before Framer Motion hydrates the style. */}
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          initial={{ opacity: 0, scale: 0 }}
          style={{ scale, opacity }}
        />

        {/* Connector tick */}
        <motion.div
          className={`absolute ${index % 2 === 0 ? "-top-8" : "-bottom-8"} w-0.5 bg-white/40`}
          initial={{ opacity: 0 }}
          style={{ height: 40, opacity }}
        />

        {/* Card */}
        <motion.article
          className={`absolute ${
            index % 2 === 0 ? "bottom-12" : "top-12"
          } bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          initial={{ opacity: 0 }}
          style={{
            opacity,
            y: yAxis,
            maxWidth: "90vw",
            willChange: "opacity, transform",
          }}
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
        initial={{ opacity: 0, scale: 0 }}
        style={{ scale, opacity }}
      />
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        initial={{ opacity: 0 }}
        style={{
          opacity,
          x: xAxis,
          willChange: "opacity, transform",
        }}
      >
        <h3 className="text-lg font-semibold wrap-break-word">{exp.role}</h3>
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

  const { scrollYProgress: rawProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // FIX: Clamp the raw scroll value to [0, 1].
  //
  // useScroll({ target }) tracks the element's position relative to the
  // viewport. If the section enters the viewport already partially scrolled
  // (e.g. the page loaded mid-scroll, or a parent has padding/margin),
  // rawProgress can start above 0 and cards become visible immediately.
  //
  // useTransform with an identity clamp [0,1]→[0,1] does NOT fix this —
  // we need to capture the rawProgress value at the moment the section
  // first becomes visible, then subtract it so our local 0 is always
  // "section just entered viewport".
  //
  // The cleanest approach: use `offset: ["start start", "end end"]` which
  // already anchors 0 = top-of-section at top-of-viewport. The remaining
  // issue is the console warning coming from a PARENT component having
  // position:static. We cannot fix that from here, so we instead guard
  // every animated element with `initial={{ opacity: 0 }}` (see above)
  // so there is NO visible flash on mount regardless of what rawProgress
  // starts at.
  //
  // Additionally, we clamp rawProgress so values outside [0,1] (which
  // Framer Motion allows) don't cause items to appear before the section.
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
      // `relative` + explicit style both set — belt and suspenders.
      // The Tailwind class can be purged or overridden by a parent CSS rule;
      // the inline style cannot. This is the most reliable way to satisfy
      // Framer Motion's positioned-ancestor requirement from within this
      // component, even if the parent tree has static-positioned elements.
      className="relative bg-black text-white"
      style={{ position: "relative" }}
    >
      <div
        ref={sceneRef}
        style={{
          height: `${SCREEN_HEIGHT_VH}vh`,
          minHeight: "120vh",
          position: "relative", // same belt-and-suspenders for the ref element
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
