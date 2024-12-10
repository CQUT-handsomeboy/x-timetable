import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeStamp(timeString: string) {
  return dayjs(`2024-01-01 ${timeString}`, "YYYY-MM-DD HH:mm:ss").valueOf();
}
