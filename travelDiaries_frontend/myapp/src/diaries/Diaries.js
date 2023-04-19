import React, { useEffect, useState } from "react";
import DiaryItem from "./DiaryItem";
import { Box } from "@mui/material";
import { getPosts } from "../api_helper/helper";

const Diaries = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data?.posts))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      padding={3}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {posts &&
        posts.map((item, index) => (
          <DiaryItem
            date={new Date(`${item.date}`).toLocaleDateString()}
            description={item.description}
            image={item.image}
            id={item._id}
            location={item.location}
            title={item.title}
            key={index}
            //user={item.user._id}
            name={item.user.name}
          />
        ))}
    </Box>
  );
};

export default Diaries;
