import { Router } from "express";
import mongoose from "mongoose";
const router = Router();
import CartDBService from "../../dao/services/db/CartDBService.js";

const CartService = new CartDBService();
router.get("/", async (req, res) => {
  try {
    let carts = await CartService.getCarts();
    res.status(200).send({
      status: "success",
      payload: carts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "error",
      message: error.message,
      payload: [],
    });
  }
  res.send("carrito");
});
router.get("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let cart = await CartService.getCartById(cid);
      res.status(200).send({
        status: "success",
        payload: cart,
      });
    } else {
      throw new Error("Id invalido");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "error",
      message: error.message,
      payload: [],
    });
  }
});

router.post("/", async (req, res) => {
  try {
    let response = await CartService.addCart(req.body);
    res.send({
      status: "success",
      payload: response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "error",
      message: error.message,
      payload: [],
    });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let cart = await CartService.getCartById(cid);
    if (!mongoose.Types.ObjectId.isValid(cid) || !cart) {
      let resp = await CartService.addCart([]);
      cid = resp._id;
    }
    if (mongoose.Types.ObjectId.isValid(pid)) {
      let response = await CartService.addProductToCart(cid, pid);
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      throw new Error("Id invalido");
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
