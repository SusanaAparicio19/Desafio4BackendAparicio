import express from 'express';
import { ProductManager } from './ProductManager.js';
import { CartsManager } from './CartsManager.js';
import { PORT, PRODUCTS_JASON, CARTS_JASON } from './config.js';
import { productsRouter } from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';

import { Server as IOServer } from 'socket.io';
import {webRouter} from './routes/webRouter.js'
import { engine } from 'express-handlebars';

export const ProdMan = new ProductManager({ path: './db/products.json' });
export const cartsManager = new CartsManager();
const app = express();

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use('/static', express.static('./static'))
app.use('/', webRouter)

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use(express.urlencoded({ extended: true }));

/*app.get('/', (request, response) => {
  response.sendFile('index.html', { root: 'views' });
});*/

const server = app.listen(PORT, async () => {
  console.log(`Conectado al puerto ${PORT}`);
});

const ioServer = new IOServer(server)

io.on('connection', (socket) => {
  console.log("Nuevo Cliente Conectado"),
  socket.on ('disconnect', () => {
    console.log("Cliente Desconectado");
  })

  socket.on ('newProduct', () => {
    io.emit('actualizarListaDeProductos');
});
})
document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();
  socket.emit('newProduct');
});