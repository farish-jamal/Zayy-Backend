const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    is_show: {
      type: Boolean,
      default: true,
    },
    sub_categories: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
