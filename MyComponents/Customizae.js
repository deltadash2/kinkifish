import Image from "next/image";
import React from "react";
import Link from "next/link";
import mainBg from "../public/assets/new/kitchen2.png";

const Customizae = () => {
  return (
    <div className="mt-16 overflow-hidden">
      <div className="mt-8 w-[100%]">
        <Image
          src={mainBg}
          width={500}
          height={500}
          alt="Image"
          className="w-full h-full"
        />
      </div>
      <div className="bg-cover bg-center bg-fixed w-full 2xl:h-[50rem] xl:h-[45rem] lg:h-[40rem] max-h-screen relative overflow-hidden pb-1">
        {/* <div className='bg-black w-full h-full opacity-30 bg-bgVideoPlayImg bg-no-repeat'>
            </div> */}
        {/* autoPlay muted loop */}
        <video
          playsInline
          autoPlay
          muted
          loop
          className="mx-auto w-full object-fill lg:h-full"
          src="https://www.dropbox.com/scl/fi/9b0bg6n7udn5rpq0zu62y/Homepage-swing-vid-no-video.mp4?rlkey=rfslcw1x29jlvrlpp4puyo9ly&raw=1"
        ></video>
      </div>
    </div>
  );
};

export default Customizae;
