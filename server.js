import "dotenv/config";
import express from "express";
const app = express();

import Cors from "cors";
import authRoute from "./router/auth-router.js";
import shopRoute from "./router/shop-router.js";
import productRoute from "./router/product-router.js";
import { connectDB } from "./utils/db.js";

const CorsOption = {
  origin: "http://localhost:5173",
  methods: "GET,POST,DELETE",
  Credentials: true,
};

app.use(Cors(CorsOption));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/shopImg", express.static("shopImg"));
app.use("/productImg", express.static("productImg"));
app.use("/api/shop", shopRoute);
app.use("/api/product", productRoute);

connectDB().then(() => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`server is running on port: ${port} `);
  });
});
