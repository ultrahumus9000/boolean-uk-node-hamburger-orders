const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));
app.use(express.json());

const burgerDB = [
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

const ordesDB = [
  {
    order_id: 1,
    items: [
      { hamburger_id: 1, quantity: 2 },
      { hamburger_id: 3, quantity: 1 },
    ],
    status: "pending",
    created_at: 1627020599070,
  },
];

const checkBurgerStock = () => {};

app.use(function (req, res, next) {
  req.burgerDB = burgerDB;
  req.ordesDB = ordesDB;
  next();
});

app.listen(4000, () => {
  console.log("i am here");
});
