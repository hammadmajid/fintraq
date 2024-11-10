import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import SessionsTable from "./components/sessions-table";
import { getSession, getUserId } from "@/app/utils";
import { sessionQueries } from "@/lib/db/queries/session";

export default async function SecuritySettings() {
  const userId = await getUserId();
  const session = await getSession();
  const sessions = await sessionQueries.getAll(userId);

  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">Security Settings</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Ensure your account is using a long, random password to stay
              secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled>
              Change Password
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
            <CardDescription>
              Add an extra layer of security to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch id="2fa" disabled />
              <Label htmlFor="2fa">Enable 2FA</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              When 2FA is enabled, you&apos;ll be required to enter a code from
              your authenticator app to log in.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled>
              Configure 2FA
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <CardDescription>
            Manage your active sessions across different devices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SessionsTable
            initialSessions={sessions}
            currentSessionToken={session}
          />
        </CardContent>
      </Card>
    </main>
  );
}
