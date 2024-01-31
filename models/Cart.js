import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    delivery: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Cart', cartSchema);
