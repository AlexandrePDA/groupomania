import axios from "axios";
import React, { useEffect, useState } from "react";
import Comments from "../CommentsAndLikes/Comments";
import { BiTimeFive } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";

const Card = ({
  createAt,
  userId,
  id,
  refetch,
  commentaire,
  user,
  title,
  image,
  content,
  ...props
}) => {
  const [deletePost, setDeletePost] = useState(false);
  const [postIsDelete, setPostIsDelete] = useState(false);

  // ********* gestion des dates/heures ************
  const takeDate = createAt.split("T")[0];

  const takeHour = createAt.split("T")[1].split(".")[0];

  const formatHourInput = (takeHour) => {
    const elem = takeHour.split(":");
    const hour = elem[0];
    const min = elem[1];
    const hourOk = hour + "h" + min;
    return hourOk;
  };

  const formatDateInput = (takeDate) => {
    const elem = takeDate.split("-");
    const year = elem[0];
    const month = elem[1];
    const day = elem[2];

    const dateOk = day + "/" + month + "/" + year;
    return dateOk;
  };

  

   // ********* verifie si user peut supp son post ************
  useEffect(() => {
    const verifyDeletePost = () => {
      const localId = localStorage.getItem("userId");
      const postId = userId;
      if (Number(localId) === postId) {
        return setDeletePost(true);
      } else {
        return setDeletePost(false);
      }
    };
    verifyDeletePost();
  }, [userId]);

   // ********* backend ***********
      // delete post
  const handleDelete = async () => {
    const res = await axios.delete(
      `http://localhost:3000/api/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    refetch();
    setPostIsDelete(true);
  };

 

  return (
    <>
      <li className="card" key={id}>
        <div className="info">
          <img src={user.profile.image} alt="" />
          <div className="username_btnDelete">
            <p className="username">{user.username}</p>
            {deletePost ? (
              <p className="delete-button" onClick={handleDelete}>
                <BsFillTrashFill />
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="post_content">
          <h2>{title}</h2>
          <p className="content">{content}</p>
          <img src={image} alt="" />
          <div className="dateAndHour">
            <span>
              <BiTimeFive />
            </span>
            <p className="date">{formatDateInput(takeDate)}</p>
            <p className="hour">{formatHourInput(takeHour)}</p>
          </div>
        </div>
        <Comments commentaires={commentaire} id={id} userId={userId}/>
      </li>
    </>
  );
};

export default Card;
// ***************