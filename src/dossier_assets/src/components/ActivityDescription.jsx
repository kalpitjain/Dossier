import React from "react";

function ActivityDescription(props) {
  return (
    <div className="blocks activityDescription container-fluid row">
      <h5 className="col">{props.activity}</h5>
      <h5 className="col">{props.amount}</h5>
      <h5 className="col">{props.time}</h5>
      <h5 className="col">{props.date}</h5>
    </div>
  );
}

export default ActivityDescription;
