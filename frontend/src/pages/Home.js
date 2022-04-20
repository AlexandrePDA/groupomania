import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import PostOnePost from "../components/PostOnePost";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // boutton remonte page
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3000/api/posts/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(res.data.data);
    };
    fetchPosts();

  }, []);

  // ********** SI JE MET POST ENTRE CROCHET REQUETE INFINIS MAIS TOUT S'ACTUALISE EN DIRECT
 

  return (
    <div>
      <PostOnePost />
      {posts.map((item) => (
        <Card key={item.id} props={item} />
      ))}
      <BsFillArrowUpCircleFill className="scrollTop" onClick={scrollTop} />
    </div>
  );
};

export default Home;
