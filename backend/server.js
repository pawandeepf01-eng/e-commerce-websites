const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const coonectp = require("./config/db");

const router = require("./routes/userroutes.js");

const product = require("./routes/productroutes.js");

const cart = require("./routes/cartroute.js");

const order = require("./routes/orderroute.js");

const join = require("./routes/join.js");

const cookieparser = require("cookie-parser");

app.use("/uploads", express.static("uploads"));
app.use(express.json());
coonectp();
app.use(cookieparser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commerce-websites-red.vercel.app",
    ],
    credentials: true,
  }),
);
app.use("/api", router);
app.use("/api", product);
app.use("/api", cart);
app.use("/api", order);
app.use("/api", join);

app.get("/", (req, res) => {
  res.send("hello i p");
});

app.listen(process.env.PORT, () => {
  console.log("server is started");
});
