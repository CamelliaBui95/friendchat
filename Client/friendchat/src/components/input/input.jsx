import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./input.css";
import { useState, useEffect } from "react";
import { getFile, fileToDataUrl } from "../../utils/utils";
import Emojis from "../emojis/Emojis";

const Input = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ payload: { type: "text", data: value } });
    setValue("");
  };

  const handleFile = async () => {
    const file = await getFile();
    setFile(file);
  };

  useEffect(() => {
    console.log("in here")
    if (file)
      fileToDataUrl(file).then(dataUrl => {
        if (/^image/.test(file.type)) 
          onSubmit({ payload: { type: file.type, data: dataUrl } })
        setFile(null);
      }   
      );
  }, [file]);

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Emojis></Emojis>
      <InputGroup className="input">
        <Form.Control
          className="shadow-none"
          aria-label="message"
          aria-describedby="basic-addon2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={handleFile}
        >
          Choose file
        </Button>
        <Button variant="outline-secondary" id="button-addon2" >
          Emojis
        </Button>
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Input;
