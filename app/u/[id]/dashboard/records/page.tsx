import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Metadata} from "next/types";
import {RecordsTable} from "@/components/records/table";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import {getRecords} from "@/actions/records";

export const metadata: Metadata = {
    title: "Records",
};

export default async function Page() {
    const session = await auth();

    if (!session || !session.user?.id) {
        redirect("/login");
    }

    const userId = session.user.id;

    const records = await getRecords(userId);
    return (
        <main>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Records</h1>
                    <p className="text-muted-foreground mb-6">
                        Create or manage your transactional records
                    </p>
                </div>
                <Button size="lg">
                    <Plus/>
                    Record
                </Button>
            </div>
            <RecordsTable records={records}/>
        </main>
    );
}
