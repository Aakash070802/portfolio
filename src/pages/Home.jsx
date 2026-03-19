import { useEffect, useMemo, useState } from "react";
import Particles from "../components/Particles";
import { motion, scale } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { filter, s } from "framer-motion/client";

/* SOCIAL ICONS */
const socialIcons = [
  {
    Icon: FaGithub,
    label: "GitHub",
    url: "https://github.com/Aakash070802",
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    url: "https://linkedin.com/in/aakash-kashyap-328340251",
  },
];

/* GLOW VARIANTS */
const glowVariants = {
  initial: {
    scale: 1,
    y: 0,
    filter: "drop-shadow(0 0 0 rgba(0, 0, 0, 0))",
  },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13, 88, 204,0.9)) drop-shadow(0 0 18px rgba(16, 185, 129, 0.8))",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

const Home = () => {
  const roles = useMemo(() => [
    "Full Stack Developer",
    "Backend Developer",
    "MERN Stack Developer",
  ]);

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRoles = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < currentRoles.length)
          setSubIndex((v) => v + 1);
        else if (!deleting && subIndex === currentRoles.length)
          setTimeout(() => {
            setDeleting(true);
          }, 12 * 100);
        else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 40 : 60,
    );

    return () => clearTimeout(timeout);
  }, [index, subIndex, deleting, roles]);

  return (
    <section
      id="home"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <Particles />
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-32 w-3/4 sm:w-1/2 md:w-2/5 h-[70vh] sm:h-[50vh] md:h-[40vh] max-w-125 max-h-125 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-3/4 sm:w-1/2 md:w-2/5 h-[70vh] sm:h-[50vh] md:h-[40vh] max-w-125 max-h-125 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse delay-500"></div>
      </div>
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center h-full text-center  lg:text-left relative">
          <div className="w-full lg:pr-24 mx-auto  max-w-3xl">
            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span className="inline-block w-0.5 ml-1 bg-white align-middle animate-pulse h-[1em]"></span>
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Hello I'm
              <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                Aakash Kashyap
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Building systems that don’t break when things get real. From user
              authentication to transaction logic and role-based platforms, I
              focus on writing software that handles real-world complexity — not
              just demos.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-full font-medium text-lg text-white bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all"
              >
                View My Work
              </a>
              <a
                href="/Aakash_Kashyap_resume.pdf"
                download
                className="px-6 py-3 rounded-full font-medium text-lg text-black bg-white hover:bg-gray-200 hover:scale-105 transition-all"
              >
                My Resume
              </a>
            </motion.div>
            <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
              {socialIcons.map(({ Icon, label, url }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
