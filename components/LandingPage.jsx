import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import EditorsPick from "./EditorsPick";
import BestSellerPick from "./BestSellerPick";
import VitaProduct from "./VitaProduct";
import FeaturedPost from "./FeaturedPost";

export default function LandingPage() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <HeroSection />
      <EditorsPick />
      <BestSellerPick />
      <VitaProduct />
      <FeaturedPost />
    </div>
  );
}
