import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]";
import RegisterForm from "@/components/SignUp";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <RegisterForm />;
}
