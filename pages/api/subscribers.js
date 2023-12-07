import { Subscriber } from "@/models/Subscriber";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      try {
        const userDoc = await Subscriber.findOne({ _id: req.query.id }).exec();
        res.json(userDoc);
      } catch (error) {
        // Handle error here
        res
          .status(500)
          .json({ error: "An error occurred while fetching the user." });
      }
    } else {
      try {
        const users = await Subscriber.find().exec();
        res.json(users);
      } catch (error) {
        // Handle error here
        res
          .status(500)
          .json({ error: "An error occurred while fetching users." });
      }
    }
  }

  if (method === "POST") {
    const {
      id,
      img,
      fullname,
      username,
      password,
      email,
      phone,
      balance,
      verified,
    } = req.body;
    const userDoc = await Subscriber.create({
      id,
      img,
      fullname,
      username,
      password,
      email,
      phone,
      balance,
      verified,
    });
    res.json(userDoc);
  }

  if (method === "PUT") {
    const {
      id,
      img,
      fullname,
      username,
      password,
      email,
      phone,
      balance,
      verified,
    } = req.body;
    await Subscriber.updateOne(
      { _id: id },
      { img, fullname, username, password, email, phone, balance, verified }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Subscriber.deleteOne({ _id });
    res.json(true);
  }
}
