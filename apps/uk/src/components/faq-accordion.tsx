"use client";

import { useState } from "react";

export type FaqItem = {
  question: string;
  answer: React.ReactNode;
  schemaAnswer?: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="faq-list">{items.map((item, index) => <details className="faq-item" open={open === index} key={item.question}><summary onClick={(event) => { event.preventDefault(); setOpen(open === index ? null : index); }}>{item.question}</summary><div className="faq-item__body">{item.answer}</div></details>)}</div>;
}
