import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const Likes = (item) => {
    const [like, setLike] = useState(item.props.props.likes.length)

    const handleLike = () => {

    }

  console.log(item.props.props.likes.length);
  return (
    <div className="like">
      <p onClick={handleLike} className="icon-heart">
        <AiFillHeart />
      </p>
      <p className="likes_length">{item.props.props.likes.length}</p>
    </div>
  );
};

export default Likes;
