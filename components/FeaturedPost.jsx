import React from "react";
import FeaturedCard from "./featuredCard";
import featuredImg1 from "../public/featured.png";
import featuredImg2 from "../public/featuredShirt.png";
import featuredImg3 from "../public/featuredTshirt.png";

export default function FeaturedPost() {

  const dataFeaturedPost = [
    {
      id: 1,
      img: featuredImg1,
      category: ['Google', 'Trending', 'New'],
      title: "Loudest à la Madison #1 (Lintegral)",
      desc: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      time: '22 April 2021',
      comment: '10 Comments'
    },
    {
      id: 2,
      img: featuredImg2,
      category: ['Google', 'Trending', 'New'],
      title: "Loudest à la Madison #1 (Lintegral)",
      desc: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      time: '22 April 2021',
      comment: '10 Comments'
    },
    {
      id: 2,
      img: featuredImg3,
      category: ['Google', 'Trending', 'New'],
      title: "Loudest à la Madison #1 (Lintegral)",
      desc: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      time: '22 April 2021',
      comment: '10 Comments'
    }
  ]

  return (
    <div className=" px-6">
      <div className="w-full max-w-[607px] md:pt-20 mb-12 text-center mx-auto">
        <p className="mb-3 text-xl leading-8 ">Practice Advice</p>
        <p className="text-[40px] font-bold mb-3 mx-auto max-w-[450px] leading-[50px]">
          {" "}
          Featured Posts
        </p>
        <p className="text-sm mx-auto w-full max-w-[469px] text-gray-500 font-semibold  leading-5">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics
        </p>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 place-items-center md:gap-4 gap-6'>
        {
          dataFeaturedPost.map((card) => {
            return (
              <FeaturedCard cardData={card} key={card.id} />
            )
          })
        }
      </div>
    </div>
  );
}
