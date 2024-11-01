import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookies, headers } from "next/headers";
import { SelectSession } from "@/lib/db/schema";

export default async function SessionsTable() {
  const userId = getUserId();
  const sessions = await getSessions(userId);
  console.log(sessions);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Device</TableHead>
          <TableHead>IP Address</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Expired</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <TableRow key={session.token}>
            <TableCell className="font-medium">{session.device}</TableCell>
            <TableCell>{session.ipAddress}</TableCell>
            <TableCell>
              {new Date(session.createdAt).toLocaleString()}
            </TableCell>
            <TableCell>
              {new Date(session.expiresAt) < new Date()
                ? "Expired"
                : new Date(session.expiresAt).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

async function getSessions(userId: string): Promise<SelectSession[]> {
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  const response = await fetch(
    `${protocol}://${host}/api/v1/auth/sessions/getall?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch sessions");
  }
  return await response.json();
}

function getUserId(): string {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) {
    throw new Error("Session cookie not found");
  }
  const [sessionToken, userId] = sessionCookie.split(":");
  if (!userId || !sessionToken) {
    throw new Error("Invalid session cookie format");
  }

  return userId;
}
