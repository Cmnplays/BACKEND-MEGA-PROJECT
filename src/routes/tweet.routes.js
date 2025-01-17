import { Router } from "express";
import {
  getAllTweets,
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet
} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createTweet).get(getAllTweets);
router.route("/user/:userId").post(getUserTweets);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router;
