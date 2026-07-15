

export const Navbar = () =>{

    return(

        <nav className="NNAV flex flex-col w-screen h-25">
            <div className="icon_div flex w-full  justify-center mb-15 mt-3">
                <img src={"imgs/icons/Playstation.png"} className="w-15"/>
    
            </div>
            <div className="links_div w-screen  h-1/3  flex align-center justify-center">
                <ul className="flex  gap-15 md:gap-20 text-black font-light text-sm md:text-lg ">
                    <li>Playstation 5</li>
                    <li className="mr-2">Games</li>
                    <li>Controllers</li>
                </ul>
            </div>
        </nav>
    )
}