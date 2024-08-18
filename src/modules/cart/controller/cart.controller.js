import Cart from "../../../../DB/models/Cart.js";
import Coupon from "../../../../DB/models/Coupon.js";
import Product from "../../../../DB/models/Product.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import AppError from "../../../utils/AppError.js";

async function calc(cart) {
  const subTotal = cart.products.reduce(
    (prev, element) => prev + (element.quantity * element.price || 0),
    0
  );
  cart.subTotal = subTotal || 0;

  if (!cart.discount) {
    cart.total = subTotal;
  } else {
    cart.total = subTotal - (subTotal * cart.discount) / 100;
  }
  await cart.save();
  console.log(cart);
}

export const addcart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    //   1-create cart
    const myCart = new Cart({ user: req.user.id });
    const newCart = await myCart.save();
    //2-
    const product = await Product.findById(req.body.product);
    if (!product) {
      return next(new AppError("not found product", 400));
    }
    req.body.price = product.priceAfterDiscount || product.price;
    if (product.stock < req.body.quantity) {
      return next(new AppError("stock not valid", 400));
    }

    const addToCart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: { products: req.body },
      },
      { new: true }
    );

    calc(addToCart);
    return res.status(201).json({ message: "success", addToCart, status: 201 });
  }

  const product = await Product.findById(req.body.product);
  req.body.price = product.priceAfterDiscount;

  if (!product) {
    return next(new AppError("not found product", 400));
  }
  if (product.stock < req.body.quantity) {
    return next(new AppError("stock not valid", 400));
  }

  let productExist = false;
  cart.products.forEach(async (pro) => {
    if (pro.product == req.body.product) {
      productExist = true;
      if (product.stock < req.body.quantity + pro.quantity) {
        return next(new AppError("stock not valid", 400));
      }
      pro.quantity = req.body.quantity + pro.quantity;
      await cart.save();
      calc(cart);

      return res.status(200).json({ message: "success", cart, status: 200 });
    }
  });
  
  if (!productExist) {
    const addToCart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: { products: req.body },
      },
      { new: true }
    );
    calc(addToCart);

    return res.status(200).json({ message: "success", addToCart, status: 200 });
  }
});

export const applyCoupon = asyncHandler(async (req, res, next) => {
  const copon = await Coupon.findOne({
    code: req.body.code,
    expire: { $gte: Date.now() },
  });
  if (!copon) {
    return next(new AppError("not found coupon", 404));
  }
  const cart = await Cart.findOne({ user: req.user.id });
  cart.discount = copon.discount;
  await cart.save();
  calc(cart);
  return res.status(200).json({ message: "success", cart, status: 200 });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user.id },
    {
      $pull: { products: { _id: req.params._id } },
    },
    { new: true }
  );
  if (!cart) {
    return next(new AppError("not found cart", 404));
  }
  calc(cart);
  return res.status(200).json({ message: "success", cart, status: 200 });
});

export const updateQuantity = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new AppError("not found cart", 404));
  }
  let productExist = false;
  cart.products.forEach(async (pro) => {
    if (pro.product == req.params._id) {
      productExist = true;
      pro.quantity = req.body.quantity;
      await cart.save();
      calc(cart);
      return res.status(200).json({ message: "success", cart, status: 200 });
    }
  });
  if (!productExist) {
    return next(new AppError("not found product in cart", 404));
  }
});
