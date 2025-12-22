import { useGetRiderByIdQuery } from "@/redux/features/api/riders/rider.api";
import React from "react";

interface Props {
  rid: string;
}

export default function RiderDetails({ rid }: Props) {
  const { data, isLoading, error } = useGetRiderByIdQuery(rid, {
    skip: !rid,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load rider</div>;

  console.log("Data is", data);

  return <div>this is rider data</div>;
}
