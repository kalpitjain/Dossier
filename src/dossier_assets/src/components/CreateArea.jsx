import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import {
  dossier,
  canisterId,
  createActor,
} from "../../../declarations/dossier";
import { AuthClient } from "@dfinity/auth-client";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [logCreationFee, setLogCreationFee] = useState("");

  const time = new Date().toLocaleTimeString();
  const date = new Date().toISOString().split("T")[0];
  const [log, setLog] = useState({
    title: "",
    content: "",
    time: time,
    date: date,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toISOString().split("T")[0];

    setLog((prevLog) => {
      return {
        ...prevLog,
        time: currentTime,
        date: currentDate,
        [name]: value,
      };
    });
  }

  async function getLogCreationFee() {
    const fee = await dossier.getCreateLogFee();
    setLogCreationFee(parseInt(fee.toLocaleString()));
  }
  getLogCreationFee();

  async function transact() {
    // Live Network
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.deductCreationFee();

    // //Local Network
    // const result = await dossier.deductCreationFee();
    console.log(result);
  }

  function submitLog(event) {
    transact();
    props.onAdd(log);
    setLog({
      title: "",
      content: "",
      time: time,
      date: date,
    });
    setExpanded(false);
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-log">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={log.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          value={log.content}
          placeholder={
            props.userFunds > logCreationFee
              ? " Make a Log..."
              : "! Insufficient Funds !"
          }
          rows={isExpanded ? 3 : 1}
          disabled={props.userFunds > logCreationFee ? false : true}
          onClick={expand}
          onChange={handleChange}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitLog}>
            <CreateIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
