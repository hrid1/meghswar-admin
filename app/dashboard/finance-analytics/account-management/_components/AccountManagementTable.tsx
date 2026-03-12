"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/DataTable";
import CustomSearchInput from "@/components/reusable/CustomSearchInput";
import { AppButton } from "@/components/reusable/CustomButton";

import { accountManagementColumns } from "./AccountManagementCol";
import { type AccountRow } from "./fakeData";
import { useGetAccountsQuery, useUpdateAccountMutation } from "@/redux/features/accounts/accountsApi";
import { toast } from "sonner";

type RowId = string | number;

import CreateAccountModal from "./CreateAccountModal";
import ViewStatementModal from "./ViewStatementModal";
import BalanceTransferModal from "./BalanceTransferModal";

export default function AccountManagementTable() {
    const page = 1;
    const limit = 10;
    
    const { data: accounts, isLoading, isError } = useGetAccountsQuery({ page, limit });
    const [updateAccount] = useUpdateAccountMutation();

    const [selectedIds, setSelectedIds] = useState<RowId[]>([]);
    const [search, setSearch] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // View Statement Modal State
    const [isViewStatementModalOpen, setIsViewStatementModalOpen] = useState(false);
    const [selectedStatementRow, setSelectedStatementRow] = useState<AccountRow | undefined>(undefined);

    // Balance Transfer Modal State
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [transferSourceRow, setTransferSourceRow] = useState<AccountRow | undefined>(undefined);

    const accountList = useMemo(() => {
        if (Array.isArray(accounts)) return accounts;
        if (Array.isArray(accounts?.accounts)) return accounts.accounts;
        if (Array.isArray(accounts?.data)) return accounts.data;
        return [];
    }, [accounts]);

    const formatLastUsed = (value?: string) => {
        if (!value) return "-";
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return "-";
        return d.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
    };

    const rows: AccountRow[] = useMemo(() => {
        return accountList.map((acc: any) => ({
            id: acc.id,
            bank: {
                name: acc.account_name,
                logoUrl: acc.logo_url,
            },
            accountNo: acc.account_number,
            holderName: acc.account_holder_name,
            balance: {
                amount: Number(acc.current_balance ?? 0),
                lastUsed: formatLastUsed(acc.updated_at ?? acc.created_at),
            },
            status: acc.is_active ? "Active" : "Inactive",
        }));
    }, [accountList]);

    const filteredRows = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return rows;

        return rows.filter((r) => {
            return (
                r.bank.name.toLowerCase().includes(q) ||
                r.accountNo.toLowerCase().includes(q) ||
                r.holderName.toLowerCase().includes(q)
            );
        });
    }, [rows, search]);

    const visibleIds = useMemo(() => filteredRows.map((r) => r.id), [filteredRows]);
    const cleanedSelectedIds = useMemo(
        () => selectedIds.filter((id) => visibleIds.includes(String(id))),
        [selectedIds, visibleIds]
    );

    const handleViewStatement = (row: AccountRow) => {
        setSelectedStatementRow(row);
        setIsViewStatementModalOpen(true);
    };

    const handleBalanceTransfer = (row: AccountRow) => {
        setTransferSourceRow(row);
        setIsTransferModalOpen(true);
    };

    const handleUpdateAccount = async (id: string, is_active: boolean) => {   

        console.log("this is id", id);
        try {
            const response = await updateAccount({ id, is_active }).unwrap();
            console.log("this is response", response);
            toast.success(is_active ? "Account activated successfully" : "Account paused successfully");
        } catch (error) {
            console.error("Update account failed", error);
            toast.error("Failed to update account");
        }       
    };

    const columns = useMemo(() => accountManagementColumns(handleViewStatement, handleBalanceTransfer, handleUpdateAccount), []);

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (isError) return <div className="p-4">Failed to load accounts</div>;

    return (
        <div className="space-y-6">
            {/* Top Search & Action Section */}
            <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
                <div className="flex-1 max-w-2xl bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-900">Select Bank</label>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <CustomSearchInput
                                placeholder="Choose Bank to View Statements"
                                value={search}
                                onChange={setSearch}
                                className="w-full"
                                inputClassName="w-full rounded-lg border-gray-200 focus:border-[#FE5000]"
                            />
                        </div>
                        <AppButton
                            variantType="primary"
                            className="px-8 py-2.5 rounded-lg bg-[#FE5000] hover:bg-[#FE5000]/90 text-white font-bold"
                            onClick={() => { }}
                        >
                            View Statements
                        </AppButton>
                    </div>
                </div>

                <AppButton
                    variantType="primary"
                    className="px-10 py-3 rounded-lg bg-[#FE5000] hover:bg-[#FE5000]/90 text-white font-bold shadow-lg shadow-orange-200"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Create Account
                </AppButton>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <DataTable<AccountRow>
                    columns={columns}
                    data={filteredRows}
                    selectable
                    minWidth={1200}
                    getRowId={(row) => row.id}
                    selectedRowIds={cleanedSelectedIds}
                    onToggleRow={(rowId) => {
                        setSelectedIds((prev) =>
                            prev.includes(rowId)
                                ? prev.filter((id) => id !== rowId)
                                : [...prev, rowId]
                        );
                    }}
                    onToggleAll={(nextSelected) => setSelectedIds(nextSelected)}
                />
            </div>

            <CreateAccountModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />

            <ViewStatementModal
                isOpen={isViewStatementModalOpen}
                onClose={() => setIsViewStatementModalOpen(false)}
                account={selectedStatementRow}
            />

            <BalanceTransferModal
                isOpen={isTransferModalOpen}
                onClose={() => setIsTransferModalOpen(false)}
                allAccounts={accountList}
                sourceAccount={transferSourceRow}
            />
        </div>
    );
}
