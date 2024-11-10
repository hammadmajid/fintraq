"use client";

import { useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Trash2 } from "lucide-react";
import type { SelectSession } from "@/lib/db/schema";
import { deleteSession, deleteExpiredSessions } from "./actions";

interface SessionsTableProps {
  initialSessions: SelectSession[];
  currentSessionToken: string;
}

export default function SessionsTable({
  initialSessions,
  currentSessionToken,
}: SessionsTableProps) {
  const [sessions, setSessions] = useState(initialSessions);
  const [isPending, startTransition] = useTransition();

  const handleDeleteSession = (token: string) => {
    startTransition(async () => {
      await deleteSession(token);
      setSessions(sessions.filter((session) => session.token !== token));
    });
  };

  const handleDeleteExpiredSessions = () => {
    startTransition(async () => {
      await deleteExpiredSessions();
      setSessions(sessions.filter((session) => session.expiresAt > new Date()));
    });
  };

  const getSessionStatus = (session: SelectSession) => {
    console.log("session: ", session.token);
    console.log("current: ", currentSessionToken);

    if (session.token === currentSessionToken) {
      return { label: "Current", variant: "default" as const };
    }
    if (session.expiresAt > new Date()) {
      return { label: "Active", variant: "outline" as const };
    }
    return { label: "Expired", variant: "destructive" as const };
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Device</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => {
            const { label, variant } = getSessionStatus(session);
            return (
              <TableRow key={session.token}>
                <TableCell className="font-medium">{session.device}</TableCell>
                <TableCell>{session.ipAddress}</TableCell>
                <TableCell>
                  {new Date(session.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={variant}>{label}</Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteSession(session.token)}
                    disabled={
                      isPending || session.token === currentSessionToken
                    }
                    aria-label="Delete session"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Button
        onClick={handleDeleteExpiredSessions}
        variant="destructive"
        disabled={isPending}
      >
        <AlertTriangle className="h-4 w-4" />
        Delete expired
      </Button>
    </div>
  );
}
