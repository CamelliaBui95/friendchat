import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions, useStoreRehydrated } from "easy-peasy";
import "./emojis.css";

const Emojis = ({ display, onEmojiClick }) => {
  const emojis = useStoreState((state) => state.emojis);
  const getEmoji = useStoreState((state) => state.getEmoji);
  const numRows = emojis.length / 10;

  const handleOnDisplay = () => {
    if (display) return { display: "block" };
    return { display: "none" };
  };

  const getRows = () => {
    let rows = [];
    let numCols = numRows;

    for (let i = 0; i < numRows; i++)
      rows.push(
        <Row xs="auto">{getColumn(i * numRows, numCols).map((col) => col)}</Row>
      );

    return rows;
  };

  const getColumn = (start, numCols) => {
    let cols = [];
    let index = 0;

    while (index < numCols) {
      const id = getEmoji(start + index).id;

      cols.push(
        <Col style={{ width: "30px", height: "30px" }}>
          {
            <span
              className="emoji-btn"
              onClick={(e) => {
                e.preventDefault();
                onEmojiClick(id - 1);
              }}
            >
              {getEmoji(id - 1).content}
            </span>
          }
        </Col>
      );
      index++;
    }

    return cols;
  };

  return (
    <div className="emojis">
      <Container className="emojis-container" style={handleOnDisplay()}>
        {getRows().map((row) => row)}
      </Container>
    </div>
  );
};

export default Emojis;
