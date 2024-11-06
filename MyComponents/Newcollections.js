import React from "react";
import NewTshirts from "@/MyComponents/NewTshirts";

const newcro1 = "../assets/new/newcro1.png";

const Newcollections = ({}) => {
  return (
    <>
      <NewTshirts />

      <div className="mt-10 w-full py-16 flex flex-col items-center overflow-hidden">
        <div className="flex flex-col gap-8 items-center w-[90%] h-full">
          <img
            src={newcro1}
            alt="newcro1"
            className="relative lg:w-4/5 w-full h-full"
          />
        </div>
      </div>
    </>
  );
};

export default Newcollections;
