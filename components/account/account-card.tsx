import { getAccountRecords } from "@/actions/records";
import { DynamicIcon } from "@/components/dynamic-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectBankAccount, SelectRecord } from "@/drizzle/db/schema";
import { Link } from "next-view-transitions";

interface AccountCardProps {
  account: SelectBankAccount;
}

export async function AccountCard({ account }: AccountCardProps) {
  const records = await getAccountRecords(account.id);

  const balance = getAccountBalance(records);
  return (
    <Button
      className="block w-full p-0 h-max hover:cursor-pointer"
      variant="outline"
      asChild
    >
      <Link
        className="block"
        href={`/u/dashboard/accounts/edit?id=${account.id}`}
      >
        <Card className="relative overflow-hidden">
          <div
            className="absolute inset-0 transition-opacity opacity-20 blur-xl"
            style={{ backgroundColor: account.color }}
          ></div>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DynamicIcon
                name={account.icon}
                className="w-8 h-8 mr-2"
                style={{ color: account.color }}
              />
              <h2 className="text-lg font-bold">{account.title}</h2>
            </CardTitle>
            <CardDescription>{account.type} Account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-extrabold">${balance}</p>
            <p className="text-sm">{account.description}</p>
          </CardContent>
        </Card>
      </Link>
    </Button>
  );
}

function getAccountBalance(records: SelectRecord[]): number {
  // TODO: handle transfers
  const income = records.reduce((accumulator, current) => {
    return current.type === "Income"
      ? accumulator + Number(current.amount)
      : accumulator;
  }, 0);
  const expenses = records.reduce((accumulator, current) => {
    return current.type === "Expense"
      ? accumulator + Number(current.amount)
      : accumulator;
  }, 0);

  return income - expenses;
}
