import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  dossier,
  // canisterId,
  // createActor,
} from "../../../declarations/dossier";
// import { AuthClient } from "@dfinity/auth-client";

function Log(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [logDeletionFee, setLogDeletionFee] = useState(0);

  async function getLogDeletionFee() {
    const fee = await dossier.getDeleteLogFee();
    setLogDeletionFee(parseInt(fee.toLocaleString()));
  }
  getLogDeletionFee();

  async function transact() {
    // // Live Network
    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();

    // const authenticatedCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity,
    //   },
    // });

    // const result = await authenticatedCanister.deductDeletionFee();

    //Local Network
    const result = await dossier.deductDeletionFee();

    console.log(result);
  }

  function handleDeleteClick() {
    transact();
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
        disabled={props.userFunds > logDeletionFee ? false : true}
        onClick={handleDeleteClick}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Log;
