import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { DataPlan } from "@/models/DataPlan";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.name) {
      res.json(await DataPlan.findOne({ name: req.query.name }));
    } else if (req.query?.network) {
      res.json(await DataPlan.find({ network: req.query.network }));
    } else {
      res.json(await DataPlan.find());
    }
  }

  if (method === "POST") {
    const {
      network,
      networkid,
      plan_id,
      plan,
      price,
      sells_price,
      category,
      duration,
    } = req.body;
    const DataPlanDoc = await DataPlan.create({
      network,
      networkid,
      plan_id,
      plan,
      price,
      sells_price,
      category,
      duration,
    });
    res.json(DataPlanDoc);
  }

  if (method === "PUT") {
    const {
      network,
      networkid,
      plan_id,
      plan,
      price,
      sells_price,
      category,
      duration,
      _id,
    } = req.body;
    const DataPlanDoc = await DataPlan.updateOne(
      { _id },
      {
        network,
        networkid,
        plan_id,
        plan,
        price,
        sells_price,
        category,
        duration,
      }
    );
    res.json(DataPlanDoc);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await DataPlan.deleteOne({ _id });
    res.json("ok");
  }
}
