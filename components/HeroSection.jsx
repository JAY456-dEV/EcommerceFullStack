import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import heroimg from "../public/heroimage.jpg";

export default function HeroSection() {
  return (
    <>
      <div className="w-full  text-white relative">
        <Image className="w-full h-[500px]  md:h-full object-cover" src={heroimg} alt="wth" />
        <div className="absolute md:block hidden  top-[41%] left-10 -translate-x-1/2 -translate-y-1/2">
          <IoIosArrowBack className="lg:w-[50px] w-[35px] h-auto" />
        </div>
        <div className="absolute md:block hidden top-[41%] right-0 -translate-x-1/2 -translate-y-1/2">
          <IoIosArrowBack className="lg:w-[50px] w-[35px] rotate-180 h-auto" />
        </div>
        <div className="uppercase absolute top-[50%] md:left-[30%] left-[50%] text-white -translate-x-1/2 -translate-y-1/2 ">
          <p className="leading-6 md:mb-9">SUMMER 2020</p>
          <p className="lg:text-6xl sm:text-5xl text-3xl sm:my-4 font-bold leading-[80px] whitespace-nowrap">
            NEW COLLECTION
          </p>
          <p className="lowercase text-md lg:text-xl  w-full max-w-[376px] leading-8 mb-3  md:my-7 lg:my-10">
            We know how large objects will act, but things on a small scale.
          </p>
          <button className="font-bold text-md lg:text-xl py-2 px-10 lg:px-16 lg:py-4 tracking-widest rounded-md text-white bg-green-500">
            <h3>SHOP NOW</h3>
          </button>
        </div>
        <div className="absolute bottom-10 hidden  md:flex -translate-x-1/2 -translate-y-1/2 left-[50%]">
          <div className="bg-white w-[62px] h-[10px]"></div>
          <div className="bg-white w-[62px] opacity-60 h-[10px]"></div>
        </div>
      </div>
    </>
  );
}
