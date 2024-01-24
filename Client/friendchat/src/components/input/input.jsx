import "./input.css";
import { useState, useEffect, useRef } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { getFile, fileToDataUrl } from "../../utils/utils";
import Emojis from "../emojis/Emojis";

const Input = ({ onSubmit }) => {
  const textRef = useRef(null);
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [emojisDisplay, setEmojisDisplay] = useState(false);
  const getEmoji = useStoreState((state) => state.getEmoji);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ payload: { type: "text", data: value } });
    setValue("");
  };

  const handleFile = async () => {
    const file = await getFile();
    setFile(file);
  };

  const handleClickEmoji = (id) => {
    let newVal = value;
    newVal += getEmoji(id).content;
    setValue(newVal);
    textRef.current.focus();
  };

  useEffect(() => {
    if (file)
      fileToDataUrl(file).then((dataUrl) => {
        if (/^image/.test(file.type))
          onSubmit({ payload: { type: file.type, data: dataUrl } });
        setFile(null);
      });
  }, [file]);

  return (
    <><div
      onSubmit={(e) => handleSubmit(e)}
      className="h-[10%] w-full bg-white rounded-b-xl p-1 flex flex-row justify-center items-center"
    >
      <Emojis display={emojisDisplay} onEmojiClick={handleClickEmoji}></Emojis>
      <form className="input flex flex-row flex-grow-1 justify-start items-center h-full">
        <input
          className="focus:outline-none flex-grow-1 h-[80%]"
          aria-label="message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={textRef}
        />
      </form>
      <button
          id="choose-file-btn"
          onClick={handleFile}
          className="rounded-xl p-3 hover:bg-slate-300"
        >
          <i
            className="fa-solid fa-image text-3xl"
            style={{ color: "#1d4072" }}
          ></i>
        </button>
        <button
          id="emojis-btn"
          onClick={() => setEmojisDisplay(!emojisDisplay)}
          className="rounded-xl p-3 hover:bg-slate-300"
        >
          <i
            className="fa-regular fa-face-smile text-3xl"
            style={{ color: "#1d4072" }}
          ></i>
        </button>
        <button
          id="submit-btn"
          className="rounded-xl p-3 hover:bg-slate-300"
          onClick={(e) => handleSubmit(e)}
        >
          <i
            className="fa-regular fa-paper-plane text-3xl"
            style={{ color: "#1d4072" }}
          ></i>
        </button>
    </div>
    
    </>
  );
};

export default Input;
