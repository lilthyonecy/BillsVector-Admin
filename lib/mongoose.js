import mongoose from "mongoose";

async function mongooseConnect() {
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return mongoose.connection;
  } catch (err) {
    // console.log("Connection Err", err);
    throw err;
  }

}

module.exports = { mongooseConnect };