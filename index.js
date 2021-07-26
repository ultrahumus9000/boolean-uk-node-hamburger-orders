const e = require("express");
const express = require("express");
const morgan = require("morgan");
const burgerRouter = require("./src/hamburger");
const orderRouter = require("./src/order");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

let burgerDB = [
  {
    id: 8,
    name: "Vegetarian Burger",
    restaurant: "Indian Burgers",
    web: "https://www.cookwithmanali.com/vegetarian-burger-indian-style/",
    description:
      "With summer around the corner, I had to share a vegetarian burger recipe with you guys. Actually I plan to share more in the next month but I thought I will start with this Indian style Vegetarian Burger aka Masala Burger!",
    ingredients: [
      "american cheese",
      "burger sauce",
      "french mustard",
      "pickes",
      "onion",
      "Veggies",
    ],
    quantity: 5,
  },
  {
    id: 9,
    name: "Fat Santa",
    restaurant: "Sky City Hamilton",
    web: "https://skycityhamilton.co.nz/eat-drink/eat-burger/",
    description: "A Christmas themed burger",
    ingredients: [
      "chicken thigh",
      "champagne ham",
      "sage and onion stuffing",
      "gravy mash",
      "lettuce",
      "tomato",
      "cranberry sauce",
    ],
    quantity: 5,
  },
  {
    id: 10,
    name: "Blondie",
    restaurant: "Yankys",
    web: "http://yankyslambton.co.za/menu/",
    description: "Delicious steak burger",
    ingredients: [
      "steak",
      "BBQ sauce",
      "bacon",
      "egg",
      "cheese",
      "lettuce",
      "tomato",
      "onion",
      "gerkins",
    ],
    quantity: 5,
  },
  {
    id: 11,
    name: "Monster Burger",
    restaurant: "Yankys",
    web: "http://yankyslambton.co.za/menu/",
    description: "Massive meaty burger - the size of a dinner plate",
    ingredients: [
      "250g patty",
      "bacon",
      "cheese",
      "2 eggs",
      "steak",
      "BBQ sauce",
      "lettuce",
      "tomato",
      "onion",
      "gerkins",
    ],
    quantity: 5,
  },
];

let ordesDB = [
  {
    order_id: 1,
    items: [
      { hamburger_id: 9, quantity: 2 },
      { hamburger_id: 10, quantity: 1 },
    ],
    status: "pending",
    created_at: 1627092929057,
  },
];

const checkBurgerStock = (newOrder) => {
  let conditionCheck = newOrder.map((order) => {
    let targetBurger = burgerDB.find((burger) => {
      return burger.id === order.hamburger_id;
    });
    if (targetBurger === undefined) {
      return "burger ID is wrong";
    } else if (order.quantity > targetBurger.quantity) {
      return `availblity ${targetBurger.name} ${
        targetBurger.quantity - order.quantity
      }`;
    } else {
      return true;
    }
  });

  if (conditionCheck.every((result) => result === true)) {
    return true;
  } else {
    let result = conditionCheck.filter((result) => result !== true);
    return result.toString();
  }
};

const addBurgers = (newBurger) => {
  burgerDB = [...burgerDB, newBurger];
};

const addOrder = (newOrder) => {
  newOrder = {
    order_id: Date.now(),
    items: newOrder,
    status: "pending",
    created_at: Date.now(),
  };
  ordesDB = [...ordesDB, newOrder];
};

const deleteOrder = (deleteId) => {
  let findIndex = ordesDB.findIndex((order) => order.order_id === deleteId);
  console.log("find index", findIndex);
  if (findIndex >= 0) {
    ordesDB = ordesDB.filter((order) => order.order_id !== deleteId);
    console.log(ordesDB);
    return "sucecessfully deleted";
  } else {
    return "delete id is wrong";
  }
};

const updateOrder = (newContent, updateId) => {
  let originOrder = ordesDB.find((order) => order.order_id === updateId);
  if (originOrder) {
    let newOrder = { ...originOrder, ...newContent };
    let result = checkBurgerStock(newOrder);

    if (result === true) {
      ordesDB = ordesDB.map((order) => {
        if (order.order_id === updateId) {
          return newOrder;
        } else {
          return order;
        }
      });
      return newOrder;
    } else {
      return "update request is wrong";
    }
  } else {
    return "update id is wrong";
  }
};

app.use(function (req, res, next) {
  req.burgerDB = burgerDB;
  req.ordesDB = ordesDB;
  req.addBurgers = addBurgers;
  req.checkBurgerStock = checkBurgerStock;
  req.addOrder = addOrder;
  req.deleteOrder = deleteOrder;
  req.updateOrder = updateOrder;
  next();
});

app.use("/hamburger", burgerRouter);
app.use("/orders", orderRouter);
app.use("/order", orderRouter);

app.listen(4000, () => {
  console.log("i am here");
});
