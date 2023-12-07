import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/user";

const adminEmails = ["williamkowalski586@gmail.com", "abdulsalamahmed737@gmail.com"];

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await mongooseConnect();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
     session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
  session: {
    jwt: true,
  },
  // database: process.env.MONGODB_URI,
};

export default NextAuth(authOptions);
export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "not an admin";
  }
}
