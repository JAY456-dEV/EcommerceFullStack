import React from "react";
import prodImg1 from "..//public/home/product-cover-5.png";
import prodImg2 from "..//public/home/product2.png";
import prodImg3 from "..//public/home/product3.png";
import prodImg4 from "..//public/home/product4.png";
import prodImg5 from "..//public/home/product5.png";
import prodImg6 from "..//public/home/product6.png";
import prodImg7 from "..//public/home/product7.png";
import prodImg8 from "..//public/home/product8.png";
import { getProducts } from "../actions/getProducts";
import ProductCard from "./productCard";

export default async function BestSellerPick() {

  const products = [
    {
      id: "prod1", // Manually assigned ID
      title: "T-Shirt",
      department: "English Department",
      originalPrice: "$26.48",
      discountedPrice: "$16.48",
      colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
      imageSrc: prodImg1,
      imageAlt: "prodImg1"
    },
    {
      id: "prod2",
      title: "Girl Suit",
      department: "English Department",
      originalPrice: "$24.99",
      discountedPrice: "$14.99",
      colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
      imageSrc: prodImg2,
      imageAlt: "prodImg2"
    },
    {
      id: "prod3",
      title: "Top T-Shirt",
      department: "English Department",
      originalPrice: "$20.00",
      discountedPrice: "$12.00",
      colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
      imageSrc: prodImg3,
      imageAlt: "prodImg3"
    },
    {
      id: "prod4",
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$22.50",
      discountedPrice: "$15.00",
      colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
      imageSrc: prodImg4,
      imageAlt: "prodImg4"
    },
    {
      id: "prod5",
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$27.99",
      discountedPrice: "$19.99",
      colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
      imageSrc: prodImg5,
      imageAlt: "prodImg5"
    },
    {
      id: "prod6",
      title: "Graphic Design",
      department: "English Department",
      originalPrice: "$25.00",
      discountedPrice: "$18.00",
      colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
      imageSrc: prodImg6,
      imageAlt: "prodImg6"
    },
    {
      id: "prod7",
      title: "Polo T-Shirt",
      department: "English Department",
      originalPrice: "$23.48",
      discountedPrice: "$15.48",
      colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
      imageSrc: prodImg7,
      imageAlt: "prodImg7"
    },
    {
      id: "prod8",
      title: "T-Shirt",
      department: "English Department",
      originalPrice: "$21.99",
      discountedPrice: "$12.99",
      colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
      imageSrc: prodImg8,
      imageAlt: "prodImg8"
    }
  ];

  const dbProducts = await getProducts()

  return (
    <div className="max-w-7xl mx-auto p-5 px-6" >
      <div className="w-full max-w-[607px] pt-8 md:pt-20 mb-12 text-center mx-auto">
        <p className="mb-3 text-xl leading-8">Featured Products</p>
        <p className="uppercase font-bold mb-3 text-2xl leading-8">
          BESTSELLER PRODUCTS
        </p>
        <p className="text-sm leading-5">
          Problems trying to resolve the conflict between
        </p>
      </div>
      <div className="grid sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {dbProducts?.slice(0, 8).map((item, idx) => {
          return (
            <>
              <ProductCard item={item} />
            </>
          );
        })}
      </div>
    </div >
  );
}
