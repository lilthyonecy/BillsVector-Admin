import mongoose, { model, Schema, models } from "mongoose";

const SubscriberSchema = new Schema(
  {
    img: { type: String },
    fullname: { type: String, default: "" },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    balance: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Subscriber =
  models.Subscriber || model("Subscriber", SubscriberSchema);
