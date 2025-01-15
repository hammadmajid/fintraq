import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecordsLoading() {
  return (
    <div className="w-full p-8">
      <Skeleton className="h-10 w-[250px] mb-4" />

      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-10 w-[200px]" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Skeleton className="h-5 w-5" />
            </TableHead>
            <TableHead className="w-[100px]">
              <Skeleton className="h-5 w-[80px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-[60px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-[80px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-[100px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-[80px]" />
            </TableHead>
            <TableHead className="w-[50px]">
              <Skeleton className="h-5 w-[50px]" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-5 w-5" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[80px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[60px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[80px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[80px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-8 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
