import { Router } from "express";
import {
  getPosts,
  addPost,
  getPostsById,
  updatePosts,
  deletePost,
} from "../controllers/post_controller";

const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.get("/:id", getPostsById);
postRouter.post("/", addPost);
postRouter.put("/:id", updatePosts);
postRouter.delete("/:id", deletePost);

export default postRouter;
