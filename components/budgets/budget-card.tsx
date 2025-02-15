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
import { getAccountRecords, getRecordById } from "@/actions/records";
import { calculateTotalBalance, getRelativeTime } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export async function BudgetCard({ budget }: { budget: SelectBudget }) {
  const [account] = await getAccountById(budget.account);
  const records = await getAccountRecords(account.id);

  const totalBalance = calculateTotalBalance(records);
  const percentage = (totalBalance / Number(budget.goal)) * 100;

  return (
    <Card className="md:max-w-[350px]">
      <CardHeader>
        <CardTitle>{budget.title}</CardTitle>
        <CardDescription>{budget.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-start gap-2">
          <DynamicIcon name={account.icon} />
          <span>{account.title}</span>
        </div>
        <Progress value={percentage} />
      </CardContent>
      <CardFooter className="text-muted-foreground">
        <HoverCard>
          <HoverCardTrigger>{budget.endsAt.toLocaleString()}</HoverCardTrigger>
          <HoverCardContent>{getRelativeTime(budget.endsAt)}</HoverCardContent>
        </HoverCard>
      </CardFooter>
    </Card>
  );
}
