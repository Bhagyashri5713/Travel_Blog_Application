import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import { getPostDetails, postUpdate } from "../api_helper/helper";
//import { addPost } from "../api_helper/helper";

const DiaryUpdate = () => {
  const [post, setPost] = useState();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageUrl: "",
    location: "",
    date: "",
  });
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    getPostDetails(id)
      .then((data) => {
        setPost(data.post);

        setInputs({
          title: data.post.title,
          description: data.post.description,
          imageUrl: data.post.image,
          location: data.post.location,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handelChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    postUpdate(inputs, id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <Box display={"flex"} flexDirection={"column"} width="100%" height="100%">
      <Box display={"flex"} margin={"auto"} padding={2}>
        <Typography
          fontWeight={"bold"}
          variant="h4"
          fontFamily={"dancing script"}
        >
          Add Your Travel Diaries
        </Typography>
        <TravelExploreOutlinedIcon
          sx={{ fontSize: "40px", paddingLeft: 1, color: "lightcoral" }}
        />
      </Box>
      {post && (
        <form onSubmit={handelSubmit}>
          <Box
            width="80%"
            padding={3}
            display={"flex"}
            margin="auto"
            flexDirection={"column"}
          >
            <FormLabel sx={{ fontFamily: "quicksand" }}>Title</FormLabel>
            <TextField
              onChange={handelChange}
              name="title"
              value={inputs.title}
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={{ fontFamily: "quicksand" }}>Description</FormLabel>
            <TextField
              onChange={handelChange}
              name="description"
              value={inputs.description}
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={{ fontFamily: "quicksand" }}>Image URL</FormLabel>
            <TextField
              onChange={handelChange}
              name="imageUrl"
              value={inputs.imageUrl}
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={{ fontFamily: "quicksand" }}>Location</FormLabel>
            <TextField
              onChange={handelChange}
              name="location"
              value={inputs.location}
              variant="standard"
              margin="normal"
            />

            <Button
              type="submit"
              color="warning"
              sx={{ width: "50%", margin: "auto", mt: 2, borderRadius: 7 }}
              variant="contained"
            >
              Post
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default DiaryUpdate;
