import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    product_name: { type: String, required: true },
    desc: { type: String, required: true },
    mrp: { type: Number, required: true },
    salesPrice: { type: Number, required: true },
    colors: [{ type: String }],
    ratings: { type: Number, default: 0, min: 0, max: 5 },
    product_type: {
      type: String,
      enum: ["Mens", "Womans", "Boy", "Girl", "Baby"],
      required: true,
    },
    categories: [
      {
        type: String,
        num: ["Shirts", "T-shirts", "Jeans", "Dresses", "Shoes"],
        required: true,
      },
    ],
    brands: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;