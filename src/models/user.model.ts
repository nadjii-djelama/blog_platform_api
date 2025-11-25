import mongoose from "mongoose";
const user_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 15,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
});

export default mongoose.model("User", user_schema);
