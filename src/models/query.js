import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: true,
      index: true,
    },
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
      minlength: [3, "Question must be at least 3 characters"],
      maxlength: [1000, "Question cannot exceed 1000 characters"],
    },
  },
  { timestamps: true }
);

const Query = mongoose.model("Query", querySchema);
export default Query;
