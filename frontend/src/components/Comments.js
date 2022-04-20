import React, { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import ReadAndAddComment from "./ReadAndAddComment";

const Comments = (item) => {
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
      setShowComments(!showComments);
  }


  return (
    <div onClick={handleShowComments} className="comments">
      <div className="icon_length">
        <FaRegCommentAlt />
        <p className="comment_length">{item.props.props.commentaire.length}</p>
        <br/>
      </div>
      {showComments? <ReadAndAddComment props={item}/> : ""}
    </div>
  );
};

export default Comments;



