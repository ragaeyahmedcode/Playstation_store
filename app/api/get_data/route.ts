/* GETS ALL DATA */
import {stripe} from "../../libs/stripe"
export async function GET(){
const products = await stripe.products.list();
   console.log("Products data:", products.data);
   return new Response(JSON.stringify(products.data))
}