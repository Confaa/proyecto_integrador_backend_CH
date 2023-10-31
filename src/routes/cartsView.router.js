import { Router } from "express";
import axios from "axios";

/*
 * Manejo de las rutas de la API de views de carritos
 * */

const router = Router();

// Pide todos los carritos a la base de datos
router.get("/:cid", async (req, res) => {
  let cid = req.params.cid;
  try {
    let response = await axios.get(`http://localhost:8080/api/carts/${cid}`);
    console.log(response.data.payload.products);
    res.render("carts", {
      style: "styles.css",
      title: "Carrito",
      products: response.data.payload.products,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
