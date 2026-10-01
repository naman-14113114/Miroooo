import Link from 'next/link';

const cards = [
  {
    href: '/guides/sonic-vs-oscillating-electric-toothbrush',
    kicker: 'Choosing a brush · 7 min',
    title: 'Sonic vs oscillating electric toothbrushes',
    description: 'How the two movements differ, what the evidence does and does not say, and what to prioritise.',
    action: 'Read the comparison →',
  },
  {
    href: '/guides/how-often-replace-electric-toothbrush-head',
    kicker: 'Brush care · 5 min',
    title: 'When to replace an electric toothbrush head',
    description: 'The three-to-four-month rule, signs of wear and how to make reminders easier.',
    action: 'Read the guide →',
  },
  {
    href: '/guides/electric-toothbrush-travel-guide',
    kicker: 'Travel · 6 min',
    title: 'Travelling with an electric toothbrush',
    description: 'A practical packing checklist covering charging, hygiene and current battery guidance.',
    action: 'Pack with confidence →',
  },
  {
    href: '/guides/how-to-use-two-minute-toothbrush-timer',
    kicker: 'Technique · 6 min',
    title: 'How to use a two-minute toothbrush timer',
    description: 'Turn two minutes into four simple zones and give every surface deliberate attention.',
    action: 'Build the routine →',
  },
];

export function GuidesListPage() {
  return (
    <main id="main" style={{ background: '#fff', color: '#111311' }}>
      <header className="guide-hero">
        <div className="guide-shell guide-hero__inner">
          <p className="guide-kicker">Miroooo guides</p>
          <h1>Better brushing, clearly explained.</h1>
          <p className="guide-deck">
            Practical answers to the questions people ask before and after choosing an electric toothbrush—checked against recognised health and safety sources.
          </p>
        </div>
      </header>
      <section className="guide-shell guide-grid" aria-label="Electric toothbrush guides">
        {cards.map((card) => (
          <Link className="guide-card" href={card.href} key={card.href}>
            <span className="guide-card__kicker">{card.kicker}</span>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <span className="guide-card__link">{card.action}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
