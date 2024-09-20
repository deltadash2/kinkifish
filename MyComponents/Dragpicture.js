import React from "react";
import { useDrag } from "react-dnd";
import Image from "next/image";

const Dragpicture = ({ id, url }) => {
  return (
    <Image src={url} width={27} className="rounded-full" alt="Drag Image" />
  );
};

export default Dragpicture;
