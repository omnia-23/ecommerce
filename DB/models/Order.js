import mongoose, { Types } from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: [
            {
                product: {
                    type: Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                price: {
                    type: Number,
                    min: 0
                }
            }
        ],
        total: {
            type: Number,
            min: 0,
            default: 0
        },
        isPaid: {
            type: Boolean,
            default: false
        },
        isDelivered: {
            type: Boolean,
            default: false
        },
        address: {
            type: String,
            required: true
        },
        phone: String,
        paidAt: Date,
        deliveredAt: Date,
        paymentMethod: {
            type: String,
            enum: ['card', 'cash'],
            default: 'cash'
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;