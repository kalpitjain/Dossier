import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Log(props) {
  const [isExpanded, setExpanded] = useState(false);

  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  function handleReadMoreClick() {
    setExpanded(true);
  }

  function handleReadLessClick() {
    setExpanded(false);
  }

  return (
    <div className="log">
      <h1>{props.title}</h1>

      {props.content.length > 100 ? (
        isExpanded ? (
          <p>
            {props.content}{" "}
            <span className="readLessLink" onClick={handleReadLessClick}>
              Read Less
            </span>
          </p>
        ) : (
          <p>
            {props.content.substring(0, 100)}
            <span className="readMoreLink" onClick={handleReadMoreClick}>
              ...Read More
            </span>
          </p>
        )
      ) : (
        <p>{props.content}</p>
      )}

      <p className="time" id="time">
        {props.time}
      </p>
      <p className="time" id="date">
        {props.date}
      </p>

      <button
        disabled={props.userFunds > 500 ? false : true}
        onClick={handleDeleteClick}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Log;
