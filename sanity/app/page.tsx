import Image from "next/image";
import { client } from "../sanity/lib/client";

export const getProductData = async () => {
  const data = await client.fetch(`*[_type == "product"][]`);
  return data
}




export default async function Home() {

  const res = await getProductData()
  console.log(res)

  return (
    <>



    </>
    
  );
}
