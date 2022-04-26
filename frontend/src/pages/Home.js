import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Posts/Card";
import PostOnePost from "../components/Posts/PostOnePost";
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

  const fetchPosts = useCallback(async () => {
      const res = await axios.get("http://localhost:3000/api/posts/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(res.data.data);
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts]);


  return (
    <div>
      <PostOnePost refetch={fetchPosts}/>
      {posts.map((item) => (
        <Card key={item.id} props={item}/>
      ))}
      <BsFillArrowUpCircleFill className="scrollTop" onClick={scrollTop} />
    </div>
  );
};

export default Home;
