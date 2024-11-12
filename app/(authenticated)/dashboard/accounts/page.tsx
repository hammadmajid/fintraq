import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Wallet,
  CreditCard,
  Briefcase,
  Edit,
  Trash2,
  PiggyBank,
} from "lucide-react";
import CreateAccountForm from "./create-account-form";
import { getUserId } from "@/app/utils";

const accounts = [
  {
    icon: Wallet,
    title: "Cash",
    description: "Physical currency",
    balance: 123.45,
  },
  {
    icon: CreditCard,
    title: "Credit Card",
    description: "Visa ending in 1234",
    balance: -242.62,
  },
  {
    icon: CreditCard,
    title: "Debit Card",
    description: "Mastercard ending in 5678",
    balance: 2500.33,
  },
  {
    icon: Briefcase,
    title: "Investments",
    description: "Stocks and bonds",
    balance: 1234.56,
  },
  {
    icon: PiggyBank,
    title: "Savings",
    description: "Life savings for retirement",
    balance: 83025.21,
  },
];

export default async function Accounts() {
  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Accounts</h1>
          <p className="text-muted-foreground mb-6">
            Create or manage your accounts
          </p>
        </div>
        <CreateAccountForm userId={await getUserId()} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <account.icon className="w-6 h-6 mr-2" />
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
              <p className="text-muted-foreground mb-4">
                {account.description}
              </p>
              <p className="text-2xl font-bold">
                ${account.balance.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
