import { SelectBudget } from "@/drizzle/db/schema";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getAccountById } from "@/actions/account";
import { DynamicIcon } from "@/components/dynamic-icon";
import { getAccountRecords } from "@/actions/records";
import { calculateTotalExpenses, getRelativeTime } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { Button } from "../ui/button";

export async function BudgetCard({ budget }: { budget: SelectBudget }) {
  const [account] = await getAccountById(budget.account);
  const records = await getAccountRecords(account.id);

  const totalBalance = calculateTotalExpenses(records);
  const percentage = Math.round((totalBalance / Number(budget.goal)) * 100);

  return (
    <Button
      className="block w-full p-0 h-max hover:cursor-pointer"
      variant="outline"
      asChild
    >
      <Link
        href={`/u/dashboard/budgets/edit/?id=${budget.id}`}
        className="block"
      >
        <Card
          className={`md:max-w-[350px] ${percentage >= 100 ? "text-destructive" : ""}`}
        >
          <CardHeader>
            <CardTitle>{budget.title}</CardTitle>
            <CardDescription>{budget.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Spent {percentage}% of ${budget.goal} goal
            </p>
            <Progress value={percentage} />
          </CardContent>
          <CardFooter className="text-muted-foreground text-sm flex justify-between">
            <div>
              <HoverCard>
                <HoverCardTrigger>
                  {budget.endsAt.toLocaleString()}
                </HoverCardTrigger>
                <HoverCardContent>
                  {getRelativeTime(budget.endsAt)}
                </HoverCardContent>
              </HoverCard>
            </div>
            <div className="flex items-center justify-start gap-2">
              <DynamicIcon name={account.icon} />
              <span>{account.title}</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </Button>
  );
}
