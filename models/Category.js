import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
  category: { type: String, required: true },
  id: { type: String, required: true },
  name: { type: String, unique: true },
  imgurl: { type: String, unique: true },
});

export const Category = models?.Category || model("Category", CategorySchema);
