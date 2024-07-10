import { shopData } from "../models/shop-module.js";

export const shop = async (req, res) => {
  try {
    const { shopName, address, createdBy } = req.body;
    const shopImage = req.file ? req.file.filename : null;


    if (!shopImage) {
      throw new Error("Shop image is required");
    }

    await shopData.create({
      shopName,
      address,
      shopImage,
      createdBy,
    });

    res.status(200).json({
      status: 200,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: 400, message: "page not found", error: error.message });
  }
};

export const editShop = async (req, res) => {
  try {
    const { shopId, shopName, address } = req.body;
    let shopImage;

    if (req.file) {
      shopImage = req.file.filename;
    }

    const updatedData = {
      shopName,
      address,
      ...(shopImage && { shopImage }),
    };

    const updatedShop = await shopData.findByIdAndUpdate(shopId, updatedData, {
      new: true,
    });

    if (!updatedShop) {
      return res.status(404).json({ status: 404, message: "Shop not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Shop updated successfully",
      data: updatedShop,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: "Failed to update shop",
      error: error.message,
    });
  }
};

export const getShopsWithProducts = async (req, res) => {
  try {
    const shops = await shopData.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "shopId",
          as: "products",
        },
      },
    ]);

    res.status(200).json({
      status: 200,
      message: "success",
      data: shops,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: "Failed to fetch shops with products",
      error: error.message,
    });
  }
};
