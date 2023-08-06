import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const router = Router();

let p1 = new ProductManager();

router.get('/', async (req, res) => {
  let productos = await p1.sendProducts();

  if (req.query.limit) {
    productos = productos.slice(0, req.query.limit);
  }
  res.send(productos);
});

router.get('/:pid', async (req, res) => {

  let producto = p1.getProductById(parseInt(req.params.pid));

  res.send(producto);
});

router.post('/', async (req, res) => {

  try {
    await p1.addProduct(req.body.title, req.body.description, req.body.price, req.body.thumbnail ?? "Sin imagen", req.body.code, req.body.stock);
  } catch (error) {
    console.log(error);
  }
  res.send('Producto agregado con exito');
});

router.put('/:pid', async (req, res) => {
});
export default router;