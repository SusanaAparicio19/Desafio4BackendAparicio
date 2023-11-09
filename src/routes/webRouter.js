import {Router} from 'express'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
    res.render('index.handlebars', {});
});

webRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

webRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts'); 
  });