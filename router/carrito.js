const express = require("express");
const { Router } = express;
const Cart = require("../container/cartContainer");
const carts = new Cart("./database/cart.json");
const Products = require("../container/Container");
const products = new Products("./database/file.json");
const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
  const cart = await carts.save(req.body);
  const cart2 = await carts.getById(cart.length);
  const { id } = cart2[0];
  res.status(201).send(`carrito guardado 
  ID# ${id}`);
});

cartRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await carts.deleteById(id);
  const cart = await carts.getAll();
  res.status(201).send(cart);
});

cartRouter.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const cart = await carts.getById(id);
  try {
    res.status(200).send(cart[0].productos);
  } catch (error) {
    res.send([]);
  }
});

cartRouter.post("/:id/productos/", async (req, res) => {
  const { id } = req.params;
  const id_prod = req.query
  const prod = await products.getById(id_prod.id)
  const cart = await carts.getById(id);
  cart[0].productos.push(prod[0])
  await carts.edit(cart[0])
  res.status(201).send(cart[0])
}); 

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
    const { id, id_prod } = req.params;  
    const cart = await carts.getById(id);
    let prodId = cart[0].productos.findIndex(productos => productos.id == id_prod);
    cart[0].productos.splice(prodId,1)   
    await carts.edit(cart[0])
    res.status(201).send(cart[0])
})

cartRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const cart = await carts.getById(id);
    try {
        res.send(cart);
    } catch (error) {
        res.send([]);
    }
});

/* cartRouter.get("/", async (req, res) => {
    const cart = await carts.getAll();
    try {
      res.send(cart);
    } catch (error) {
      res.send([]);
    }
  });
 */

module.exports = cartRouter;
