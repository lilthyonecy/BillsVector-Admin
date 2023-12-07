import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.name) {
      // Find documents with the specified name
      // await Category.find({ name: req.query.name }, (err, categories) => {
      //   if (err) {
      //     console.error(err);
      //     res.status(500).json({ error: "Internal Server Error" });
      //   } else if (categories.length === 0) {
      //     res
      //     .status(404)
      //     .json({ error: "No categories found with the specified name" });
      //   } else {
      //     res.json(categories);
      //     console.log(categories);
      //   }
      // });
      res.json(await Category.findOne({name:req.query.name}));
    } else {
      res.json(await Category.find().populate("category"));
    }
  }

  if (method === "POST") {
    const { name, category, imgurl, id } = req.body;
    const categoryDoc = await Category.create({
      name,
      category,
      id,
      imgurl
    });
    res.json(categoryDoc);
  }

  if (method === "PUT") {
    const { name, category, id, imgurl, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        category,
        id,
        imgurl
      }
    );
    res.json(categoryDoc);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json("ok");
  }
}
