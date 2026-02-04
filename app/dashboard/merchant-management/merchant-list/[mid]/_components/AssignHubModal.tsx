"use client";

import React, { useEffect, useMemo, useState } from "react";
import CustomModal from "@/components/reusable/CustomModal";
import { useGetHubsQuery, useAssignHubToStoreMutation } from "@/redux/features/hubs/hubsApi";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { AppButton } from "@/components/reusable/CustomButton";
import { toast } from "sonner";

type AssignHubModalProps = {
  isOpen: boolean;
  onClose: () => void;
  store: { id: string | number; storeName?: string } | null;
  onSuccess?: () => void;
};

export default function AssignHubModal({ isOpen, onClose, store, onSuccess }: AssignHubModalProps) {
  const { data: hubsData, isLoading: hubsLoading, isError: hubsError } = useGetHubsQuery(undefined, {
    skip: !isOpen,
  });

  // console.log("Hubs data:", hubsData);

  const hubs = useMemo(() => {
    const raw = hubsData?.data;

    // Backend responses have varied between:
    // - Hub[] (direct array)
    // - { data: Hub[] }
    // - { data: { hubs: Hub[] } }
    // - { hubs: Hub[] }
    // Keep this resilient so the Select always gets a list when available.
    if (Array.isArray(hubsData)) return hubsData as any[];
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.hubs)) return raw.hubs;
    if (Array.isArray((hubsData as any)?.hubs)) return (hubsData as any).hubs;

    return [];
  }, [hubsData]);


  const [assignHubToStore, { isLoading: assigning }] = useAssignHubToStoreMutation();

  const [selectedHubId, setSelectedHubId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSelectedHubId(null);
      setSearch("");
    }
  }, [isOpen]);

  const filteredHubs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!hubs || !Array.isArray(hubs)) return [];
    if (!q) return hubs;
    return hubs.filter((h: any) => {
      const name = (h.branch_name || h.branchName || h.hubCode || "").toString().toLowerCase();
      const code = (h.hub_code || h.hubCode || "").toString().toLowerCase();
      const area = (h.area || h.area_name || "").toString().toLowerCase();
      return name.includes(q) || code.includes(q) || area.includes(q);
    });
  }, [hubs, search]);

  const isUUID = (s?: string | null) => {
    if (!s) return false;
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
  };

  const storeIdForApi = (() => {
    // Try known fields commonly used for uuid identifiers
    const candidate = store ? String((store as any).id ?? (store as any)._id ?? (store as any).store_id ?? (store as any).uuid ?? "") : "";
    return candidate;
  })();

  const isStoreIdValid = isUUID(storeIdForApi);
  const isHubIdValid = isUUID(selectedHubId ?? undefined);

  const handleAssign = async () => {
    if (!store || !selectedHubId) return;

    if (!isStoreIdValid) {
      toast.error("Cannot assign hub: store id is not a valid UUID. Use a store with a UUID id.");
      return;
    }

    if (!isHubIdValid) {
      toast.error("Cannot assign hub: selected hub id is not a valid UUID.");
      return;
    }

    try {
      await assignHubToStore({ storeId: String(storeIdForApi), hubId: String(selectedHubId) }).unwrap();
      toast.success("Hub assigned successfully");
      onClose();
      onSuccess?.();
    } catch (err: any) {
      const msg = err?.data?.message || err?.message || "Failed to assign hub. Try again.";
      toast.error(msg);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={store ? `Assign Hub to ${store.storeName ?? `Store ${store.id}`}` : "Assign Hub"}
      description="Select a hub from the list and confirm to assign it to the store."
      className="max-w-2xl"
    >
          <div className="space-y-4">
          <div className="space-y-1">
          <label className="block text-sm text-gray-500 mb-2">Choose Hub</label>

          <div>
            {/* shadcn Select with an inline search box inside the dropdown */}
            <Select
              onValueChange={(val) => setSelectedHubId(val)}
              value={selectedHubId ?? undefined}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={hubsLoading ? "Loading hubs..." : "Select hub"} />
              </SelectTrigger>

              <SelectContent className="w-full max-h-56 overflow-y-auto">
                <div className="sticky top-0 z-10 bg-popover px-3 py-2 border-b">
                  <input
                    placeholder="Search hubs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-[#FF6B00] focus:outline-none"
                  />
                </div>

                <div className="p-1">
                  {hubsLoading && <div className="text-sm text-gray-500 p-2">Loading hubs...</div>}

                  {hubsError && <div className="text-sm text-red-500 p-2">Failed to load hubs.</div>}

                  {!hubsLoading && Array.isArray(filteredHubs) && filteredHubs.length === 0 && (
                    <div className="text-sm text-gray-500 p-2">No hubs found.</div>
                  )}

                  {!hubsLoading && Array.isArray(filteredHubs) && (
                    <div className="flex flex-col">
                      {filteredHubs
                        .map((h: any) => ({
                          hubId: h?.id || h?._id || h?.hub_id || h?.hubId,
                          label:
                            h?.branch_name ||
                            h?.branchName ||
                            h?.hub_code ||
                            h?.hubCode ||
                            (h?.id || h?._id || h?.hub_id || h?.hubId ? `Hub ${h.id ?? h._id ?? h.hub_id ?? h.hubId}` : "Hub"),
                          raw: h,
                        }))
                        .filter((x) => x.hubId != null)
                        .map(({ hubId, label, raw }) => (
                          <SelectItem key={String(hubId)} value={String(hubId)} className="py-2" aria-label={label}>
                            <span className="text-sm font-semibold text-gray-900">{label}</span>
                          </SelectItem>
                        ))}
                    </div>
                  )}
                </div>
              </SelectContent>
            </Select>

            {/* Show warning if store id isn't a UUID to avoid backend errors */}
            {!isStoreIdValid && (
              <div className="mt-2 text-xs text-red-500">
                Store id is not a valid UUID. Assign cannot proceed until a store with a UUID id is used.
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md border border-gray-200 text-sm"
            onClick={onClose}
            disabled={assigning}
          >
            Cancel
          </button>
          <AppButton
            variantType="primary"
            className="px-4 py-2 text-sm"
            onClick={handleAssign}
            disabled={!selectedHubId || assigning}
          >
            {assigning ? "Assigning..." : "Assign Hub"}
          </AppButton>
        </div>
      </div>
    </CustomModal>
  );
}
