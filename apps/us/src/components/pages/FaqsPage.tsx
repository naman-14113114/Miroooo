'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What sets the Miroooo X2 apart from standard electric toothbrushes?',
    answer:
      'The Miroooo X2 features a revolutionary 45° dynamic Bass sweep oscillation system combined with an acoustic linear motor. Unlike standard rotating or vibrating brushes that merely oscillate back and forth, the Miroooo X2 sweeps up and down along the gumline at the dentist-recommended 45-degree angle to lift plaque from interdental gaps while protecting delicate enamel.',
  },
  {
    id: 'faq-2',
    question: 'How does the Miroooo X1 differ from the Miroooo X2?',
    answer:
      'The Miroooo X1 is our ultralight acoustic classic (51g unibody aluminum, 32,000 VPM acoustic sonic motor, 60+ days battery life, and 3 standard cleaning modes). The flagship Miroooo X2 introduces 45° Bass sweeping oscillations, 40,000 VPM high-torque motor, smart 360° red halo pressure feedback, 90-day battery life, and an included luxury hard travel case and wall mount.',
  },
  {
    id: 'faq-3',
    question: 'How long does the battery last and how do I charge it?',
    answer:
      'The Miroooo X2 delivers up to 90 days of twice-daily brushing on a single charge, while the Miroooo X1 delivers 60+ days. Both models charge via universal USB-C, completely eliminating the need for bulky bathroom charging docks.',
  },
  {
    id: 'faq-4',
    question: 'Are Miroooo brushes suitable for sensitive teeth, crowns, or braces?',
    answer:
      'Yes, absolutely. Both Miroooo brushes feature high-density DuPont end-rounded bristles that have undergone micro-diamond polishing. The Miroooo X2 also features an integrated intelligent pressure sensor that instantly reduces vibration if excessive pressure is applied.',
  },
  {
    id: 'faq-5',
    question: 'How often should I replace the brush heads?',
    answer:
      'Dentists recommend replacing your toothbrush head every 3 months. Replacement heads for Miroooo X1 and Miroooo X2 are available in convenient 2-packs on our website.',
  },
  {
    id: 'faq-6',
    question: 'What is your shipping and delivery policy?',
    answer:
      'We offer Free Tracked US Delivery on all orders. Orders are processed within 1–3 business days, with standard transit taking 7–20 business days via USPS / FedEx.',
  },
  {
    id: 'faq-7',
    question: 'What is your return and refund policy?',
    answer:
      'We offer a 30-day return policy for damaged, defective, or incorrect items. If you experience any issues with your order, simply contact our US support team at support@trymiroooo.com for immediate assistance.',
  },
];

export function FaqsPage() {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-6']);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="faq-page-wrapper">
      <div className="faq-ambient-glow faq-ambient-glow--1" aria-hidden="true"></div>
      <div className="faq-ambient-glow faq-ambient-glow--2" aria-hidden="true"></div>

      <div className="faq-content-wrap">
        {/* Header */}
        <div className="faq-header">
          <div className="faq-eyebrow-badge">
            <span className="faq-eyebrow-badge__dot" aria-hidden="true"></span>
            Help Center
          </div>
          <h1 className="faq-title">
            Frequently Asked <em>Questions</em>
          </h1>
          <p className="faq-lead">
            Find fast answers to questions regarding our electric toothbrushes, shipping, replacement heads, and policies.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="faq-accordion-list">
          {FAQS.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div key={faq.id} className={`faq-card ${isOpen ? 'is-open' : ''}`} data-faq-card>
                <button
                  type="button"
                  className="faq-card__button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(faq.id)}
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
                        transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
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

        {/* Support Help Box */}
        <div className="faq-help-box" style={{ marginTop: '56px', padding: '36px 28px', background: '#e6e6e6', borderRadius: '24px', textAlign: 'center', color: '#111111' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 10px 0', color: '#111111' }}>Still have questions?</h2>
          <p style={{ fontSize: '15px', color: '#666666', maxWidth: '480px', margin: '0 auto 24px auto', lineHeight: 1.5 }}>
            Our US customer support team is available Monday through Friday (9:00 AM – 5:00 PM EST) to help.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
            <Link className="button button--primary" href="/pages/contact-us" style={{ margin: 0 }}>
              <span className="btn-fill" data-fill></span>
              <span className="btn-text">Contact Support <span aria-hidden="true">→</span></span>
            </Link>
            <a className="button button--secondary" href="mailto:support@trymiroooo.com" style={{ margin: 0 }}>
              <span className="btn-fill" data-fill></span>
              <span className="btn-text">Email support@trymiroooo.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
