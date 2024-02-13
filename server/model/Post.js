const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema) || mongoose.model.Posts;
