import React from "react";
import "./about.css";

const AboutSection = ({ description, toggleSetting }) => {
  return (
    <div className="col-span-3 flex flex-col justify-start gap-1 py-2 px-3">
      <h3 className="pl-2 3xl:text-4xl">About Me</h3>
      <div className="flex-grow-1 overflow-hidden mt-2">
        <textarea
          className="desc-input w-full h-full rounded-lg py-1 px-2 text-xl 3xl:text-3xl overflow-y-auto break-all"
          value={description}
        ></textarea>
      </div>
    </div>
  );
};

export default AboutSection;
