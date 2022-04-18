import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '../components/Card';
import PostOnePost from "../components/PostOnePost"
import ScrollToTop from "../components/ScrollToTop";

const Home = () => {
  const [posts, setPosts] = useState([]);
  // const [connect, setConnect] = useState(false);

//   verfication si connecté ou non
  // const getLocalStorage = localStorage.getItem("token")
  // console.log(getLocalStorage);

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

  //   const haveToken = () => {
  //     const token = localStorage.getItem('token');
  //     if(token != null) {
  //        return setConnect(true)
  //     } else {
  //         return setConnect(false)
  //     }
  // }
  // console.log(connect);
  // haveToken()
  }, []);
  

  return (
  <div>

          <PostOnePost/>
          {posts.map((item) => 
            <Card key={item.id} props={item} />
            )}
            <ScrollToTop/>
        
      
  </div>

)};

export default Home;
