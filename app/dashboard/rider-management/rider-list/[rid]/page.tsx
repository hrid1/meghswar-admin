"use client";

import { useParams } from "next/navigation";
import RiderDetails from "../_components/RiderDetails";

export default function Page() {
  const params = useParams<{ id: string }>();

  const rid = params.id ?? ""; // guaranteed string


  return <RiderDetails rid={rid} />;
}
