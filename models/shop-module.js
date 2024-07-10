import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  shopImage: {
    type: String,
    required: true,
  },
  //userId
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User-data",
  },
  createdDate: {
    type: Date,
  },
  updatedDate: {
    type: Date,
  },
});

export const shopData = mongoose.model("shop", ShopSchema);
