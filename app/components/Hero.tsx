"use client";
import { useEffect, useRef , useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { IMGS } from "../exports/imgs";
import { Link } from "next-transition-router";
export const Hero = ({wrapperRef}: {wrapperRef: React.RefObject<HTMLDivElement | null>}) => {
  const [data , setData] = useState<any>([]);
  useEffect(()=>{
      
      fetch("/api/get_data")
      .then( (res) =>res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setData(data);
  
      })
  },  [])

  const repeatedImages = [...data, ...data, ...data];


  
  return (
    <section id="hero" className="flex flex-col flex-1 mt-15 overflow-hidden">
      <div className="hero_head flex header_txt justify-center items-center w-full h-20 text-3xl md:text-5xl mt-10 text-black font-light">
        <h1>PS5 Wireless controllers</h1>
      </div>
      <main className="flex flex-1 ">
        <div ref={wrapperRef} className="controllers flex items-center gap-6 h-full w-full px-8 py-6   ">
          {repeatedImages.map((item, i) => (
            <a
              href={`/controller/${item.id}`}
              key={i}
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <img
                key={`${item.id}-${i}`}
                src={item.images[0]}
                alt={`Controller ${i + 1}`}
                id={`controller-${i}`}
                className="controller hover:scale-105 block h-auto w-200 shrink-0"
              />
            </a>
          ))}
        </div>
      </main>
    </section>
  );
};