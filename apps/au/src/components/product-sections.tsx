"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export type ProductFaqItem = { question: string; answer: string };

export function ProductFaq({ productName, intro, items }: { productName: string; intro: string; items: ProductFaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return <section className="product-faq" aria-labelledby={`${productName}-faq-title`}><div className="product-content"><div className="product-section-heading"><p>Support</p><h2 id={`${productName}-faq-title`}>Frequently Asked Questions</h2><span>{intro}</span></div><div className="product-faq__list">{items.map((item, index) => <article className={open === index ? "is-open" : undefined} key={item.question}><button type="button" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}><span>{item.question}</span><Plus aria-hidden="true" /></button><div><p>{item.answer}</p></div></article>)}</div></div></section>;
}
