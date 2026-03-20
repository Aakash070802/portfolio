import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
// import Particles from "./components/Particles";
import CustomCursor from "./components/CustomCursor";
import { useState } from "react";
import Intro from "./components/Intro";

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <Intro onFinish={() => setIntroDone(true)} />}
      {introDone && (
        <div className="relative gradient text-white">
          <CustomCursor />
          {/* <Particles /> */}
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
