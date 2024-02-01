import React, { useEffect, useRef, useState } from "react";
import "./about.css";
import { useStoreActions, useStoreState } from "easy-peasy";

const AboutSection = ({ toggleSetting }) => {
  const texareaRef = useRef(null);
  const { description } = useStoreState((state) => state);
  const { setDescription } = useStoreActions((actions) => actions);
  const [wordCount, setWordCount] = useState(0);
  const wordLimit = 3;

  useEffect(() => {
    if (texareaRef.current) {
      if (toggleSetting) texareaRef.current.focus();
    }
  }, [toggleSetting]);

  useEffect(() => {
    const wordCount = getWordCount();
    setWordCount(wordLimit - wordCount);
  }, [description]);

  const getWordCount = () => {
    const words = description.split(" ");
    return words.length - 1;
  }

  return (
    <div className="col-span-3 flex flex-col justify-start gap-1 py-2 px-3">
      <div className="pl-2">
        <h3 className="3xl:text-4xl">About Me</h3>
        <p className="m-0 text-darkBlue" hidden>Your description must not exceed {wordCount} words.</p>
      </div>

      <div className="flex-grow-1 overflow-hidden mt-2">
        <textarea
          ref={texareaRef}
          className="desc-input w-full h-full rounded-lg py-1 px-2 text-xl 3xl:text-3xl overflow-y-auto break-all"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          disabled={!toggleSetting}
        ></textarea>
      </div>
    </div>
  );
};

export default AboutSection;
