"use client";

import { useState } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { Preloader } from "./Preloader";
import { Navbar } from "./Navbar";
import { CustomCursor } from "./CustomCursor";
import { Hero } from "./Hero";
import { About } from "./About";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Quote } from "./Quote";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

export default function PageContent() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setIsLoaded(true)} />
      <CustomCursor />
      <SmoothScroll>
        <Navbar show={isLoaded} />
        <main>
          <Hero isLoaded={isLoaded} />
          <About />
          <Projects />
          <Skills />
          <Quote />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
