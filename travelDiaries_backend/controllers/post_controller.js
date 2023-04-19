import mongoose from "mongoose";
import Post from "../model/Post";
import User from "../model/User";

export const getPosts = async (req, res) => {
  let posts;
  try {
    posts = await Post.find().populate("user");
  } catch (err) {
    return console.log(err);
  }

  if (!posts) {
    return res.status(500).json({ message: "Unexpected Error" });
  }

  return res.status(200).json({ posts });
};

export const addPost = async (req, res) => {
  const { title, description, location, date, image, user } = req.body;

  let existinguser;
  try {
    existinguser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existinguser) {
    return res.status(404).json({ message: "Not able to found User" });
  }

  let post;
  try {
    post = new Post({
      title,
      description,
      image,
      location,
      date: new Date(`${date}`),
      user,
    });

    const session = await mongoose.startSession();

    session.startTransaction();
    existinguser.posts.push(post);
    await existinguser.save({ session });

    post = await post.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(500).json({ message: "Unexpected error" });
  }

  return res.status(201).json({ post });
};

export const getPostsById = async (req, res) => {
  const id = req.params.id;

  let post;

  try {
    post = await Post.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(404).json({ message: "No posts found" });
  }

  return res.status(200).json({ post });
};

export const updatePosts = async (req, res) => {
  const id = req.params.id;
  const { title, description, image, location } = req.body;
  let post;

  try {
    post = Post.findByIdAndUpdate(id, {
      title,
      description,
      image,

      location,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(500).json({ message: "Unable to update post" });
  }

  return res.status(200).json({ message: "Updated successfully" });
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  let post;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    post = await Post.findById(id).populate("user");
    post.user.posts.pull(post);
    await post.user.save({ session });
    post = await Post.findByIdAndRemove(id);
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(500).json({ message: "Unable to delete the post" });
  }
  return res.status(200).json({ message: "Deleted Successfully" });
};
