
import {stripe} from "../../libs/stripe"
 const Controller = async({params} : any) => {
    const {id , canceled } = await params;
    if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and checkout when youre ready.'
    )
  }


    const controller = await stripe.products.retrieve(id);
    const price = await stripe.prices.retrieve(controller.default_price as string);
    console.log("Controller data:", controller);
    console.log("Price data:", price);
    return (
        <div  className="controller_container w-screen h-screen flex flex-col justify-center items-center text-black overflow-hidden">

            <div className="controller_nav w-screen h-15 flex justify-start items-center">
                <a href="/"><i className="fa-solid fa-arrow-left mt-20 ml-5 md:ml-10 md:mt-0"></i></a>
            </div>
            <div className="main_controller  flex flex-1 w-screen align-center justify-center   ">
                    <div className="controller_left w-1/2 h-full hidden md:flex relative items-center ">
                     
                             <img src={`${controller?.images[0]}`} alt="Controller" className="absolute w-200 lg:scale-125 md:scale-150  lg:left-[-200] md:left-[-100]" />
                      
                       
                    </div>
                 

                    <div className="controller_right   flex flex-1   left-12 flex flex-col  p-10  md:p-10 ">
                        <h1 className="">Controllers</h1>
                        <h2 className=" text-3xl w-auto  md:text-6xl md:mt-10 font-light spacing-3 [word-spacing:0.25rem]">{`${controller?.name}`} DualSense wireless controllers</h2>
                        <div className="flex py-10 align-center justify-center  md:hidden">
                                  <img className="max-h-50 " src={`${controller?.images[0]}`} alt="Controller" />
                        </div>
                      
                        <h2 className="text-4xl mt-5 md:mt-10  font-bold" style={{"fontFamily":"sans-serif"}}>{`$${price.unit_amount! / 100}`}</h2>
                        <p className=" mt-5 md:mt-10 text-normal w-80 md:w-2/3 font-light" style={{"fontFamily":"sans-serif"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                        <form action={`/api/checkout_sessions/${controller?.id}`} method="POST" className= "flex flex-row gap-5">
                                <button className="mt-10 w-40 h-10 bg-black text-white rounded-md">Add to cart</button>
                              <button className="mt-10 w-40 h-10 bg-black text-white rounded-md cursor-pointer" type="submit" >Checkout</button>
                        </form>
                       
                    </div>
            </div>
        </div>
           
      
    )
}

export default Controller;