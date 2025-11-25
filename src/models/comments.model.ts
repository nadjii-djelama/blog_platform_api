import mongoose from "mongoose";
const comment_schema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  content: {
    type: String,
    required: true,
    maxLength: 200,
  },
});

export default mongoose.model("Comment", comment_schema);
