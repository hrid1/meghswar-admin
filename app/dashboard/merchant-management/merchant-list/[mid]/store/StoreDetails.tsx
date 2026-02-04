'use client';
import { useParams } from "next/navigation";

export default function StoreDetails() {

    const params = useParams<{ sid: string }>();
    console.log("this store id", params.sid)

  return (
    <div >
      store id : {params.sid}
    </div>
  )
}
