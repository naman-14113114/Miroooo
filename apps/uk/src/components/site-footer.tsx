import Link from "next/link";
import { Clock3, Headphones, ShieldCheck, Truck } from "lucide-react";

export function SiteFooter() {
  return (
    <>
      <aside className="service-strip" aria-label="Miroooo customer care">
        <div className="service-strip__item"><Headphones aria-hidden="true" /><div><strong>Customer support</strong><span>Real help when you need it</span></div></div>
        <div className="service-strip__item"><Truck aria-hidden="true" /><div><strong>Tracked UK delivery</strong><span>Free with every brush</span></div></div>
        <div className="service-strip__item"><ShieldCheck aria-hidden="true" /><div><strong>90-day home trial</strong><span>Take time to decide</span></div></div>
        <div className="service-strip__item"><Clock3 aria-hidden="true" /><div><strong>Two-year warranty</strong><span>Made for daily use</span></div></div>
      </aside>
      <footer className="site-footer">
        <div className="site-footer__main">
          <div className="site-footer__brand"><Link className="site-footer__logo" href="/" aria-label="Miroooo home">MIROOOO</Link><p>Quietly precise sonic care, designed around the everyday ritual.</p></div>
          <FooterColumn title="Shop" links={[["/products/miroooo-x", "Miroooo X"], ["/products/miroooo-x2", "Miroooo X2"], ["/shop", "Compare models"]]} />
          <FooterColumn title="Help" links={[["/faq", "FAQs"], ["/delivery-returns", "Delivery & returns"], ["/warranty", "Warranty"]]} />
          <FooterColumn title="Miroooo" links={[["/about", "Our approach"], ["/contact", "Contact"], ["/privacy", "Privacy"], ["/terms", "Terms"]]} />
        </div>
        <div className="site-footer__bottom"><span>© {new Date().getFullYear()} Miroooo</span><span>United Kingdom · GBP</span></div>
      </footer>
    </>
  );
}

function FooterColumn({ title, links }: { title: string; links: ReadonlyArray<readonly [string, string]> }) {
  return <div className="site-footer__column"><strong>{title}</strong>{links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}</div>;
}
