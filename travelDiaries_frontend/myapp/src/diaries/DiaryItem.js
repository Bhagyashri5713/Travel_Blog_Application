import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  Box,
  CardActions,
  Snackbar,
  Alert,
} from "@mui/material";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { postDelete } from "../api_helper/helper";

const DiaryItem = ({
  title,
  description,
  image,
  location,
  date,
  id,
  user,
  name,
}) => {
  const [open, setOpen] = useState(false);
  const isLoggedInUser = () => {
    if (localStorage.getItem("userId") === user) {
      return true;
    }
    return false;
  };

  const handelDelete = () => {
    postDelete(id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    setOpen(true);
  };
  return (
    <Card
      sx={{
        width: "60%",
        height: "70vh",
        margin: 2,
        padding: 1,
        display: "flex",
        flexDirection: "column",
        boxShadow: "5px 5px 10px #ccc",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {<EditLocationAltIcon />}
          </IconButton>
        }
        title={location}
        header={location}
        subheader={date}
      />
      <img height="150" src={image} alt={title} />
      <CardContent>
        <Typography paddingBottom={1} variant="h6" color="text.secondary">
          {title}
        </Typography>
        <hr />
        <Box paddingTop={1} display={"flex"}>
          <Typography width="auto" fontWeight={"bold"} variant="caption">
            {name} :
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
      {isLoggedInUser() && (
        <CardActions sx={{ marginLeft: "auto" }}>
          <IconButton LinkComponent={Link} to={`/post/${id}`} color="warning">
            <ModeEditOutlineIcon />
          </IconButton>
          <IconButton onClick={handelDelete} color="error">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default DiaryItem;
