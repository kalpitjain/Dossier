import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

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

  function submitLog(event) {
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
          onClick={expand}
          onChange={handleChange}
          value={log.content}
          placeholder="Take a log..."
          rows={isExpanded ? 3 : 1}
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
