import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export const toNA = (v: any) =>
  v === undefined || v === null || v === "" ? "N/A" : v;