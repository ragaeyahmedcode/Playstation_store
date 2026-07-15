'use client'
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap/gsap-core"
import { SplitText } from "gsap/all"
export const welcome_tl = gsap.timeline()
export const Welcome = () =>{

    useGSAP(()=>{
       
      

        welcome_tl.from( ".PS_LOGO", {
            y:20,
            opacity:0,
             duration:.5,
            ease: "power2.out"
        })
        .to(".Welcome" , {
           
            yPercent:-100,
            duration:1
        })
    })
    return(

        <div className="Welcome w-screen h-screen absolute bg-blue-500">
            <i className="PS_LOGO fa-brands fa-playstation welcome_txt absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-4xl text-white"></i>
        </div>
    )
}