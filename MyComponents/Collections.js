import React from "react";

const Collections = () => {
  return (
    <div className="mt-20">
      <div>
        <p className="uppercase text-3xl font-bold text-center pb-0">
          COLLECTIONS
        </p>
      </div>
      <div className="flex justify-center items-center">
        {/* <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ ---> */}
        <div className="container mx-auto py-12 2xl:px-0 w-full">
          <div className="flex flex-col jusitfy-center items-center space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-x-4 md:gap-x-8 w-full">
              <div className="relative group flex justify-center items-center h-[30rem] w-full my-3">
                <div className="h-full w-full bg-black">
                  <img
                    className="object-center object-cover h-full w-full opacity-80"
                    src="../assets/images/eab0f5c05c82c55ab544e8898f2b9968.png"
                    alt="girl-image"
                  />
                </div>
                <button className="bg-stone-800/70 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-20 z-10 absolute leading-none py-3 px-5 font-semibold text-2xl cursor-default hover:bg-black duration-200 uppercase w-full">
                  Baby Tee
                </button>
              </div>

              <div className="relative group flex justify-center items-start h-[30rem] w-full overflow-hidden my-3">
                <div className="h-full w-full bg-black">
                  <img
                    className="object-cover h-[60rem] object-top w-full opacity-80"
                    src="../assets/images/f5308df51a532427bbed64dfd42c6211.png"
                    alt="girl-image"
                  />
                </div>
                <button className="bg-stone-800/70 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-20 z-10 absolute leading-none py-3 px-5 font-semibold text-2xl cursor-default hover:bg-black duration-200 uppercase w-full">
                  Metallic swimsets
                </button>
              </div>

              <div className="relative group flex justify-center items-start h-[30rem] w-full overflow-hidden my-3">
                <div className="h-full w-full bg-black">
                  <img
                    className="object-cover h-[65rem] object-top w-full opacity-70"
                    src="../assets/images/00cba378c4c2ef3b6087c912add01d4c.png"
                    alt="girl-image"
                  />
                </div>
                <button className="bg-stone-800/70 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-20 z-10 absolute leading-none py-3 px-5 font-semibold text-2xl cursor-default hover:bg-black duration-200 uppercase w-full">
                  LA Marathon Tee
                </button>
              </div>

              <div className="relative group flex justify-center items-start h-[30rem] w-full overflow-hidden mx-auto my-3">
                <div className="h-full w-full bg-black">
                  <img
                    className="object-cover h-[35rem] object-top w-full opacity-90"
                    src="../assets/images/e1d8e940f054fd1a852d253db064977f.png"
                    alt="girl-image"
                  />
                </div>
                <button className="bg-stone-800/70 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-20 z-10 absolute leading-none py-3 px-5 font-semibold text-2xl cursor-default hover:bg-black duration-200 uppercase w-full">
                  PANTS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
