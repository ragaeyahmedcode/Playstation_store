'use client';
import { TransitionRouter } from "next-transition-router";
import { useRef , useEffect } from "react";
import gsap from "gsap";

const BLOCK_SIZE = 60
export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {

    const transition_grid_Ref = useRef<HTMLDivElement>(null);
    const blocks_ref = useRef<HTMLDivElement[]>([]);

    const createTransition = () =>{

        if(!transition_grid_Ref.current) return;

        const transition_grid = transition_grid_Ref.current;
        transition_grid.innerHTML = '';
        blocks_ref.current = [];

        const Width = window.innerWidth;
        const Height = window.innerHeight;

        const columns = Math.ceil(Width / BLOCK_SIZE);
        const rows = Math.ceil(Height / BLOCK_SIZE);
        const offsetX = (Width - columns * BLOCK_SIZE) / 2;
        const offsetY = (Height - rows * BLOCK_SIZE) / 2;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const block = document.createElement('div');
                block.className = 'transition-block';
                block.style.width = `${BLOCK_SIZE}px`;
                block.style.height = `${BLOCK_SIZE}px`;
                block.style.left = `${offsetX + col * BLOCK_SIZE}px`;
                block.style.top = `${offsetY + row * BLOCK_SIZE}px`;
                transition_grid.appendChild(block);
                blocks_ref.current.push(block);
            }
        }
        gsap.set(blocks_ref.current , {opacity:0})

    }

    useEffect(()=>{
        createTransition();

        window.addEventListener("resize", createTransition);
        return () =>{
            window.removeEventListener("resize", createTransition);
        }
    } , [])
    return <TransitionRouter auto
            leave={(next) => {
                const tween = gsap.to(blocks_ref.current , {
                    opacity: 1,
                    duration: 0.1,
                    stagger: {amount: 0.5, from: "random"},
                    ease: "power2.inOut",
                    onComplete:next
                })
                return () => tween.kill();
            }}

            enter={(next) => {
                    gsap.set(blocks_ref.current , {opacity:1})

                  const tween = gsap.to(blocks_ref.current , {
                    opacity: 0,
                    duration: 0.1,
                    stagger: {amount: 0.5, from: "random"},
                    ease: "power2.inOut",
                    onComplete:next
                })
                return () => tween.kill();
            }}
        >
            <div ref={transition_grid_Ref} className="transition-grid"></div>
            {children}
        </TransitionRouter>
}