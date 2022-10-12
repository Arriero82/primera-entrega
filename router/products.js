const express = require("express");
const { Router } = express;
const Products = require("../container/Container");
const products = new Products("./database/file.json");
const router = Router();

router.get("/", async (req, res) => {
  prod = await products.getAll();
  try {
    res.send(prod);
  } catch (error) {
    res.send([]);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  prod = await products.getById(id);
  try {
    res.status(200).send(prod);
  } catch (error) {
    res.send([]);
  }
});

const admin = (req, res, next) => {
  if(req.query.admin=="true"){
    next()
  }else{
    res.send('no tiene permisos para acceder a la ruta')
  }
}

router.post("/", admin, async (req, res) => {
    await products.save(req.body);
    const prods = await products.getAll()
    const prod = await products.getById(prods[prods.length - 1].id)
    res.status(201).send(prod);

});

router.put("/:id", admin, async (req, res) => {
    const {id} = req.params
    await products.edit(req.body);
    const prod = await products.getById(id)
    res.status(201).send(prod);
});

router.delete("/:id", admin, async (req, res) => {
    const { id } = req.params;
    await products.deleteById(id);
    prod = await products.getAll();
    res.status(201).send(prod);
});

module.exports = router;
