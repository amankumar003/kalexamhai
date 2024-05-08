"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Paper = ({ obj }) => {
  const router = useRouter();
  console.log(obj);
  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-xl md:basis-3/4 basis-3/3">
      <img className="w-full" src={"images/cards/Paper.png"} alt="Card Image" />
      <div className="px-6 py-4">
        <div className=" font-semibold text-md mb-2">
          {obj.subject + " " + obj.exam + " " + obj.year}
        </div>
        <button
          onClick={() => {
            const param = new URLSearchParams();
            param.set("url", obj.file);
            router.push("/preview?" + param.toString());
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 text-sm px-4 rounded mt-4 mb-6"
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default Paper;
