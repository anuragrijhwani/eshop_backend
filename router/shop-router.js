import express from "express";
import {
  editShop,
  getShopsWithProducts,
  shop,
} from "../control/shop-control.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import multer from "multer";
import path from "path";

const Storage = multer.diskStorage({
  destination: "shopImg/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});

const router = express.Router();
router.route("/create").post(upload.single("shopImage"), authMiddleware, shop);
router
  .route("/update")
  .post(upload.single("shopImage"), authMiddleware, editShop);

router.route("/all").get(authMiddleware, getShopsWithProducts);

export default router;
