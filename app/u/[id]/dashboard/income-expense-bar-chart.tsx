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
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";

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

const incomeVsExpenseData = [
  { month: "Jan", income: 5000, expenses: 4000 },
  { month: "Feb", income: 5500, expenses: 4200 },
  { month: "Mar", income: 6000, expenses: 4500 },
  { month: "Apr", income: 5800, expenses: 4300 },
  { month: "May", income: 6200, expenses: 4800 },
  { month: "Jun", income: 6500, expenses: 5000 },
];

export default function IncomeExpenseBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income v Expenses</CardTitle>
        <CardDescription>
          Are you spending more than what you are making?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={incomeVsExpenseChart}
          className="min-h-[200px] w-full"
        >
          <BarChart accessibilityLayer data={incomeVsExpenseData}>
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
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
