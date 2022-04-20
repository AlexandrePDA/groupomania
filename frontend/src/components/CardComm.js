import React from "react";

const CardComm = (comm) => {
  console.log(comm);
  return (
    <ul>
      <li>
          {comm.props.comment}</li>
    </ul>
  );
};

export default CardComm;
