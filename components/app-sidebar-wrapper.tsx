import { cookies } from "next/headers";
import { userQueries } from "@/lib/db/queries/users";
import { AppSidebar } from "@/components/app-sidebar";

export async function AppSidebarWrapper() {
  const sessionCookie = cookies().get("session");
  let userName = "Username";

  if (sessionCookie) {
    const [, userId] = sessionCookie.value.split(":");
    if (userId) {
      const [user] = await userQueries.getById(userId);
      if (user) {
        userName = user.fullName;
      }
    }
  }

  return <AppSidebar userName={userName} />;
}
