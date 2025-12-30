"use client";

import { PageShell } from "@/app/dashboard/_components/PageShell";
import FinanceOverview from "./_components/FinanceOverview";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Page() {
    return (
        <PageShell
            title="Finance & Analytics"
            description="Overview Your Business"
            headerAction={
                <Button variant="outline" className="flex items-center gap-2 border-orange-500 text-gray-700 bg-white hover:bg-orange-50">
                    Select Date Range
                    <ChevronDown className="h-4 w-4" />
                </Button>
            }
        >
            <FinanceOverview />
        </PageShell>
    );
}
