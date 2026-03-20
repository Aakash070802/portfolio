import ngoPhotoMobile from "../assets/ngo-mobile.jpeg";
import ngoPhotoDesktop from "../assets/ngo-project.png";
import bankPhotoMobile from "../assets/banking-mobile.png";
import bankPhotoDesktop from "../assets/banking.png";
import { useMemo, useRef, useState } from "react";
import useIsMobile from "../hooks/useIsMobile.js";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const Projects = () => {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "NGO Portal",
        link: "https://ngo.trusteducom.com/",
        bgColor: "#0d4d3d",
        image: isMobile ? ngoPhotoMobile : ngoPhotoDesktop,
      },
      {
        title: "Banking",
        link: "https://github.com/Aakash070802/banking-management-system.git",
        bgColor: "#3884d3",
        image: isMobile ? bankPhotoMobile : bankPhotoDesktop,
      },
    ],
    [isMobile], // run only for mobile changes
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const thresholds = projects.map((_, index) => (index + 1) / projects.length);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (val) => {
    const idx = thresholds.findIndex((threshold) => val <= threshold);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={sceneRef}
      id="projects"
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2
          className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}
        >
          Systems I've Built
        </h2>
        <div
          className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" : ""}`}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeIndex === index ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"}`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${isMobile ? "-mt-24" : ""}`}
                    style={{
                      zIndex: 5,
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>
              <div
                className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"}  h-[70vh] sm:h-[75vh] md:h-[80vh]
                max-h-180`}
                style={{ zIndex: 10, transition: "box-shadow 205ms ease" }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover  object-center drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    filter: "drop-shadow(0,16px 40px rgba(0,0,0, 0.65))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex: 11,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className={`absolute ${isMobile ? "bottom-20" : "bottom-1"}`}>
          <a
            href={activeProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
            aria-label={`View ${activeProject?.title}`}
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
