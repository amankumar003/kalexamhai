"use client";
import React from "react";
import Link from "next/link";

const Cards = ({
  title,
  img,
  link,
  setFaculty,
  obj,
  setBranch,
  branch,
  setPath,
  setSemester,
  semester,
  data,
  path,
}) => {
  if (title === "Semester 3") {
    console.log("Semester 3: ", obj);
  }
  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-xl md:basis-2/3 basis-3/3">
      <img
        className="w-full"
        src={semester ? obj.file : img}
        alt="Card Image"
      />
      <div className="px-6 py-4">
        <div className=" font-semibold text-md mb-2">
          {semester ? obj.subject : title}
        </div>
        <button
          onClick={() => {
            setBranch((prevValue) => {
              if (prevValue == "") {
                setBranch(title);
                setPath(title);
              }
            });
            setFaculty(() => {
              const s = "" + title;
              const p = path !== "" && path.split("/");
              const b = s.substring(0, 8) === "Semester" ? true : false;
              console.log(b);
              if (p.length === 2) {
                return data[0][p[0]][p[1]][title];
              }
              return obj !== undefined ? Object.keys(obj).sort() : [];
            });
            setPath((prevValue) =>
              prevValue !== "" && prevValue !== title
                ? prevValue + "/" + title
                : title
            );
            setSemester(() => {
              const s = "" + title;
              return s.substring(0, 8) === "Semester" ? true : false;
            });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 text-sm px-4 rounded mt-4 mb-6"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default Cards;
