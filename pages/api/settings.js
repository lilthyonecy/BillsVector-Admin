import { Setting } from "@/models/Setting";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.key) {
      res.json(await Setting.findOne({ key: req.query.key }));
    } else {
      res.json(await Setting.find());
    }
  }

  if (method === "POST") {
    const { name, apiuri, apikey, key, value } = req.body;
    const settingDoc = await Category.create({
      name,
      apiuri,
      apikey,
      key,
      value,
    });
    res.json(settingDoc);
  }

  if (method === "PUT") {
    const { name, apiuri, apikey, key, value, _id } = req.body;
    await Product.updateOne(
      { _id },
      {  name, apiuri, apikey, key, value }
    );
    res.json(true);
  }
}

export default handle;
