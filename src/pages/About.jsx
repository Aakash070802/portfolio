import { motion } from "framer-motion";
import Glows from "../components/Glows";
import profilePic from "../assets/Profile.png";

const About = () => {
  const stats = [
    { label: "Experience", value: "1+ Years Building Real Systems" },
    { label: "What I Build", value: "APIs, Dashboards & Scalable Apps" },
    { label: "Focus", value: "Clean Logic & Reliable Systems" },
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
    >
      <Glows />
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        {/* TOP SECTION */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            className="relative w-40 h-40 md:w-50 md:h-50 rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-[#1cd8d2]/20 to-[#302b63]/20 border-2 border-[#1cd8d2]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 80 }}
          >
            <img src={profilePic} alt="Profile" className="absolute inset-0" />
          </motion.div>
          <div className="flex-1-flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]">
              Aakash Kashyap
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Full Stack Developer
            </p>
            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              I'm Aakash, a developer who enjoys figuring out how things should
              work. I like building things that feel smooth on the surface but
              are solid underneath. Right now, I'm working on getting better at
              designing systems that stay simple even as they grow.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-3 text-center rounded-xl bg-white/5 border border-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{stat.label}</div>
                  <div className="text-base fond-semibold">{stat.value}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition hover:scale-105"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 text-white px-5 py-3 hover:bg-white/20 bg-white/10 transition hover:scale-105"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM SECTION */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            About Me
          </h3>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            Motivated Software Engineering graduate with strong technical skills
            in Python, JavaScript and SQL. Experienced in developing backend
            systems through academic capstone projects. Committed to learning
            new technologies and eager to join a dynamic team to develop
            scalable applications.
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg">
            I love turing ideas into scalable, user-friendly products that make
            an impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
