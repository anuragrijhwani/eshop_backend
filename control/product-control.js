import { productData } from "../models/product-module.js";

export const addProduct = async (req, res) => {
  try {
    const { productName, productPrice, createdBy, shopId } = req.body;
    const productImage = req.file ? req.file.filename : null;

    await productData.create({
      productName,
      productPrice,
      productImage,
      createdBy,
      shopId,
    });

    res.status(200).json({
      status: 200,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { productId, productName, productPrice } = req.body;
    let productImage;

    if (req.file) {
      productImage = req.file.filename;
    }

    const updatedData = {
      productName,
      productPrice,
      ...(productImage && { productImage }),
    };

    const updatedProduct = await productData.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: "Failed to update product",
      error: error.message,
    });
  }
};
