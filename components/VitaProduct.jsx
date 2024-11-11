import React from "react";
import modelNo from "../public/ishowspeed.png";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import cloth from "../public/cloth.png";

export default function VitaProduct() {
  return (
    <>
      <div className="w-full h-[900px]  md:h-[700px] mb-20  bg-[#2F69E5] text-white relative">
        <div className='flex md:flex-row flex-col'>
          <div>
            <div className="absolute md:block hidden  top-[41%] left-10 -translate-x-1/2 -translate-y-1/2">
              <IoIosArrowBack className="w-[50px] h-auto" />
            </div>
            <div className="absolute  md:block hidden top-[41%] right-0 -translate-x-1/2 -translate-y-1/2">
              <IoIosArrowBack className="w-[50px] rotate-180 h-auto" />
            </div>
            <div className="uppercase absolute top-[30%] md:top-[50%] left-[50%] md:left-[30%] text-white -translate-x-1/2 -translate-y-1/2 ">
              <p className="leading-6">SUMMER 2020</p>
              <p className="lg:text-6xl text-4xl  md:text-5xl font-bold my-4  md:my-9 leading-[45px]  md:leading-[80px]">
                NEW COLLECTION
              </p>
              <p className="lowercase text-xl mb-9 w-full max-w-[376px] leading-8">
                We know how large objects will act, but things on a small scale.
              </p>
              <div className="flex lg:flex-row flex-col items-start lg:items-center gap-9">
                <p className="font-bold text-2xl leading-6">$16.48</p>
                <button className="font-bold text-lg  md:text-xl px-8 md:px-12 py-4 tracking-widest rounded-lg text-white bg-green-500">
                  <h3>Add to Cart</h3>
                </button>
              </div>
            </div>
            <div className="absolute bottom-10 hidden lg:flex -translate-x-1/2 -translate-y-1/2 left-[50%] ">
              <div className="bg-white w-[62px] h-[10px]"></div>
              <div className="bg-white w-[62px] opacity-60 h-[10px]"></div>
            </div>
          </div>

          <div className="absolute bottom-0 sm:right-72  md:right-14">
            <Image src={modelNo} alt="wth" className='lg:w-full md:w-[400px] w-[310px]' />
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col-reverse gap-5 items-center mb-20 justify-around">
        <div className="md:w-[550px] h-[679px]">
          <Image className="w-full h-full object-cover" src={cloth} alt="wth" />
        </div>
        <div>
          <div className="uppercase md:text-start text-center md:px-2 px-6  flex flex-col md:items-start items-center">
            <p className="leading-6 text-gray-300 ">SUMMER 2020</p>
            <p className="lg:text-[40px] text-[35px] font-bold md:my-9 my-4 max-w-[450px] leading-[50px]">
              {" "}
              Part of the Neural Universe
            </p>
            <p className="lowercase text-lg  lg:text-xl mb-9 w-full  leading-8">
              We know how large objects will act, but things on a small scale.
            </p>
            <div className="flex sm:flex-row flex-col items-center justify-center md:justify-start sm:gap-9 gap-3">
              <button className="font-bold md:text-lg  lg:text-xl px-8  md:px-12 py-3 sm:py-4 tracking-widest rounded-lg text-white bg-green-500">
                <h3 className='text-nowrap'>Buy Now</h3>
              </button>
              <button className="font-bold md:text-lg lg:text-xl px-8 md:px-12 py-3 sm:py-4 tracking-widest rounded-lg border border-green-500 text-green-500">
                <h3 className='text-nowrap'>Read More</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
