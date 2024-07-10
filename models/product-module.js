import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  //userID
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User-data",
  },
  //shopID
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shop",
  },
  createdDate: {
    type: Date,
  },
  updatedDate: {
    type: Date,
  },
});

export const productData = mongoose.model("products", productSchema);
