import { Router } from 'express';
//El import es saliendo de la carpeta Routes! Por lo tanto se agrega ..
import { CartsManager } from '../CartsManager.js';

const cartsRouter = Router();

const cartsManager = new CartsManager();

cartsManager.loadCartsFromFile();

cartsRouter.post('/', (req, res) => {
  const newCart = cartsManager.createCart();
  res.json(newCart);
});

cartsRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const products = cartsManager.getProductsFromCart(cartId);
  res.json(products);
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = parseInt(req.body.quantity);

  const updatedCart = await cartsManager.addProductToCart(
    cartId,
    productId,
    quantity
  );
  res.json(updatedCart);
});

//Tiene que haber un solo export de cartsRouter
export default cartsRouter;



