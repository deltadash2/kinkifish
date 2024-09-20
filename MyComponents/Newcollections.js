import React, { useContext, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NewTshirts from "@/MyComponents/NewTshirts";

const newcro1 = "../assets/new/newcro1.png";
const newcro2 = "../assets/new/newcro2.png";
const newcro3 = "../assets/new/newcro3.png";
const top1 = "../assets/new/top1.png";
const top2 = "../assets/new/top2.jpg";
const top3 = "../assets/new/top3.jpg";
const snc1 = "../assets/new/snc1.jpg";
const snc2 = "../assets/new/snc2.jpg";
const snc3 = "../assets/new/snc3.jpg";

const Newcollections = ({ products }) => {
  const router = useRouter();

  return (
    <>
      <div className="mt-10 w-full py-16 flex flex-col items-center overflow-hidden">
        <div>
          <Link href="/Shop">
            <p className="uppercase text-3xl font-bold text-center pb-16">
              CROCHET CAPSULE
            </p>
          </Link>
        </div>
        <div className="flex flex-col gap-8 items-center h-full">
          <img src={top1} alt="top1" className="relative w-full h-full" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 w-full">
            <img src={top2} alt="top2" className="w-full col-span-1" />
            <img src={top3} alt="top3" className="w-full col-span-1" />
          </div>
        </div>
      </div>

      <NewTshirts />

      {/* <div className="mt-10 w-full py-16 flex flex-col items-center overflow-hidden">
        <div>
          <p className="uppercase text-3xl font-bold text-center pb-16">
            SHOP NEW COLLECTION
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[90%]">
          <div className="w-full col-span-1 text-center">
            <img src={snc1} alt="snc1" />
            <p
              className="text-2xl font-bold text-center pt-4 cursor-pointer"
              onClick={() => {
                localStorage.setItem(
                  "forAddToCart",
                  JSON.stringify(
                    products.find(
                      (item) => item.slug === "crochet-hood-in-slate"
                    )
                  )
                );

                router.push(`/product/crochet-hood-in-slate`);
              }}
            >
              Slate
            </p>
          </div>
          <div className="w-full col-span-1 text-center">
            <img src={snc2} alt="snc2" />
            <p
              className="text-2xl font-bold text-center pt-4 cursor-pointer"
              onClick={() => {
                localStorage.setItem(
                  "forAddToCart",
                  JSON.stringify(
                    products.find(
                      (item) => item.slug === "cowl-neck-in-natural"
                    )
                  )
                );

                router.push(`/product/cowl-neck-in-natural`);
              }}
            >
              Cowl Neck in Natural
            </p>
          </div>
          <div className="lw-full col-span-1 text-center">
            <img src={snc3} alt="snc3" />
            <p
              className="text-2xl font-bold text-center pt-4 cursor-pointer"
              onClick={() => {
                localStorage.setItem(
                  "forAddToCart",
                  JSON.stringify(
                    products.find(
                      (item) =>
                        item.slug === "vintage-tee-with-kinki-japanese-logo"
                    )
                  )
                );

                router.push(`/product/vintage-tee-with-kinki-japanese-logo`);
              }}
            >
              Vintage Tee
            </p>
          </div>
        </div>
      </div> */}

      <div className="mt-10 w-full py-16 flex flex-col items-center overflow-hidden">
        <div className="flex flex-col gap-8 items-center w-[90%] h-full">
          <img
            src={newcro1}
            alt="newcro1"
            className="relative lg:w-4/5 w-full h-full"
          />
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <img src={newcro2} alt="newcro2" className="w-full col-span-1" />
            <img src={newcro3} alt="newcro3" className="w-full col-span-1" />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Newcollections;
