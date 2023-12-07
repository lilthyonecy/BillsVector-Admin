import mongoose, { model, models, Schema } from "mongoose";

const SettingSchema = new Schema({
  name: [{ type: String }],
  apiuri: { type: String },
  apikey: { type: String },
  key: {
    type: String,
    unique: true,
  },
  value: {
    type: String, 
  },
});

export const Setting = models?.Setting || model("Setting", SettingSchema);
