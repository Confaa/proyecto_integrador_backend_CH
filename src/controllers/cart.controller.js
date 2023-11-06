import mongoose from "mongoose";
import {
  cartService,
  productService,
  ticketService,
  userService,
} from "../dao/repositories/index.js";

export const getCarts = async (req, res) => {
  try {
    let carts = await cartService.getCarts();
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
};

export const getCartById = async (req, res) => {
  try {
    let cid = req.params.cid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let cart = await cartService.getCartById(cid);
      if (!cart) {
        throw new Error("No se encontro el carrito");
      }
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
};

export const addCart = async (req, res) => {
  try {
    let response = await cartService.addCart(req.body);
    let resp = await userService.addCartToUser(
      req.user.email,
      response.toObject()._id,
    );
    res.status(200).send({
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
};

export const addProductToCart = async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    if (
      mongoose.Types.ObjectId.isValid(pid) &&
      mongoose.Types.ObjectId.isValid(cid)
    ) {
      let response = await cartService.addProductToCart(
        cid,
        pid,
        req.body.quantity,
      );
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
};

export const deleteProductFromCart = async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await cartService.deleteProductFromCart(cid, pid);
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
};

export const updateCart = async (req, res) => {
  try {
    let cid = req.params.cid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await cartService.updateCart(cid, req.body);
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
};

export const updateProductFromCart = async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await cartService.updateProductFromCart(
        cid,
        pid,
        req.body,
      );
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
};

export const emptyCart = async (req, res) => {
  try {
    let cid = req.params.cid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await cartService.emptyCart(cid);
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
};

export const purchaseCart = async (req, res) => {
  try {
    let cart = req.cart;
    let cartInStock = cart;
    cart.products.forEach((element) => {
      if (element.product.stock < element.quantity) {
        console.log(`no hay stock del producto ${element.product.title}`);
        cartInStock.products.filter((product) => product._id !== element._id);
      } else {
        productService.updateProductById(element._id, {
          ...element,
          stock: element.product.stock - element.quantity,
        });
        cartService.deleteProductFromCart(cart._id, element._id);
      }
    });
    await ticketService.addTicket(cartInStock, req.user.email);
  } catch (error) {
    console.log(error);
  }
};
