import { motion, useTransform } from "framer-motion";

const ExperienceItem = ({
  exp,
  index,
  start,
  end,
  scrollYProgress,
  layout,
}) => {
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
};

export default ExperienceItem;
