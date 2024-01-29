import React from 'react';
import "./about.css";

const AboutSection = ({description}) => {
  return (
    <div className="col-span-3 flex flex-col justify-start gap-1 py-2 px-3">
      <div className="section-container flex flex-row justify-start items-center gap-3">
        <h3 className="pl-2 3xl:text-4xl">About Me</h3>
        <i class="pen-icon fa-solid fa-pen-to-square text-md"></i>
      </div>
      <form className="flex-grow-1 overflow-hidden">
        <textarea
          className="desc-input w-full h-full rounded-lg py-1 px-2 text-xl 3xl:text-3xl overflow-y-auto break-all"
          value={description}
        ></textarea>
      </form>
    </div>
  );
}

export default AboutSection