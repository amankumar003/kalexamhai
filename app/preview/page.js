"use client";
import { useRouter } from "next/navigation";
/**
 * Preview component
 * It is used to preview the pdf file
 * parameters searchParams
 * @returns preview component
 */
export default function Preview({ searchParams }) {
  return (
    <div>
      <embed
        type="application/pdf"
        src={searchParams.url}
        className="w-full h-screen"
      ></embed>
    </div>
  );
}
