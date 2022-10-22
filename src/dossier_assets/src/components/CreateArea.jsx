import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
// import { dossier } from "../../../declarations/dossier";
// import { Principal } from "@dfinity/principal";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

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

  // async function transact() {
  //   // const result = await dossier.transfer(Principal, 1);
  //   console.log(Principal);
  //   // console.log(result);
  // }

  function submitLog(event) {
    // transact();
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
            props.userFunds > 5 ? "Create a log..." : "! Insufficient Funds !"
          }
          rows={isExpanded ? 3 : 1}
          disabled={props.userFunds > 5 ? false : true}
          onClick={expand}
          onChange={handleChange}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitLog}>
            <CreateIcon />
          </Fab>
        </Zoom>
        <p>Create a Log for 5 DOSS</p>
      </form>
    </div>
  );
}

export default CreateArea;
