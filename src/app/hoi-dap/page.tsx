import type { Metadata } from "next";
import { FaqClient } from "./FaqClient";
import { FAQS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp",
  description: "Giải đáp về đặt món, bữa ăn, dinh dưỡng và giao hàng của Bếp Nhà Thanh.",
};

export default function Page() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <FaqClient />
    </>
  );
}
