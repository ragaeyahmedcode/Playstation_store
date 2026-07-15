'use client'
import { useEffect, useRef } from "react";
import  gsap  from "gsap";
import { Observer } from "gsap/Observer";
import { Hero } from "./components/Hero"
import { Navbar } from "./components/Nav"
import { Welcome , welcome_tl } from "./components/Welcome"
import { useGSAP } from "@gsap/react"
export default function Home() {

  useGSAP(()=>{
    welcome_tl.from(".NNAV" , {
      y:20,
      opacity:0,
      ease:"power2.out"
    })
    .from(".hero_head",{
      x:-30,
      opacity:0,
      ease:"power3.out"
    })
    .from(".controllers",{
      y:30,
      opacity:0,
      delay:.1,
      ease:"power2.out"
    })
  })


  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    gsap.registerPlugin(Observer);

    const repeatedWidthRef = { current: 0 };
    let targetX = 0;
    let currentX = 0;
    let isReady = false;

    const wrapX = (x: number) => {
      const width = repeatedWidthRef.current;
      return width ? gsap.utils.wrap(-width * 2, 0, x) : x;
    };

    const updateRepeatedWidth = () => {
      const width = wrapper.scrollWidth / 3;
      if (!width) return;
      repeatedWidthRef.current = width;

      if (!isReady) {
        targetX = -width;
        currentX = -width;
        gsap.set(wrapper, { x: -width });
        isReady = true;
      }
    };

    updateRepeatedWidth();
    const resizeObserver = new ResizeObserver(updateRepeatedWidth);
    resizeObserver.observe(wrapper);

    const mutationObserver = new MutationObserver(updateRepeatedWidth);
    mutationObserver.observe(wrapper, { childList: true, subtree: true });

    const updatePosition = () => {
      if (!isReady) return;
      currentX += (targetX - currentX) * 0.1;
      gsap.set(wrapper, { x: wrapX(currentX) });
    };

    gsap.ticker.add(updatePosition);

    const wheelObserver = Observer.create({
      target: wrapper,
      type: "wheel,touch",
      onChangeY: (self) => {
        if (!isReady) return;
        targetX -= self.deltaY * 0.7;
      },
    });

    return () => {
      gsap.ticker.remove(updatePosition);
      wheelObserver.kill();
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);


 
  return (
      <>
        <Welcome />
        <Navbar/>
        <Hero wrapperRef={wrapperRef} />
      </>
  )
}
