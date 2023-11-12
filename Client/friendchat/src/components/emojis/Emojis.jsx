import React, {useState} from 'react';

import Container from "react-bootstrap/Container";
import "./emojis.css";

const Emojis = ({ display }) => {
    const handleOnDisplay = () => {
        if (display)
            return { display: "block" };
        return { display: "none" };
    }

    return (
      <div className="emojis">
        <Container className="emojis-container" style={handleOnDisplay()}>
          <div>Emojis</div>
        </Container>
      </div>
    );
};

export default Emojis;
