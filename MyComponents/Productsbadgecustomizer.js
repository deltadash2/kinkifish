import React, { useContext, useState, useRef } from "react";
import badge1 from "../public/assets/images/badges/1.png";
import badge2 from "../public/assets/images/badges/2.png";
import badge3 from "../public/assets/images/badges/3.png";
import badge4 from "../public/assets/images/badges/4.png";
import badge5 from "../public/assets/images/badges/5.png";
import badge6 from "../public/assets/images/badges/6.png";
import badge7 from "../public/assets/images/badges/7.png";
import badge8 from "../public/assets/images/badges/8.png";
import badge9 from "../public/assets/images/badges/9.png";
import badge10 from "../public/assets/images/badges/10.png";
import badge11 from "../public/assets/images/badges/11.png";
import badge12 from "../public/assets/images/badges/12.png";
import badge13 from "../public/assets/images/badges/13.png";
import { useDrop } from "react-dnd";
import Dragpicstart from "./Dragpicstart";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Productsbadgecustomizer = ({ customizedProduct }) => {
  const router = useRouter();

  const PictureList = [
    {
      id: 1,
      url: badge1,
      textDesc: "No Hopeless",
      textYear: "2007",
    },
    {
      id: 2,
      url: badge2,
      textDesc: "Stop the Bombs",
      textYear: "2019",
    },
    {
      id: 3,
      url: badge3,
      textDesc: "Harmless Kitty",
      textYear: "1994",
    },
    {
      id: 4,
      url: badge4,
      textDesc: "Girl in Red",
      textYear: "1995",
    },
    {
      id: 5,
      url: badge5,
      textDesc: "Fuck the Rotten world",
      textYear: "2002",
    },
    {
      id: 6,
      url: badge6,
      textDesc: "Yr Childhood",
      textYear: "1995",
    },
    {
      id: 7,
      url: badge7,
      textDesc: "Blue Sheep",
      textYear: "1999",
    },
    {
      id: 8,
      url: badge8,
      textDesc: "Don't Waste Another Day",
      textYear: "2009",
    },
    {
      id: 9,
      url: badge9,
      textDesc: "Life is Only One!",
      textYear: "2007",
    },
    {
      id: 10,
      url: badge10,
      textDesc: "Schalplatten",
      textYear: "2012",
    },
    {
      id: 11,
      url: badge11,
      textDesc: "No War",
      textYear: "2019",
    },
    {
      id: 12,
      url: badge12,
      textDesc: "Three Stars",
      textYear: "2014",
    },
    {
      id: 13,
      url: badge13,
      textDesc: "Rock You",
      textYear: "2010",
    },
  ];

  const [board, setBoard] = useState([]);

  const containerRef = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [product, setProduct] = useState(customizedProduct);

  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard((board) =>
      board.length < 3
        ? [...board, pictureList[0]]
        : [board[1], board[2], pictureList[0]]
    );
  };

  const handleAddingtoCart = async (product) => {
    const pinSet = board.map((item) => item.textDesc);

    localStorage.setItem("selectedCustomizedPinSet", JSON.stringify(pinSet));
    localStorage.setItem("forAddToCart", JSON.stringify(product));
    router.push(`/product/${product?.slug}`);
  };

  return (
    <div className="mt-10 w-full py-16 overflow-hidden">
      <div>
        <p className="uppercase text-3xl font-bold text-center pb-16">
          PIN IT YOUR WAY
        </p>
      </div>
      <div className="flex lg:flex-row md:flex-col sm:flex-col flex-col w-full h-full">
        <div className="lg:w-2/5 md:hidden sm:hidden hidden lg:flex justify-end gap-6 items-center flex-wrap">
          {PictureList.map((picture, index) => {
            if (index < 6) {
              return (
                <div className="text-center w-28" key={index}>
                  <Dragpicstart url={picture.url} id={picture.id} />
                  <p className="w-full text-center overflow-x-auto mx-auto text-xs my-1 font-['Helvetica'] font-bold">
                    {picture.textDesc},
                  </p>
                  <p className="w-full text-center font-['Helvetica'] font-bold overflow-x-auto mx-auto text-xs italic">
                    {picture.textYear}
                  </p>
                </div>
              );
            }
          })}
        </div>

        <div
          className="container-bottom 2xl:w-2/5 lg:w-2/5 md:w-full sm:w-full w-full h-[21rem] relative overflow-hidden flex flex-col justify-center items-center"
          ref={(ref) => {
            containerRef.current = ref;
            drop(ref);
          }}
        >
          <img
            src="../assets/images/naranopins.png"
            className="w-auto my-auto max-h-full 2xl:max-w-fit 2xl:mx-auto"
          />

          {board.map((picture, index) => {
            return (
              <div
                className="absolute"
                style={{
                  marginLeft: `${170 + 130 / (-index - 1)}px`,
                  marginTop: `${-200 - 130 * Math.pow(index - 3, -1)}px`,
                }}
              >
                <Image
                  src={picture.url}
                  width={27}
                  className="rounded-full"
                  alt="Drag Image"
                />
              </div>
            );
          })}
        </div>

        <div className="lg:w-2/5 md:hidden sm:hidden hidden lg:flex justify-start gap-6 items-center flex-wrap">
          {PictureList.map((picture, index) => {
            if (index < 6) {
              return "";
            } else {
              return (
                <div className="text-center w-28" key={index}>
                  <Dragpicstart url={picture.url} id={picture.id} />
                  <p className="w-full text-center overflow-x-auto mx-auto text-xs my-1 font-['Helvetica'] font-bold">
                    {picture.textDesc},
                  </p>
                  <p className="w-full text-center font-['Helvetica'] font-bold overflow-x-auto mx-auto text-xs italic">
                    {picture.textYear}
                  </p>
                </div>
              );
            }
          })}
        </div>

        <div className="overflow-x-auto">
          <div className="lg:hidden md:grid sm:grid grid gap-6 grid-cols-5 space-x-5 place-items-center min-w-[500px] ">
            {PictureList.map((picture, index) => (
              <div className="text-center w-28" key={index}>
                <Dragpicstart url={picture.url} id={picture.id} />
                <p className="w-full text-center overflow-x-auto mx-auto text-xs my-1 font-['Helvetica'] font-bold">
                  {picture.textDesc},
                </p>
                <p className="w-full text-center font-['Helvetica'] font-bold overflow-x-auto mx-auto text-xs italic">
                  {picture.textYear}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={() => handleAddingtoCart(product)}
          className="uppercase mt-4 px-3 py-3 cursor-pointer bg-black duration-150 text-white hover:bg-white hover:text-black font-light tracking-widest text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Productsbadgecustomizer;
