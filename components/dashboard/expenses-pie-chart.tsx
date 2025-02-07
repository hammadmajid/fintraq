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
  type ChartConfig,
} from "@/components/ui/chart";
import { SelectRecord } from "@/drizzle/db/schema";
import React from "react";
import { Label, Pie, PieChart } from "recharts";
import { recordCategories } from "@/lib/utils";

function aggregateData(records: SelectRecord[]) {
  const categoryTotals: Record<string, number> = {};

  recordCategories.forEach((category) => {
    categoryTotals[category] = 0;
  });

  // Aggregate expenses by category
  records.forEach((record) => {
    if (record.type === "Expense" || record.type === "Transfer Out") {
      const category = record.category;
      const amount = Number(record.amount);
      if (categoryTotals[category] !== undefined) {
        categoryTotals[category] += amount;
      }
    }
  });

  // Convert the totals into the desired format
  return Object.entries(categoryTotals).map(([category, expenses]) => ({
    category,
    expenses,
    fill: `var(--color-${category})`,
  }));
}

const categoryExpenseChart = {
  ...Object.fromEntries(
    recordCategories.map((category, index) => [
      category,
      {
        label: category,
        color: `hsl(var(--chart-${index + 1}))`,
      },
    ]),
  ),
} satisfies ChartConfig;

export function ExpensesPieChart({ records }: { records: SelectRecord[] }) {
  const categoryExpenseData = aggregateData(records);
  const totalExpenses = React.useMemo(() => {
    return categoryExpenseData.reduce((acc, curr) => acc + curr.expenses, 0);
  }, [categoryExpenseData]);

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
                          className="text-3xl font-bold fill-foreground"
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
