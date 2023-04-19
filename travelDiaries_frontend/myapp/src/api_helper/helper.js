import axios from "axios";
export const getPosts = async () => {
  const res = await axios.get("/posts");

  if (res.status !== 200) {
    return console.log("Some error Occured");
  }

  const data = res.data;
  return data;
};

export const sendAuthRequest = async (signup, data) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}/`, {
      name: data.name ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    console.log("Unable to authenticate");
  }

  const resData = await res.data;
  return resData;
};

export const addPost = async (data) => {
  const res = await axios
    .post("/posts/", {
      title: data.title,
      description: data.description,
      location: data.location,
      image: data.imageUrl,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((e) => console.log(e));

  if (res.status !== 201) {
    console.log("Error Occured");
  }

  const resData = await res.data;
  return resData;
};

export const getPostDetails = async (id) => {
  const res = await axios.get(`/post/${id}`).catch((e) => console.log(e));

  if (res.status !== 200) {
    return console.log("Unable to fetch a diary record");
  }

  const resData = await res.data;
  return resData;
};

export const postUpdate = async (data, id) => {
  const res = await axios
    .put(`/posts/${id}`, {
      title: data.title,
      description: data.description,
      location: data.location,
      image: data.imageUrl,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unable to update");
  }

  const resData = await res.data;
  return resData;
};

export const postDelete = async (id) => {
  const rest = await axios
    .delete(`/posts/${id}`)
    .catch((err) => console.log(err));

  if (rest.status !== 200) {
    return console.log("Unable to delete");
  }
  const Data = await rest.data;
  return Data;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No user found");
  }

  const resData = await res.data;
  return resData;
};
