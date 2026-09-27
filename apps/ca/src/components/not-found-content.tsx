import Link from "next/link";

export function NotFoundContent() { return <main id="main"><section className="page-hero not-found-hero"><div className="site-shell"><p className="eyebrow eyebrow--light">404</p><h1>That page has moved.</h1><p className="lead lead--light">The routine is still here. Head back to the collection or choose a model below.</p><div className="button-row"><Link className="button button--light" href="/shop">Shop Miroooo</Link><Link className="button button--outline not-found-home" href="/">Return home</Link></div></div></section></main>; }
