import React from "react";
import { BsFillTrashFill } from "react-icons/bs";

const CardComm = (comm) => {
  const whoPostComment = localStorage.getItem("username");

  // console.log(whoPostComment);

  console.log(comm);
  return (
    <ul>
      <li className="commentaires">
        <div className="info_user">
          <p className="user_comment">
            {whoPostComment ? whoPostComment : "Utilisateur"}
          </p>
          {/* Condition ternaire à inserer pour que seul celui qu'a posté post puisse le supp */}
          <p className="trash-comm">
            <BsFillTrashFill />
          </p>
        </div>
        {comm.props.comment}
      </li>
    </ul>
  );
};

export default CardComm;
