import { getUserId } from "@/app/utils";
import { accountQueries } from "@/lib/db/queries/accounts";
import { Metadata } from "next";
import CreateRecord from "./components/create-record";
import RecordsTable from "./components/records-table";

export const metadata: Metadata = {
  title: "Records",
};

type Record = {
  id: string;
  amount: number;
  type: "income" | "expense" | "transfer";
  date: string;
  category: string;
  status: "pending" | "cleared";
};

const initialRecords: Record[] = [
  {
    id: "1",
    amount: 1000,
    type: "income",
    date: "2023-06-01",
    category: "Salary",
    status: "cleared",
  },
  {
    id: "2",
    amount: -50,
    type: "expense",
    date: "2023-06-02",
    category: "Groceries",
    status: "cleared",
  },
  {
    id: "3",
    amount: 500,
    type: "transfer",
    date: "2023-06-03",
    category: "Savings",
    status: "pending",
  },
  {
    id: "4",
    amount: 200,
    type: "expense",
    date: "2023-06-04",
    category: "Utilities",
    status: "cleared",
  },
  {
    id: "5",
    amount: 150,
    type: "income",
    date: "2023-06-05",
    category: "Freelance",
    status: "pending",
  },
  {
    id: "6",
    amount: -75,
    type: "expense",
    date: "2023-06-06",
    category: "Dining",
    status: "cleared",
  },
  {
    id: "7",
    amount: 300,
    type: "transfer",
    date: "2023-06-07",
    category: "Investment",
    status: "pending",
  },
  {
    id: "8",
    amount: 500,
    type: "income",
    date: "2023-06-08",
    category: "Bonus",
    status: "cleared",
  },
  {
    id: "9",
    amount: -100,
    type: "expense",
    date: "2023-06-09",
    category: "Transport",
    status: "cleared",
  },
  {
    id: "10",
    amount: 250,
    type: "transfer",
    date: "2023-06-10",
    category: "Savings",
    status: "pending",
  },
  {
    id: "11",
    amount: 400,
    type: "income",
    date: "2023-06-11",
    category: "Gift",
    status: "cleared",
  },
  {
    id: "12",
    amount: -200,
    type: "expense",
    date: "2023-06-12",
    category: "Shopping",
    status: "cleared",
  },
  {
    id: "13",
    amount: 100,
    type: "transfer",
    date: "2023-06-13",
    category: "Emergency Fund",
    status: "pending",
  },
];

export default async function Records() {
  const userId = await getUserId();
  const accounts = await accountQueries.getByUserId(userId);

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Records</h1>
          <p className="text-muted-foreground mb-6">
            Create or manage your records
          </p>
        </div>
        <CreateRecord accounts={accounts} />
      </div>
      <RecordsTable initialRecords={initialRecords} />
    </main>
  );
}
