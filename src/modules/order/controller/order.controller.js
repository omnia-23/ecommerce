
import Cart from "../../../../DB/models/Cart.js";
import Order from "../../../../DB/models/Order.js";
import Product from "../../../../DB/models/Product.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import AppError from "../../../utils/AppError.js";


export const addCashOrder = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
        return next(new AppError("not found cart", 404))
    }
    if (!cart.products.length) {
        return next(new AppError("cart is empty", 400))
    }

    cart.products.forEach(async (element) => {
        const product = await Product.findById(element.product)
        if (!product) {
            return next(new AppError(`not found product ${element.product}`, 404))
        }
        if (product.stock < element.quantity) {
            return next(new AppError(`stock not valid ${element.product} ,valid in ${product.stock} stock`, 400))
        }
    })



    cart.products.forEach(async (element) => {
        console.log(element);
        
        await Product.findByIdAndUpdate(element.product, {
            $inc: { sold: element.quantity, stock: -element.quantity }
        })
    })
    req.body.products = cart.products
    req.body.total = cart.total
    req.body.user = req.user.id
    const order = new Order(req.body)
    const newOrder = await order.save()
    await Cart.findOneAndDelete({ user: req.user.id })
    return res.status(201).json({ message: "success", newOrder, status: 201 });

})
