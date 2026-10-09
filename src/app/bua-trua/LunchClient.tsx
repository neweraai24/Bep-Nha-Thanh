"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Clock, Leaf, Plus, ShoppingBag, Truck } from "lucide-react";
import { Button, Sticker } from "@/components/ui";
import { MacroRing } from "@/components/MacroRing";
import { cn } from "@/components/cn";
import { useCart } from "@/lib/cart";
import { DAY_LABELS, LUNCH_SCHEDULE, getDish, num, vnd, type Dish } from "@/lib/data";

const fmtDate = (d: Date) => `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;

function mondayOf(base: Date, weekOffset: number) {
  const d = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  const dow = (d.getDay() + 6) % 7; // 0 = Thứ 2
  // Cuối tuần thì hiển thị tuần kế tiếp làm "tuần này".
  const shift = d.getDay() === 0 || d.getDay() === 6 ? 7 : 0;
  d.setDate(d.getDate() - dow + shift + weekOffset * 7);
  return d;
}

function LunchCard({ dish }: { dish: Dish }) {
  const { cart, add } = useCart();
  const n = cart[dish.id] || 0;
  const vegan = dish.tags.includes("vegan");
  return (
    <article className="flex flex-col items-center gap-4 rounded-card border-2 border-socola bg-white p-5 text-center shadow-hard">
      <Link href={`/thuc-don/${dish.id}`} className="flex flex-col items-center gap-4">
        <MacroRing size={190} protein={dish.p} carb={dish.c} fat={dish.f} className="max-w-full">
          <Image src={dish.image} alt={dish.name} width={1600} height={893} sizes="400px" className="size-full scale-[1.12] object-cover" />
        </MacroRing>
        <div className="flex flex-col items-center gap-1.5">
          {vegan && (
            <span className="label inline-flex items-center gap-1 rounded-full bg-cai-non px-2.5 py-0.5 text-[11px]">
              <Leaf size={12} aria-hidden="true" />Món chay
            </span>
          )}
          <h3 className="text-lg font-bold">{dish.name}</h3>
          <p className="text-[13px] text-socola-2 text-pretty">{dish.desc}</p>
        </div>
      </Link>
      <div className="w-full rounded-btn bg-kem-lom p-3 text-[13px]">
        <b className="num block text-base">{num(dish.kcal)} kcal</b>
        <span className="flex flex-wrap justify-center gap-x-3 text-socola-2">
          <span><i className="mr-1 inline-block size-2 rounded-full bg-macro-protein" />Protein {dish.p}g</span>
          <span><i className="mr-1 inline-block size-2 rounded-full bg-macro-carb" />Carb {dish.c}g</span>
          <span><i className="mr-1 inline-block size-2 rounded-full bg-macro-fat" />Fat {dish.f}g</span>
        </span>
      </div>
      <div className="mt-auto flex w-full items-center justify-between gap-3">
        <b className="num text-xl text-cta">{vnd(dish.price)}</b>
        <Button size="sm" onClick={() => add(dish.id)}>
          {n ? <Check size={16} /> : <Plus size={16} />}
          {n ? `Thêm · ${n}` : "Thêm"}
        </Button>
      </div>
    </article>
  );
}

export function LunchClient() {
  const { count, total } = useCart();
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState(0);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    setToday(now);
    const dow = (now.getDay() + 6) % 7;
    setDay(now.getDay() === 0 || now.getDay() === 6 ? 0 : Math.min(dow, 4));
  }, []);

  const monday = today ? mondayOf(today, week) : null;
  const dateOf = (i: number) => {
    if (!monday) return "";
    const d = new Date(monday);
    d.setDate(d.getDate() + i);
    return fmtDate(d);
  };
  // Tuần sau xoay lịch để món không lặp y hệt tuần này.
  const dishes = LUNCH_SCHEDULE[(day + week * 2) % 5].map(getDish).filter((d): d is Dish => !!d);

  return (
    <>
      <section className="wrap pt-10 pb-24 md:pt-16">
        <div className="mb-8 flex flex-col items-start gap-4">
          <Sticker color="cai">Bữa trưa</Sticker>
          <h1 className="display display-l">Thực đơn bữa trưa</h1>
          <p className="max-w-[640px] text-lg text-socola-2 text-pretty">
            Mỗi ngày Bếp nấu 3 món, có một món chay. Gạo lứt nấu 6 giờ sáng, giao tới bàn bạn trong khung 11:00–12:30.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <li className="flex items-center gap-2"><Clock size={18} />Nhận đơn tới 10:30</li>
            <li className="flex items-center gap-2"><Truck size={18} />Phí giao {vnd(19000)}</li>
          </ul>
        </div>

        {/* Chọn tuần */}
        <div className="mb-4 flex items-center gap-3">
          <button aria-label="Tuần này" disabled={week === 0} onClick={() => setWeek(0)} className="grid size-10 place-items-center rounded-full border-2 border-socola bg-white disabled:opacity-40"><ChevronLeft size={20} /></button>
          <div role="tablist" aria-label="Chọn tuần" className="flex gap-2 rounded-full bg-kem-lom p-1">
            {["Tuần này", "Tuần sau"].map((l, i) => (
              <button key={l} role="tab" aria-selected={week === i} onClick={() => setWeek(i)} className={cn("flex flex-col items-start rounded-full px-5 py-2 text-left transition-colors", week === i ? "bg-socola text-kem-gao" : "text-socola")}>
                <b className="text-sm">{l}</b>
                <span className={cn("text-xs tabular-nums", week === i ? "text-[#E2D6C6]" : "text-socola-2")}>
                  {today ? `${fmtDate(mondayOf(today, i))} – ${fmtDate(new Date(mondayOf(today, i).getTime() + 4 * 864e5))}` : " "}
                </span>
              </button>
            ))}
          </div>
          <button aria-label="Tuần sau" disabled={week === 1} onClick={() => setWeek(1)} className="grid size-10 place-items-center rounded-full border-2 border-socola bg-white disabled:opacity-40"><ChevronRight size={20} /></button>
        </div>

        {/* Chọn ngày */}
        <div role="tablist" aria-label="Chọn ngày" className="scrollbar-none -mx-4 mb-10 flex gap-2.5 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {DAY_LABELS.map((l, i) => (
            <button
              key={l}
              role="tab"
              aria-selected={day === i}
              onClick={() => setDay(i)}
              className={cn("flex min-w-[88px] flex-col items-center rounded-card border-2 border-socola px-4 py-2.5 transition-colors", day === i ? "bg-xoai shadow-hard" : "bg-white")}
            >
              <b className="text-[15px]">{l}</b>
              <span className="text-xs tabular-nums text-socola-2">{dateOf(i) || " "}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dishes.map((d) => <LunchCard key={`${week}-${day}-${d.id}`} dish={d} />)}
        </div>

        <p className="mt-8 text-sm text-socola-2">
          Lịch món là bản mẫu, Bếp sẽ cập nhật theo tuần. Số liệu dinh dưỡng tính theo khẩu phần chuẩn, sai số khoảng 10%. Muốn xem mọi món? <Link href="/thuc-don" className="font-semibold text-cta underline underline-offset-4">Tất cả món</Link>.
        </p>
      </section>

      <div aria-hidden={!count} className={`fixed inset-x-3 bottom-3 z-30 mx-auto flex max-w-[720px] items-center justify-between gap-4 rounded-card border-2 border-socola bg-socola px-5 py-3 text-kem-gao shadow-hard transition duration-300 ease-out md:bottom-6 ${count ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0"}`}>
        <span className="flex items-center gap-2.5"><ShoppingBag size={22} /><b className="num">{count} món · {vnd(total)}</b></span>
        <Button href="/thanh-toan">Xem giỏ <ArrowRight size={18} /></Button>
      </div>
    </>
  );
}
