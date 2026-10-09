"use client";

import { useMemo, useState } from "react";
import { Minus, Phone, Plus, Search } from "lucide-react";
import { Button, Chip, Sticker } from "@/components/ui";
import { cn } from "@/components/cn";
import { FAQ_GROUPS, FAQS } from "@/lib/faq";
import { STORE } from "@/lib/data";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").toLowerCase();

export function FaqClient() {
  const [group, setGroup] = useState<string>("Tất cả");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(FAQS[0].q);

  const list = useMemo(() => {
    const q = norm(query.trim());
    return FAQS.filter((f) => (group === "Tất cả" || f.group === group) && (!q || norm(f.q + " " + f.a).includes(q)));
  }, [group, query]);

  return (
    <>
      <section className="wrap pt-10 pb-8 md:pt-16">
        <div className="flex flex-col items-start gap-4">
          <Sticker color="dua">Hỏi Bếp</Sticker>
          <h1 className="display display-l">Câu hỏi <span className="text-ot-chin">thường gặp</span></h1>
          <p className="max-w-[640px] text-lg text-socola-2 text-pretty">Chưa thấy câu bạn cần? Gọi Bếp, người nấu sẽ trả lời bạn.</p>
        </div>
      </section>

      <section className="wrap pb-16">
        <div className="mx-auto max-w-[820px]">
          <label className="relative mb-5 block">
            <span className="sr-only">Tìm câu hỏi</span>
            <Search size={20} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-socola-2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm: giao hàng, dị ứng, thanh toán…"
              className="h-13 w-full rounded-full border-2 border-socola bg-white pr-5 pl-12 text-[15px] outline-none focus:ring-2 focus:ring-khoai-mon"
            />
          </label>
          <div role="group" aria-label="Nhóm câu hỏi" className="scrollbar-none -mx-4 mb-8 flex gap-2.5 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0">
            {["Tất cả", ...FAQ_GROUPS].map((g) => (
              <Chip key={g} selected={group === g} onClick={() => setGroup(g)}>{g}</Chip>
            ))}
          </div>

          {list.length ? (
            <div className="flex flex-col gap-3">
              {list.map((f) => {
                const isOpen = open === f.q;
                return (
                  <div key={f.q} className={cn("overflow-hidden rounded-card border-2 border-socola bg-white", isOpen && "shadow-hard")}>
                    <h2>
                      <button
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : f.q)}
                        className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-semibold md:px-6"
                      >
                        <span>{f.q}</span>
                        {isOpen ? <Minus size={20} className="shrink-0" /> : <Plus size={20} className="shrink-0" />}
                      </button>
                    </h2>
                    {isOpen && <p className="max-w-[720px] px-5 pb-5 leading-relaxed text-socola-2 md:px-6">{f.a}</p>}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="py-12 text-center text-socola-2">Không có câu nào khớp “{query}”. Thử từ khoá khác hoặc gọi Bếp nhé.</p>
          )}
        </div>
      </section>

      <section className="border-t-2 border-socola bg-cai-non py-14 md:py-20">
        <div className="wrap flex flex-col items-center gap-6 text-center">
          <h2 className="display display-m max-w-[640px]">Vẫn còn thắc mắc? Gọi Bếp</h2>
          <p className="text-lg">{STORE.hours} mỗi ngày · {STORE.short}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={`tel:${STORE.tel}`} size="lg"><Phone size={20} />{STORE.phone}</Button>
            <Button href="/bua-trua" variant="outline" size="lg">Xem thực đơn trưa</Button>
          </div>
        </div>
      </section>
    </>
  );
}
