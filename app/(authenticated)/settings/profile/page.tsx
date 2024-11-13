import { getUserId } from "@/app/utils";
import { userQueries } from "@/lib/db/queries/users";
import ProfileForm from "./ProfileForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const userId = await getUserId();
  const [user] = await userQueries.getById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return <ProfileForm user={user} />;
}