import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscriptions.model.js";
import { Like } from "../models/like.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  const channelId = req.user._id;
  const videosDetails = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(channelId)
      }
    }
  ]);
  console.log(videosDetails);
  const subscribers = await Subscription.find({
    channel: channelId
    //i will aggregate all subscribers here in some time with limit of 10 or 20
  });
  console.log(subscribers);

  // const totalLikes = await Like.aggregate([{ $match: {} }]);
  // console.log(totalLikes);

  return res
    .status(200)
    .json(
      new apiResponse(200, channelStats, "Successfully sent channel statistics")
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  const channelId = req.params.channelId;
  if (!isValidObjectId(channelId)) {
    throw new apiError(400, "Invalid channel id");
  }
  const videos = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.mongo.ObjectId(channelId)
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              email: 1,
              avatar: 1
            }
          }
        ]
      }
    },
    {
      $unwind: "$owner"
    },
    {
      $project: {
        thumbnail: 1,
        title: 1,
        description: 1,
        duration: 1,
        views: 1,
        owner: 1
      }
    }
  ]);
  if (!videos) {
    throw new apiError(400, "No videos uploaded yet");
  }
  return res
    .status(200)
    .json(new apiResponse(200, videos, "Successfully sent videos"));
});

export { getChannelStats, getChannelVideos };
