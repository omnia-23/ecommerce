import dbConnection from "../DB/connection.js";
import dotenv from "dotenv";
import globalError from "./middleware/globalError.js";
import categoryRouter from "./modules/category/category.routes.js";
import brandRouter from "./modules/brand/brand.routes.js";
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js";
import productRouter from "./modules/product/product.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/user/user.routes.js";
import reviewRouter from "./modules/review/review.routes.js";
import wishlistRouter from "./modules/wishlist/wishlist.routes.js";
import addressRouter from "./modules/address/address.routes.js";
import couponRouter from "./modules/coupon/coupon.routes.js";
import cartRouter from "./modules/cart/cart.routes.js";
import orderRouter from "./modules/order/order.routes.js";

import Strip from "stripe";
const stripe = new Strip(
  "sk_test_51PokU9AXaj6VSZsVYsubHy4RarfN6W5azi0mSSOgPXK1B2qPDE2Itx3ho7FtrVs3z60kyKqf0BQ9EjQcb2Nzw7MW00Z3btADVB"
);
dotenv.config();
const bootstrap = (app, express) => {
  const baseUrl = "/api/v1";
  dbConnection();

  // This is your Stripe CLI webhook secret for testing your endpoint locally.

  app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];

      const endpointSecret = "whsec_wVp9CH1h4KAdpZkE235oMpfnjKvhNoEp";

      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        // Handle the event (e.g., update your database)
        console.log(`Checkout Session completed: ${session.id}`);
      }

      res.json({ received: true });
    }
  );

  app.use(express.json());

  app.use("/uploads", express.static("uploads"));
  app.use(`${baseUrl}/categories`, categoryRouter);
  app.use(`${baseUrl}/brands`, brandRouter);
  app.use(`${baseUrl}/subCategories`, subCategoryRouter);
  app.use(`${baseUrl}/products`, productRouter);
  app.use(`${baseUrl}/auth`, authRouter);
  app.use(`${baseUrl}/user`, userRouter);
  app.use(`${baseUrl}/review`, reviewRouter);
  app.use(`${baseUrl}/wishlist`, wishlistRouter);
  app.use(`${baseUrl}/address`, addressRouter);
  app.use(`${baseUrl}/coupon`, couponRouter);
  app.use(`${baseUrl}/cart`, cartRouter);
  app.use(`${baseUrl}/order`, orderRouter);

  app.use("*", (req, res) => {
    return res.json({ message: "not-found" });
  });
  app.use(globalError);
};

export default bootstrap;
