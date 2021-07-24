const express = require("express");
const burgerRouter = express.Router();

burgerRouter.get("/", (req, res) => {
  const ingredientInFo = req.query.with;
  const burgers = req.burgerDB;

  if (ingredientInFo) {
    let burgerIngridents = burgers.map((burger) => burger.ingredients);
    console.log(burgerIngridents);
    res.json(burgerIngridents);
  } else {
    res.json(burgers);
  }
});

burgerRouter.post("/", (req, res) => {
  const addBurgers = req.addBurgers;
  addBurgers(req.body);
  res.json(req.body);
});

module.exports = burgerRouter;
