import Image from "next/image";
import React from "react";
import menimage from "../public/filter.png";

export default function EditorsPick() {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="w-full max-w-[1050px] mx-auto">
        <div className="w-full max-w-[607px] pt-20 mb-12 text-center mx-auto">
          <p className="uppercase font-bold mb-3 text-2xl leading-8">
            EDITOR’S PICK
          </p>
          <p className="text-sm leading-5">
            Problems trying to resolve the conflict between{" "}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-20 gap-8">
          <div className="w-auto relative col-span-2 h-auto">
            <Image
              className="w-full h-full object-cover"
              src={menimage}
              alt="wth"
            />
            <div className="absolute bottom-4 left-4">
              <button className="uppercase font-semibold px-6 py-2 bg-white">
                Men
              </button>
            </div>
          </div>
          <div className="w-auto relative h-auto">
            <Image
              className="w-full h-full object-cover"
              src={menimage}
              alt="wth"
            />
            <div className="absolute bottom-4 left-4">
              <button className="uppercase font-semibold p-1 text-sm md:text-base  md:px-3 md:py-2 bg-white">
                Women
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between md:gap-0 gap-4">
            <div className="relative">
              <Image
                className="w-full h-full object-cover"
                src={menimage}
                alt="wth"
              />
              <div className="absolute bottom-4 left-4">
                <button className="uppercase font-semibold p-1 text-sm md:text-base  md:px-3 md:py-2 bg-white">
                  ACCESSORIES
                </button>
              </div>
            </div>
            <div className="relative">
              <Image
                className="w-full h-full object-cover"
                src={menimage}
                alt="wth"
              />
              <div className="absolute bottom-4 left-4">
                <button className="uppercase font-semibold  p-1 text-sm md:text-base  md:px-3 md:py-2 bg-white">
                  Kids
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
