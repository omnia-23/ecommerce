import Cart from "../../../../DB/models/Cart.js";
import Order from "../../../../DB/models/Order.js";
import Product from "../../../../DB/models/Product.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import AppError from "../../../utils/AppError.js";
import Strip from "stripe";
const stripe = new Strip(
  "sk_test_51PokU9AXaj6VSZsVYsubHy4RarfN6W5azi0mSSOgPXK1B2qPDE2Itx3ho7FtrVs3z60kyKqf0BQ9EjQcb2Nzw7MW00Z3btADVB"
);

export const addCashOrder = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  if (!cart.products.length) {
    return next(new AppError("Cart is empty", 400));
  }

  // Verify stock availability
  const products = cart.products;
  const verificationPromises = products.map(async (element) => {
    console.log(element);
    const product = await Product.findById(element.product);
    if (!product) {
      throw new AppError(`Product ${element.product} not found`, 404);
    }
    if (product.stock < element.quantity) {
      throw new AppError(
        `Insufficient stock for product ${element.product}. Available: ${product.stock}`,
        400
      );
    }
  });

  await Promise.all(verificationPromises);

  const updatePromises = products.map(async (element) => {
    await Product.findByIdAndUpdate(element.product, {
      $inc: { sold: element.quantity, stock: -element.quantity },
    });
  });

  await Promise.all(updatePromises);

  req.body.products = products;
  req.body.total = cart.total;
  req.body.user = req.user.id;
  const order = new Order(req.body);
  await order.save();
  await Cart.findOneAndDelete({ user: req.user.id });

  const YOUR_DOMAIN = "http://localhost:3000";

  if (order.paymentMethod === "card") {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "egp",
            unit_amount: order.total * 100,
            product_data: {
              name: "Order Payment",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      client_reference_id: req.user.id,
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    return res.status(201).json({ message: "success", session, status: 201 });
  }

  return res.status(201).json({ message: "success", order, status: 201 });
});
