import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  // dossier,
  canisterId,
  createActor,
} from "../../../declarations/dossier";
import { AuthClient } from "@dfinity/auth-client";

function Log(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function handleDeleteClick() {
    setDisabled(true);
    // Live Network
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const result = await authenticatedCanister.deductDeleteLogFee();

    // // Local Network
    // const result = await dossier.deductDeleteLogFee();
    console.log(result);

    if (result === "! Success !") {
      props.onDelete(props.id);
    }
    setDisabled(false);
  }

  function handleReadMoreClick() {
    setExpanded(true);
  }

  function handleReadLessClick() {
    setExpanded(false);
  }

  return (
    <div className="log" style={{ backgroundColor: props.backgroundColour }}>
      <h1>{props.title}</h1>

      {props.content.length > 300 ? (
        isExpanded ? (
          <p>
            {props.content}{" "}
            <span className="readLessLink" onClick={handleReadLessClick}>
              Read Less
            </span>
          </p>
        ) : (
          <p>
            {props.content.substring(0, 300)}
            <span className="readMoreLink" onClick={handleReadMoreClick}>
              ...Read More
            </span>
          </p>
        )
      ) : (
        <p>{props.content}</p>
      )}

      <div className="date-time">
        <p className="time" id="time">
          {props.time}
        </p>
        <p className="time" id="date">
          {props.date}
        </p>
      </div>

      <button
        disabled={disabled}
        onClick={handleDeleteClick}
        style={{ backgroundColor: props.backgroundColour }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Log;
