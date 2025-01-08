"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SelectRecord } from "@/drizzle/db/schema";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface IncomeExpenseBarChartProps {
  records: SelectRecord[];
}

const incomeVsExpenseChart = {
  income: {
    label: "Income",
    color: "#3b82f6",
  },
  expenses: {
    label: "Expenses",
    color: "#dc2626",
  },
} satisfies ChartConfig;

function getMonthName(monthNum: number): string {
  return new Date(0, monthNum - 1).toLocaleString("en-US", { month: "short" });
}

// Aggregate income and expenses by month
function aggregateRecords(records: SelectRecord[]) {
  const data = new Map<string, { income: number; expenses: number }>();

  records.forEach((record) => {
    const month = getMonthName(record.createdAt.getMonth());
    const amount = Number(record.amount);

    if (!data.has(month)) {
      data.set(month, { income: 0, expenses: 0 });
    }

    const monthData = data.get(month)!;
    if (record.type === "Income") {
      monthData.income += amount;
    } else {
      monthData.expenses += amount;
    }
  });

  return Array.from(data.entries()).map(([month, values]) => ({
    month,
    ...values,
  }));
}

export function IncomeExpenseBarChart({ records }: IncomeExpenseBarChartProps) {
  const chartData = aggregateRecords(records);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
        <CardDescription>
          Are you spending more than what you are making?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>
              Are you spending more than what you are making?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={incomeVsExpenseChart}
              className="min-h-[200px] w-full"
            >
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <YAxis
                  dataKey="income"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                <Bar
                  dataKey="expenses"
                  fill="var(--color-expenses)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
