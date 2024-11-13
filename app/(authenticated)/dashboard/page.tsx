"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Pie,
  PieChart,
  Label,
} from "recharts";
import { Plus, FileText } from "lucide-react";
import { type ChartConfig } from "@/components/ui/chart";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

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

const categoryExpenseData = [
  { category: "bills", expenses: 275, fill: "var(--color-bills)" },
  { category: "food", expenses: 200, fill: "var(--color-food)" },
  { category: "transportation", expenses: 287, fill: "var(--color-transportation)" },
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

export default function Dashboard() {
  const totalExpenses = React.useMemo(() => {
    return categoryExpenseData.reduce((acc, curr) => acc + curr.expenses, 0);
  }, []);

  return (
    <main>
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-muted-foreground">Balance</p>
          <h1 className="text-3xl font-bold">$ 1234.56</h1>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            <FileText className="w-5 mr-2" /> Create Report
          </Button>
          <Button>
            <Plus className="w-5 mr-2"></Plus> New Record
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Bar
                  dataKey="expenses"
                  fill="var(--color-expenses)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

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
      </div>
    </main>
  );
}
