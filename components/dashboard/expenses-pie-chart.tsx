"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Label } from "recharts";
import { type ChartConfig } from "@/components/ui/chart";
import React from "react";

const categoryExpenseData = [
  { category: "bills", expenses: 275, fill: "var(--color-bills)" },
  { category: "food", expenses: 200, fill: "var(--color-food)" },
  {
    category: "transportation",
    expenses: 287,
    fill: "var(--color-transportation)",
  },
  { category: "education", expenses: 173, fill: "var(--color-education)" },
  { category: "other", expenses: 190, fill: "var(--color-other)" },
];

const categoryExpenseChart = {
  expenses: {
    label: "expenses",
  },
  bills: {
    label: "bills",
    color: "hsl(var(--chart-1))",
  },
  food: {
    label: "food",
    color: "hsl(var(--chart-2))",
  },
  transportation: {
    label: "transportation",
    color: "hsl(var(--chart-3))",
  },
  education: {
    label: "education",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function ExpensesPieChart() {
  const totalExpenses = React.useMemo(() => {
    return categoryExpenseData.reduce((acc, curr) => acc + curr.expenses, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <CardDescription>See where your expenses go</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={categoryExpenseChart}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={categoryExpenseData}
              dataKey="expenses"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalExpenses.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Expenses
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
