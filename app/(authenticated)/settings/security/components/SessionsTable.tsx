import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectSession } from "@/lib/db/schema";
import { sessionQueries } from "@/lib/db/queries/session";
import { cookies } from "next/headers";

async function getSessions(userId: string): Promise<SelectSession[]> {
  return await sessionQueries.getAllByUserId(userId);
}

export default async function SessionsTable() {
  const userId = getUserId();
  const sessions = await getSessions(userId);

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

function getUserId(): string {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) {
    throw new Error("Session cookie not found");
  }

  const [userId, sessionToken] = sessionCookie.split(":");
  if (!userId || !sessionToken) {
    throw new Error("Invalid session cookie format");
  }

  return userId;
}
