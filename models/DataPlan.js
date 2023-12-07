import mongoose, { model, Schema, models } from "mongoose";

const DataPlanSchema = new Schema(
  {
    network: { type: String },
    networkid: { type: String, required: true },
    plan_id: { type: String, required: true },
    plan: { type: String, required: true },
    price: { type: String, default: "" },
    sells_price: { type: String, required: true },
    category: { type: String, default: "" },
    duration: { type: Number, required: true},
  }
);

export const DataPlan = models?.DataPlan || model("DataPlan", DataPlanSchema);
