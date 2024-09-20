import React from "react";
import { useDrag } from "react-dnd";
import Image from "next/image";

const Dragpicstart = ({ id, url }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <Image
      ref={drag}
      src={url}
      style={{ border: isDragging ? "5px solid rgb(188, 178, 178)" : "0px" }}
      width={100}
      className="rounded-full w-[100px] h-[100px]"
      alt="DraggingImage"
    />
  );
};

export default Dragpicstart;
