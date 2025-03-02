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
    <div className="w-full">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-[250px] mb-4" />
        <Skeleton className="h-10 w-[150px] mb-4" />
      </div>

      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-[200px]" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Skeleton className="h-5 w-[80px]" />
            </TableHead>
            <TableHead className="w-[100px]">
              <Skeleton className="h-5 w-[80px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5" />
            </TableHead>
            <TableHead className="w-[80px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-5" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-2 w-6" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
