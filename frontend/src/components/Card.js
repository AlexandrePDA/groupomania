import React from "react";
import { BiTimeFive } from "react-icons/bi"

const Card = (item) => {
  
  const takeDate = item.props.createAt.split("T")[0];

  const takeHour = item.props.createAt.split("T")[1].split(".")[0];

  const formatHourInput = (takeHour) => {
    const elem = takeHour.split(":");
    const hour = elem[0];
    const min = elem[1];
    const hourOk = hour + "h" + min;
    return hourOk;
  }

  const formatDateInput = (takeDate) => {
    const elem = takeDate.split("-");
    const year = elem[0];
    const month = elem[1];
    const day = elem[2];

    const dateOk = day + "/" + month + "/" + year;
    return dateOk;
  };

console.log(item.props);
  return (
    <li className="card" key={item.props.id}>
      <div className="info">
        <img src={item.props.user.profile.image} alt="" />
        <p className="username">{item.props.user.username}</p>
      </div>
      <div className="post_content">
        <h2>{item.props.title}</h2>
        <p className="content">{item.props.content}</p>
        <img src={item.props.image} alt="" />
      </div>
      <div className="dateAndHour">
        <span><BiTimeFive/></span>
        <p className="date">{formatDateInput(takeDate)}</p>
        <p className="hour">{formatHourInput(takeHour)}</p>
      </div>

      <div className="like_and_comment"></div>
    </li>
  );
};

export default Card;
