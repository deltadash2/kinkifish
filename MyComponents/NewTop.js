import React, { useContext, useState, useRef } from "react";
import Link from "next/link";

const top1 = "../assets/new2/new_3_dress.jpg";
const top2 = "../assets/new2/dress_model_1.jpg";
const top3 = "../assets/new2/dress_model_2.jpg";
const top4 = "../assets/new2/dress_ad.jpg";

const NewTop = () => {
  return (
    <div className="mt-16">
      <div>
        <Link href="/Shop">
          <p className="uppercase text-3xl font-bold text-center">NEW</p>
        </Link>
      </div>
      <div className="mt-8">
        <div className="flex flex-col gap-8 items-center h-full">
          <div className="relative w-full h-full">
            <div className="absolute flex justify-between w-full p-4 uppercase lg:text-lg md:text-base sm:text-sm text-[10px] font-bold">
              <div>
                <p>IN THE GARDEN</p>
                <p>DRESS COLLECTION</p>
              </div>
              <p>OUT NOW</p>
            </div>
            <div className="pt-8 sm:px-8 w-full h-full">
              <img src={top1} alt="top1" className="w-full h-full" />
            </div>
          </div>
          <div className="w-full h-full">
            <img src={top4} alt="top1" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTop;
