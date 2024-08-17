import mongoose, { Types } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
