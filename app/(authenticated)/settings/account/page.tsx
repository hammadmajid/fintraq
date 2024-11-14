import { Metadata } from "next";
import DeleteAccount from "./components/delete-account";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountSetting() {
  return (
    <main className="p-6">
      <div>
        <h1 className="text-3xl font-extrabold">Account</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>
      <DeleteAccount />
    </main>
  );
}
