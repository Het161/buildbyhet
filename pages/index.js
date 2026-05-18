import { useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Loader from "@/components/Loader/Loader";
import Header from "@/components/Header/Header";
import Menu from "@/components/Header/Menu/Menu";
import ProgressIndicator from "@/components/ProgressIndicator/ProgressIndicator";
import Cursor from "@/components/Cursor/Cursor";
import Hero from "@/components/Hero/Hero";
import About1 from "@/components/About/About1";
import Skills from "@/components/Skills/Skills";
import About2 from "@/components/About/About2";
import Projects from "@/components/Projects/Projects";
import Work from "@/components/Work/Work";
import Collaboration from "@/components/Collaboration/Collaboration";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { displayFancyLogs } from "utils/log";
import { getPublishedCities } from "../data/cities";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const [clientHeight, setClientHeight] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2600);

    displayFancyLogs();
  }, []);

  useEffect(() => {
    const { innerWidth, innerHeight, orientation, history } = window;

    const result =
      typeof orientation === "undefined" &&
      navigator.userAgent.indexOf("IEMobile") === -1;
    history.scrollRestoration = "manual";

    setIsDesktop(result);
    setClientHeight(innerHeight);
    setClientWidth(innerWidth);
  }, [isDesktop]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header>
            <Menu />
          </Header>
          <ProgressIndicator />
          <Cursor isDesktop={isDesktop} />
          <main className="flex flex-col">
            <div
              role="img"
              className="text-gray-light-1 opacity-10 sm:text-9xl xs:text-8xl inline-block -z-10 absolute rotate-90 right-0 md:top-52 xs:top-96"
            >
              DEV
            </div>
            <div className="fixed top-0 left-0 h-screen w-screen -z-1" />
            <Hero />
            <About1 clientHeight={clientHeight} />
            <Skills />
            <About2 clientHeight={clientHeight} />
            <Projects isDesktop={isDesktop} clientHeight={clientHeight} />
            <Work isDesktop={isDesktop} />
            <Collaboration clientHeight={clientHeight} />
            <Contact />
          </main>
          {getPublishedCities().length > 0 && (
            <section className="px-4 sm:px-8 lg:px-16 py-12 border-t border-gray-800 max-w-7xl mx-auto">
              <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                Serving clients across India
              </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {getPublishedCities().map((c) => (
                  <Link
                    key={c.slug}
                    href={`/web-developer-in/${c.slug}`}
                    className="text-gray-400 hover:text-white"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </section>
          )}
          <Footer />
        </>
      )}
    </>
  );
}
