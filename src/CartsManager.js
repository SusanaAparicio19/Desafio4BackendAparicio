import { promises as fs } from 'fs';

export class CartsManager {
  static #lastId = 0;

  constructor() {
    this.carts = [];
  }

  async loadCartsFromFile() {
    try {
      const data = await fs.readFileSync('carts.json', 'utf8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  async saveCartsToFile() {
    //Es writeFile
    await fs.writeFile('carts.json', JSON.stringify(this.carts), 'utf8');
  }

  static #generarNewCartId() {
    return ++CartsManager.#lastId;
  }
  createCart() {
    const idCart = CartsManager.#generarNewCartId();
    const newCart = {
      idCart,
      products: [],
    };

    this.carts.push(newCart);
    this.saveCartsToFile();

    return newCart;
  }

  async getCartById(cartId) {
    const data = await fs.readFile('carts.json', 'utf8');
    const carts = JSON.parse(data);
    console.log(carts);
    const cartExist = carts.find((cart) => cart.idCart == cartId);
    return cartExist;
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await this.getCartById(cartId);

    const existingProduct = cart.products.find(
      (product) => product.id == productId
    );

    if (existingProduct) {
      // Si el producto ya existe en el carrito, actualiza la cantidad.
      existingProduct.quantity += quantity;
    } else {
      // Si el producto no existe en el carrito, agrégalo como un nuevo elemento.
      cart.products.push({ id: productId, quantity });
    }

    // Guarda el carrito completo en el archivo JSON sin sobrescribirlo.
    await fs.writeFile('carts.json', JSON.stringify([cart]), 'utf8');

    return cart;
  }

  getProductsFromCart(cartId) {
    const cart = this.getCartById(cartId);
    return cart ? cart.products : [];
  }
}
