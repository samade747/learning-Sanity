import Image from "next/image";
import { client } from "../sanityz/lib/client";
import { urlForImage } from "@/sanityz/lib/image";

export const getProductData = async () => {
  const data = await client.fetch(`*[_type == "product"]{
    price,
    _id,
    title,
    description,
    image,
    category -> {
      name
    }
  }`);
  return data;
};

interface IProduct {
  title: string;
  _id: string;
  description: string;
  image: Array<{ asset: { _ref: string; _type: string } }>;
  price: number;
  category: {
    name: string;
  };
}

export default async function Home() {
  const products: IProduct[] = await getProductData();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            {/* Product Image Carousel */}
            <div className="relative group">
              <div className="relative h-60 w-full overflow-hidden">
                {item.image && Array.isArray(item.image) && item.image.length > 0 ? (
                  item.image.map((img, index) => (
                    <Image
                      key={index}
                      src={urlForImage(img).url()}
                      alt={item.title}
                      fill
                      className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                        index === 0 ? "block" : "hidden"
                      }`}
                    />
                  ))
                ) : (
                  <div className="h-60 w-full flex items-center justify-center bg-gray-100 text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>
              {/* Carousel Navigation */}
              <div className="absolute inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80">
                  ❮
                </button>
                <button className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80">
                  ❯
                </button>
              </div>
            </div>
            {/* Product Details */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{item.category.name}</p>
              <p className="text-xl font-semibold text-gray-800">${item.price}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



// export default async function Home() {
//   const products: IProduct[] = await getProductData();

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {products.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
//           >
//             {/* Product Image Carousel */}
//             <div className="relative group">
//               <div className="relative h-60 w-full overflow-hidden">
//                 {item.image.map((img, index) => (
//                   <Image
//                     key={index}
//                     src={urlForImage(img).url()}
//                     alt={item.title}
//                     fill
//                     className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
//                       index === 0 ? "block" : "hidden"
//                     }`}
//                   />
//                 ))}
//               </div>
//               {/* Carousel Navigation */}
//               <div className="absolute inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
//                 <button className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80">
//                   ❮
//                 </button>
//                 <button className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80">
//                   ❯
//                 </button>
//               </div>
//             </div>
//             {/* Product Details */}
//             <div className="p-4">
//               <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
//               <p className="text-sm text-gray-500 mb-2">{item.category.name}</p>
//               <p className="text-xl font-semibold text-gray-800">${item.price}</p>
//               <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import Image from "next/image";
// import { client } from "../sanity/lib/client";
// import { Image as IImage } from "sanity";
// import { urlForImage } from "@/sanity/lib/image";

// export const getProductData = async () => {
//   const data = await client.fetch(`*[_type == "product"]{
//     price,
//     _id,
//     title,
//     description,
//     image,
//     category -> {
//       name
//     }
//   }`);
//   return data;
// };

// interface IProduct {
//   title: string;
//   _id: string;
//   description: string;
//   image: Array<{ asset: { _ref: string; _type: string } }>;
//   price: number;
//   category: {
//     name: string;
//   };
// }

// export default async function Home() {
//   const products: IProduct[] = await getProductData();

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Our Products</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
//           >
//             {/* Product Image */}
//             <div className="relative h-48 w-full mb-4">
//               {item.image?.[0]?.asset && (
//                 <Image
//                   src={urlForImage(item.image[0]).url()} // Get URL for the first image
//                   alt={item.title}
//                   fill
//                   className="object-cover rounded-lg"
//                 />
//               )}
//             </div>
//             {/* Product Details */}
//             <h2 className="text-lg font-bold">{item.title}</h2>
//             <p className="text-sm text-gray-500 mb-2">{item.category.name}</p>
//             <p className="text-xl font-semibold text-gray-800">${item.price}</p>
//             <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import Image from "next/image";
// import { client } from "../sanity/lib/client";
// import { Image as IImage } from "sanity";
// import { urlForImage } from "@/sanity/lib/image";


// export const getProductData = async () => {
//   const data = await client.fetch(`*[_type == "product"]{
//     price,
//     _id,
//     title,
//     image,
//     category -> {
//       name

//     }
    
//     }
//     `);
//   return data
// }

// interface IProduct {
//   title: string,
//   _id: string,
//   description: string,
//   image: IImage,
//   price: number,
    
//   category: {
//     name: string;
//   };
// }




// export default async function Home() {

//   // const res = await getProductData()
//   // console.log(res)
  

//   const products: IProduct[] = await getProductData();

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Our Products</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
//           >
//             {/* Product Image */}
//             <div className="relative h-48 w-full mb-4">
//               <Image
//                  src={urlForImage(item.image).url()}
//                 alt={item.title}
//                 width={200}
                
//                 fill
//                 className="object-cover rounded-lg"
//               />
//             </div>
//             {/* Product Details */}
//             <h2 className="text-lg font-bold">{item.title}</h2>
//             <p className="text-sm text-gray-500 mb-2">{item.category.name}</p>
//             <p className="text-xl font-semibold text-gray-800">${item.price}</p>
//             <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
