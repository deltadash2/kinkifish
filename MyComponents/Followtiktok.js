import React from "react";
import TikTokSdk from "tiktok-sdk";

const Followtiktok = () => {
  return (
    <div>
      <div>
        <p className="uppercase text-3xl font-bold text-center">TikTok</p>
        <a href="https://www.tiktok.com/@kinki.fish">
          {" "}
          <p className="lowercase text-2xl text-gray-500 underline text-center">
            @ <b className="font-semibold">kinki.fish</b>
          </p>
        </a>
      </div>
    </div>
  );
};

export default Followtiktok;
