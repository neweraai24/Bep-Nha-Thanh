import type { Metadata } from "next";
import { LunchClient } from "./LunchClient";

export const metadata: Metadata = {
  title: "Thực đơn bữa trưa",
  description: "Thực đơn bữa trưa theo tuần của Bếp Nhà Thanh: mỗi ngày 3 món, ghi rõ kcal, Protein, Carb, Fat. Giao 11:00–12:30.",
};

export default function Page() {
  return <LunchClient />;
}
