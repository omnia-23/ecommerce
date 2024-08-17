import mongoose, { Types } from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      unique: [true, "name is unique"],
      minLength: [2, "min length is 2 character"],
      maxLength: [25, "max length is 25 character"],
    },
    slug: {
      type: String,
      required: [true, "name is required"],
      lowerCase: true,
      trim: true,
    },
    image: String,
    createdBy: {
      type: Types.ObjectId,
      // required: [true, 'createdBy is required'],
      // ref:'User'
    },
    updatedBy: {
      type: Types.ObjectId,
      // ref:'User'
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
categorySchema.post("init", (doc) => {
  if (doc.image) {
    doc.image = "http://localhost:3000/uploads/category/" + doc.image;
  }
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
