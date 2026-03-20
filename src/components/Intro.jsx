import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const Intro = ({ onFinish }) => {
  const greetings = useMemo(
    () => [
      "Hello", // English
      "नमस्ते", // Hindi
      "Hola", // Spanish
      "Bonjour", // French
      "Ciao", // Italian
      "Olá", // Portuguese
      "Merhaba", // Turkish
      "Привет", // Russian
      "Здравствуйте", // Russian (formal)
      "こんにちは", // Japanese
      "안녕하세요", // Korean
      "你好", // Chinese (Mandarin)
      "Halo", // Indonesian
      "Sawasdee", // Thai
      "Xin chào", // Vietnamese
      "Selam", // Amharic / Turkish informal
      "Yassas", // Greek
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setTimeout(() => setIndex((i) => i + 1), 180);
      return () => clearTimeout(id);
    } else {
      const t = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(t);
    }
  }, [index, greetings]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            key={index}
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.12 }}
          >
            {greetings[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
