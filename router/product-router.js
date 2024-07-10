import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import multer from "multer";
import path from "path";
import { addProduct, editProduct } from "../control/product-control.js";

const Storage = multer.diskStorage({
  destination: "productImg/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});

const router = express.Router();
router
  .route("/create")
  .post(upload.single("productImage"), authMiddleware, addProduct);

router
  .route("/update")
  .post(upload.single("productImage"), authMiddleware, editProduct);

export default router;
