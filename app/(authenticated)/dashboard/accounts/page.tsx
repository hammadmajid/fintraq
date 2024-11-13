import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import CreateAccountForm from "./components/account-form";
import { getUserId } from "@/app/utils";
import { accountQueries } from "@/lib/db/queries/accounts";
import DynamicIcon from "@/components/dynamic-icon";

export default async function Accounts() {
  const userId = await getUserId();
  const accounts = await accountQueries.getByUserId(userId);

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Accounts</h1>
          <p className="text-muted-foreground mb-6">
            Create or manage your accounts
          </p>
        </div>
        <CreateAccountForm userId={userId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.length !== 0 ? (
          accounts.map((account, index) => (
            <Card key={index} style={{ backgroundColor: account.color }}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <DynamicIcon name={account.icon} className="mr-2" />
                    <h2 className="text-lg font-bold">{account.title}</h2>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="mb-4">{account.description}</p>
                <p className="text-2xl font-bold">
                  ${account.balance.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No accounts yet...</p>
        )}
      </div>
    </main>
  );
}
