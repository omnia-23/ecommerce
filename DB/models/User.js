import mongoose from "mongoose";
import roles from "../../src/types/roles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name is unique"],
      minLength: [2, "min length is 2 character"],
      maxLength: [25, "max length is 25 character"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    passwordChanged: {
      type: Date,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.user,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    address: [
      {
        city: String,
        street: String,
      },
    ],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
