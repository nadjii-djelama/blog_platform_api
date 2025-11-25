import mongoose from "mongoose";
const posts_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  short_desc: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 100,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Posts", posts_schema);
