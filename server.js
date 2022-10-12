    const express = require('express')
const products = require('./router/products')
const cart = require('./router/carrito')                    

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public')) 

app.use('/api/productos/', products)
app.use('/api/carrito/', cart)

app.get('*', (req, res) => {
    res.json({res: 'no se puede acceder a esta ruta'})
})

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`listening on port ${server.address().port}`);
})