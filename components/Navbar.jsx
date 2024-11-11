import { useUser } from "@clerk/nextjs";
import React from "react";
import {
  BsInstagram,
  BsLinkedin,
  BsTelephone,
  BsTwitterX,
  BsYoutube,
} from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export default function Navbar() {

  return (
    <div className="w-full bg-[#252b42] py-4 text-[14px] font-bold leading-6  text-white">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="flex gap-8">
          <p className="flex gap-2 items-center whitespace-nowrap">
            <BsTelephone />
            (225) 555-0118
          </p>
          <p className="hidden md:flex  gap-2 items-center">
            <MdEmail />
            michelle.rivera@example.com
          </p>
        </div>
        <div className='lg:block hidden'>
          <p>Follow Us and get a chance to win 80% off</p>
        </div>
        <div className="flex gap-[10px] items-center">
          <p className='sm:block hidden'>Follow Us :</p>
          <ul className="flex gap-[8px]">
            {[
              ...Array(
                <BsInstagram />,
                <BsLinkedin />,
                <BsTwitterX />,
                <BsYoutube />
              ),
            ].map((item, idx) => {
              return <li key={idx}>{item}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
