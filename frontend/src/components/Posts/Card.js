import axios from "axios";
import React, { useEffect, useState } from "react";
import Comments from '../CommentsAndLikes/Comments';
import Likes from '../CommentsAndLikes/Likes';
import { BiTimeFive } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Card = (item) => {
  const [deletePost, setDeletePost] = useState(false);
  const [postIsDelete, setPostIsDelete] = useState(false);
  

  const takeDate = item.props.createAt.split("T")[0];

  const takeHour = item.props.createAt.split("T")[1].split(".")[0];

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

  useEffect(() => {
    const verifyDeletePost = () => {
      const userId = localStorage.getItem("userId");
      const postId = item.props.userId;
      if (userId == postId) {
        return setDeletePost(true);
      } else {
        return setDeletePost(false);
      }
    };
    verifyDeletePost();
  }, [item.props.userId]);


  const handleDelete = async () => {
    const res = await axios.delete(
      `http://localhost:3000/api/posts/${item.props.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setPostIsDelete(true)
    const alertPostDelete = setTimeout(() => {
      setPostIsDelete(false)
    }, 3500)
  };

  return (
    <>
    {postIsDelete? (<Stack className="alert-success"  spacing={2}>
      <Alert severity="success">Le post a été supprimé avec succès</Alert>
    </Stack>) : ("")}

    <li className="card" key={item.props.id}>
      <div className="info">
        <img src={item.props.user.profile.image} alt="" />
        <div className="username_btnDelete">
          <p className="username">{item.props.user.username}</p>
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
        <h2>{item.props.title}</h2>
        <p className="content">{item.props.content}</p>
        <img src={item.props.image} alt="" />
        <div className="dateAndHour">
          <span>
            <BiTimeFive />
          </span>
          <p className="date">{formatDateInput(takeDate)}</p>
          <p className="hour">{formatHourInput(takeHour)}</p>
        </div>
      </div>

      <div className="like_and_comment">
        <Likes props={item}/>
        <Comments props={item}/>
      </div>
    </li>
    </>
  );
};

export default Card;
