import React, { useState, useEffect } from "react";
import Post from "../Post/Post";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PostForm from "../Post/PostForm";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts=()=>{
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }
  useEffect(() => {
    refreshPosts()
  }, []);

  if (error) {
    return <div>Error!</div>;
  } else if (!isLoaded) {
    return <div>Loading!</div>;
  } else {
    return (
      <div
        
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          background: "#f0f5ff",
        }}
      >
        {localStorage.getItem("currentUser") == null ? "" : <PostForm refreshPosts={refreshPosts}/>}
        
        {postList.map((post) => (
          <Post  params={post} />
        ))}
      </div>
    );
  }
}

export default Home;
