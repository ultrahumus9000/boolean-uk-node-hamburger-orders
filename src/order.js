const express = require("express");
const orderRouter = express.Router();

orderRouter.get("/", (req, res) => {
  const orders = req.ordesDB;
  res.json(orders);
});

orderRouter.get("/criticals", (req, res) => {
  const orders = req.ordesDB;
  const filteredOrders = orders.filter((order) => {
    let gap = (Date.now() - order.created_at) / 60000;
    if (gap >= 10) {
      return order.status === "pending";
    } else {
      return false;
    }
  });
  if (filteredOrders.length > 0) {
    res.json(filteredOrders);
  } else {
    res.json("no pending order");
  }
});

orderRouter.post("/", (req, res) => {
  const checkBurgerStock = req.checkBurgerStock;
  let result = checkBurgerStock(req.body);
  const addOrder = req.addOrder;
  if (result === true) {
    addOrder(req.body);
    res.json(req.body);
  } else {
    res.json(result);
  }
});

orderRouter.delete("/:id", (req, res) => {
  const deleteId = Number(req.params.id);
  const deleteOrder = req.deleteOrder;
  let result = deleteOrder(deleteId);
  console.log(result);
  if (result.includes("sucecessfully")) {
    res.json("delete success");
  } else {
    res.status(400).json("bad request");
  }
});

orderRouter.patch("/:id", (req, res) => {
  const updateId = Number(req.params.id);
  const updateOrder = req.updateOrder;
  let result = updateOrder(req.body, updateId);
  res.json(result);
});

module.exports = orderRouter;
