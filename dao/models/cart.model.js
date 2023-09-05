import mongoose from "mongoose";
import { productSchema } from "./product.model.js";

const cartCollection = "carts";

const itemCartSchema = new mongoose.Schema({
  product: {
    type: [productSchema],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  products: {
    type: [itemCartSchema],
    required: true,
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
