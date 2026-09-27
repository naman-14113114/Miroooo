'use client';

import React, { useState } from 'react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface ProductFaqsProps {
  isX2?: boolean;
}

const FAQS_X2: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What sets the Miroooo X2 toothbrush apart?',
    answer:
      'The Miroooo X2 delivers next-generation oral care with its revolutionary 45° wide-angle sweep vibration system and smart sensing chip. Compared to the older Miroooo X1, the X2 features a unibody pressure-sensitive button, an extended 90-day battery life, IPX7 full waterproof immersion, and an adaptive soft balance algorithm for 10x deeper plaque removal.',
  },
  {
    id: 'faq-2',
    question: 'How does the Miroooo X2 compare to the previous Miroooo X1?',
    answer:
      'While the original Miroooo X1 established our ultra-quiet acoustic standard, the Miroooo X2 adds active 45° sweeping oscillations (the Bass brushing method), increases battery endurance from 60 days to 90 days, integrates a seamless gapless touch button with intelligent halo glow, and includes dual home wall-mount & portable travel storage.',
  },
  {
    id: 'faq-3',
    question: 'Is the Miroooo X2 suitable for sensitive teeth and gums?',
    answer:
      'Absolutely! The Miroooo X2 is engineered with 90%+ rounded-tip bristles (0.12mm ultra-soft filament) and features an intelligent pressure sensor that automatically regulates vibration intensity if you press too hard, ensuring full gumline protection.',
  },
  {
    id: 'faq-4',
    question: 'How long does the battery last and how is it charged?',
    answer:
      'Powered by a high-capacity lithium battery cell, a single full charge lasts up to 90 days (180 brushing sessions). It charges rapidly using the included universal USB-C cable.',
  },
  {
    id: 'faq-5',
    question: 'What is your return policy?',
    answer:
      'Returns may be requested within 30 days of delivery for damaged, defective, incorrect, or missing items. Please contact our support team at support@trymiroooo.com or via our Contact Form to obtain written return authorization and instructions prior to sending any product back.',
  },
];

const FAQS_X1: FaqItem[] = [
  {
    id: 'faq-x1-1',
    question: 'How does the Miroooo X1 acoustic sonic cleaning work?',
    answer:
      'The Miroooo X1 generates 32,000 vibrations per minute using high-precision acoustic micro-vibrations, breaking down plaque between teeth and along the gumline without abrasive harshness.',
  },
  {
    id: 'faq-x1-2',
    question: 'How long does the Miroooo X1 battery last?',
    answer:
      'A single 2-hour Type-C USB charge provides up to 60 days of continuous twice-daily brushing. You can take it on long holidays without carrying a charger.',
  },
  {
    id: 'faq-x1-3',
    question: 'Is the Miroooo X1 fully waterproof?',
    answer:
      'Yes, the Miroooo X1 is IPX7 waterproof rated. You can use it in the shower and safely rinse the entire handle under running water.',
  },
  {
    id: 'faq-x1-4',
    question: 'What is included in the package?',
    answer:
      'Every Miroooo X1 includes the lightweight aluminium sonic toothbrush handle, 2x DuPont precision brush heads, a slim travel case, and a USB-C fast-charging cable.',
  },
  {
    id: 'faq-x1-5',
    question: 'What is your delivery and returns policy?',
    answer:
      'We provide free tracked UK delivery on all orders. Returns are accepted within 30 days of receipt for any defective or damaged items.',
  },
];

export function ProductFaqs({ isX2 = true }: ProductFaqsProps) {
  const faqs = isX2 ? FAQS_X2 : FAQS_X1;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      id="shopify-section-template--24203751129433__faq"
      className="shopify-section"
      style={{
        background: '#000000',
        color: '#ffffff',
        width: '100%',
        overflow: 'hidden',
        padding: 'clamp(4.5rem, 7vw, 7.5rem) 0',
        boxSizing: 'border-box',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', boxSizing: 'border-box', width: '100%' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2
            style={{
              fontFamily: "'GFS Didot', 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              margin: '0 0 1rem 0',
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Everything you need to know about {isX2 ? 'the new Miroooo X2 electric toothbrush' : 'the Miroooo X1 electric toothbrush'}, shipping, and return policies.
          </p>
        </div>

        {/* Full-Width FAQ Accordion List */}
        <div className="faq-accordion-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.id} className={`faq-card ${isOpen ? 'is-open' : ''}`} data-faq-card>
                <button
                  type="button"
                  className="faq-card__button"
                  aria-expanded={isOpen}
                  onClick={() => toggleIndex(index)}
                >
                  <span className="faq-card__question">{faq.question}</span>
                  <span className="faq-card__badge" aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <div
                  className="faq-card__panel"
                  style={{
                    display: isOpen ? 'block' : 'none',
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <div className="faq-card__panel-inner">
                    <div className="faq-card__divider"></div>
                    <div className="faq-card__answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
