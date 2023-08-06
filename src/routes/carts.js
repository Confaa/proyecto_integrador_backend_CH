import { Router } from "express";

const router = Router();

let c1 = new CartManager();

router.get("/", async (req, res) => {
    console.log("carrito");
}  );
router.get("/:cid", async (req, res) => {}  );

router.post("/", async (req, res) => {
c1.addProducts(req.body.products);

}  );

router.post("/:cid/product/:pid", async (req, res) => {}  );