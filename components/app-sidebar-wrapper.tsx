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
        userName = formatName(user.fullName);
      }
    }
  }

  return <AppSidebar userName={userName} />;
}

function formatName(fullName: string): string {
  const nameParts = fullName.trim().split(" ");
  if (nameParts.length < 2) {
    return fullName;
  }
  const firstName = nameParts.slice(0, -1).join(" ");
  const lastInitial = nameParts[nameParts.length - 1][0];
  return `${firstName} ${lastInitial}.`;
}
