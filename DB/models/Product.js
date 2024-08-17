import mongoose, { Types } from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      unique: [true, "title is unique"],
      minLength: [2, "min length is 2 character"],
      maxLength: [25, "max length is 25 character"],
    },
    description: {
      type: String,
      // required: [true, "description is required"],
      trim: true,
      minLength: [3, "min length is 3 character"],
      maxLength: [1500, "max length is 1500 character"],
    },
    slug: {
      type: String,
      required: [true, "name is required"],
      lowerCase: true,
    },
    mainImage: String,
    coverImages: [String],
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "min price is 0"],
    },
    priceAfterDiscount: {
      type: Number,
      min: [0, "min price is 0"],
    },
    stock: {
      type: Number,
      required: [true, "stock is required"],
      min: [0, "min stock is 0"],
    },
    sold: {
      type: Number,
      min: [0, "min sold is 0"],
      default: 0,
    },
    rateCount: {
      type: Number,
      min: [0, "min rateCount is 0"],
      default: 0,
    },
    rateAvrage: {
      type: Number,
      min: [0, "min rateAvrage is 0"],
      default: 0,
    },
    createdBy: {
      type: Types.ObjectId,
      // required: [true, 'createdBy is required'],
      // ref:'User'
    },
    updatedBy: {
      type: Types.ObjectId,
      // ref:'User'
    },
    category: {
      type: Types.ObjectId,
      // required: [true, "category is required"],
      ref: "Category",
    },
    subCategory: {
      type: Types.ObjectId,
      // required: [true, "subCategory is required"],
      ref: "SubCategory",
    },
    brand: {
      type: Types.ObjectId,
      // required: [true, "brand is required"],
      ref: "Brand",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);
productSchema.post("init", (doc) => {
  if (doc?.mainImage) {
    doc.mainImage = "http://localhost:3000/uploads/product/" + doc?.mainImage;
  }
  if (doc?.coverImages?.length) {
    doc.coverImages = doc?.coverImages.map(
      (element) => `http://localhost:3000/uploads/product/${element}`
    );
  }
});

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

productSchema.pre(/^find/, function () {
  this.populate("reviews");
});

const Product = mongoose.model("Product", productSchema);

export default Product;
