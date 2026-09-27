import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return <header className="page-hero"><div className="site-shell"><p className="eyebrow eyebrow--light">{eyebrow}</p><h1>{title}</h1><p className="lead lead--light">{lead}</p></div></header>;
}

export function ProductCard({ dark = false, href, image, alt, eyebrow, name, copy, price, compareAt }: { dark?: boolean; href: string; image: string; alt: string; eyebrow: string; name: string; copy: string; price: string; compareAt?: string }) {
  return (
    <article className={`product-card reveal${dark ? " product-card--dark" : ""}`}>
      <Link className="product-card__media" href={href}><Image src={image} alt={alt} width={1000} height={1000} /></Link>
      <div className="product-card__body"><div><p className={`eyebrow${dark ? " eyebrow--light" : ""}`}>{eyebrow}</p><h3>{name}</h3><p>{copy}</p><Link className="arrow-link" href={href}>Choose {name} <span aria-hidden="true">→</span></Link></div><div className="price">{price} {compareAt && <s>{compareAt}</s>}</div></div>
    </article>
  );
}

export function CtaPanel({ eyebrow, title, copy, href, label }: { eyebrow: string; title: string; copy: string; href: string; label: string }) {
  return <div className="cta-panel reveal"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{copy}</p></div><Link className="button" href={href}>{label}</Link></div>;
}

export type PolicySection = { id?: string; eyebrow?: string; title?: string; body: ReactNode };

export function PolicyPage({ hero, nav, sections }: { hero: { eyebrow: string; title: string; lead: string }; nav: ReadonlyArray<readonly [string, string]>; sections: PolicySection[] }) {
  return <main id="main"><PageHero {...hero} /><section className="section section--paper"><div className="site-shell content-layout"><aside className="content-nav"><strong>On this page</strong>{nav.map(([href, label]) => <a href={href} key={href}>{label}</a>)}</aside><article className="prose">{sections.map((section, index) => <section id={section.id} key={section.id ?? index}>{section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}{section.title && <h2>{section.title}</h2>}{section.body}</section>)}</article></div></section></main>;
}
