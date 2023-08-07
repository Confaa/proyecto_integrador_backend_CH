import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();

let c1 = new CartManager();

router.get("/", async (req, res) => {
  res.send("carrito");
});
router.get("/:cid", async (req, res) => {
  let productsToCart = await c1.getCartById(parseInt(req.params.cid));
  res.send(productsToCart);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  await c1.addCart(req.body.products || []);
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    await c1.addProductToCart(
      parseInt(req.params.cid),
      parseInt(req.params.pid),
    );
  } catch (error) {
    console.log(error);
  }
});

export default router;
