'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  id: string;
  question: string;
  answerHtml: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is your return policy?',
    answerHtml: `
      <p>Returns may be requested within <strong>30 days of delivery</strong> for damaged, defective, incorrect, or missing items. Please contact our support team via our <a href="/pages/contact-us#contact-form">Contact Form</a> or email <a href="mailto:support@trymiroooo.com">support@trymiroooo.com</a> with photo or video evidence.</p>
      <p>You must obtain written return authorization and instructions prior to sending any product back. For full details on return eligibility, conditions, and procedures, please review our <a href="/policies/return-policy">Return Policy</a> and <a href="/policies/refund-policy">Refund Policy</a>.</p>
    `,
  },
  {
    id: 'faq-2',
    question: 'What is the UK shipping policy and delivery timeframe?',
    answerHtml: `
      <p>We provide <strong>free tracked UK delivery</strong> on qualifying orders. Orders are processed within <strong>1 to 3 business days</strong> and dispatched with a premier tracked courier service.</p>
      <p>Once dispatched, standard delivery transit takes <strong>7 to 20 business days</strong>. You will receive an automated dispatch notification with your tracking link as soon as the courier scans your parcel. Read our full <a href="/policies/shipping-policy">Shipping Policy</a> for complete details.</p>
    `,
  },
  {
    id: 'faq-3',
    question: 'How do I know which Miroooo toothbrush is right for me?',
    answerHtml: `
      <p>Choosing the right model depends on your routine and feature preferences:</p>
      <p>&bull; <strong><a href="/products/miroooo-x">Miroooo X1</a>:</strong> Our lightweight, minimalist sonic toothbrush designed for effortless everyday precision, featuring essential cleaning power, whisper-quiet operation, and long battery life.</p>
      <p>&bull; <strong><a href="/products/miroooo-x2">Miroooo X2</a>:</strong> Our flagship model crafted with an aerospace-grade aluminium body, offering multi-mode sonic cleaning routines, deeper plaque removal, and refined haptic quadrant pacing.</p>
      <p>Take our quick, interactive <a href="/pages/dentalcare-quiz">Dental Care Quiz</a> to compare X1 and X2 using your brushing preferences and daily routine. It provides general product guidance, not a dental diagnosis.</p>
    `,
  },
  {
    id: 'faq-4',
    question: 'How do I place my order?',
    answerHtml: `
      <p>Simply navigate to our <a href="/shop">Shop</a> or visit the dedicated <a href="/products/miroooo-x">Miroooo X1</a> or <a href="/products/miroooo-x2">Miroooo X2</a> product page. Choose your preferred color (Grey, Pink, or Silver), select your bundle, and click "Add to Cart".</p>
      <p>Follow the intuitive checkout steps to complete your purchase securely. We will prepare your package and keep you informed via email throughout processing and delivery.</p>
    `,
  },
  {
    id: 'faq-5',
    question: 'What are the shipping costs?',
    answerHtml: `
      <p>Standard tracked shipping is <strong>100% free</strong> across the United Kingdom. There are no additional handling fees or unexpected charges added at checkout.</p>
    `,
  },
  {
    id: 'faq-6',
    question: 'How do I care for and maintain my Miroooo toothbrush?',
    answerHtml: `
      <p>To keep your toothbrush in optimal condition, rinse the brush head thoroughly after each use and allow it to dry upright. Wipe the aluminium handle with a damp cloth as needed and recharge via USB-C when the battery indicator indicates low power.</p>
    `,
  },
  {
    id: 'faq-7',
    question: 'How often should I change brush heads and how do I clean my brush?',
    answerHtml: `
      <p>Dental professionals recommend replacing your brush head every <strong>3 months</strong> for optimal oral hygiene and plaque removal efficiency. Replacement brush heads can be ordered directly in our <a href="/shop">Shop</a>.</p>
      <p>To clean your toothbrush, rinse the brush head and handle under running water after each use and store it upright in an airy location to dry. Avoid storing damp handles in sealed travel cases for prolonged periods.</p>
    `,
  },
  {
    id: 'faq-8',
    question: 'Is the toothbrush waterproof and can I use it in the shower?',
    answerHtml: `
      <p>Yes! Both the <strong>Miroooo X1</strong> and <strong>Miroooo X2</strong> feature full <strong>IPX7 immersion waterproofing</strong>, allowing you to comfortably brush in the shower and safely rinse the entire device under running water.</p>
      <p>Always ensure the handle base and charging connection area are completely dry before connecting the toothbrush to the USB-C charging cable.</p>
    `,
  },
  {
    id: 'faq-9',
    question: "My tracking number isn't working or updating",
    answerHtml: `
      <p>Carrier tracking numbers typically take <strong>24 to 72 hours</strong> after courier handover to reflect initial package scans. If your tracking number still shows no movement after this period, email <a href="mailto:support@trymiroooo.com">support@trymiroooo.com</a> with your order number.</p>
    `,
  },
  {
    id: 'faq-10',
    question: 'What type of payments do you accept?',
    answerHtml: `
      <p>We accept all major payment methods including Visa, Mastercard, American Express, Maestro, JCB, PayPal, Apple Pay, and Google Pay. All transactions are billed in British Pounds (GBP).</p>
    `,
  },
  {
    id: 'faq-11',
    question: 'How secure is my personal and payment information?',
    answerHtml: `
      <p>We adhere to the highest global security and e-commerce encryption standards. Your payment details are encrypted end-to-end using <strong>256-bit SSL (Secure Sockets Layer)</strong> technology.</p>
      <p>Your payment credentials are processed directly through certified PCI-DSS Level 1 compliant payment gateways and are never stored on our servers.</p>
    `,
  },
  {
    id: 'faq-12',
    question: 'How can I contact customer service?',
    answerHtml: `
      <p>Our customer care team is available to assist you with order inquiries, product guidance, and customer support. You can reach us via our <a href="/pages/contact-us#contact-form">Contact Form</a> or by emailing <a href="mailto:support@trymiroooo.com">support@trymiroooo.com</a>.</p>
      <p>Our support desk is open Monday to Friday, 9:00 AM – 6:00 PM GMT.</p>
    `,
  },
];

export function FaqsPage() {
  const [openId, setOpenId] = useState<string>('faq-1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <div className="faq-page-wrapper">
      {/* Ambient Glows */}
      <div className="faq-ambient-glow faq-ambient-glow--1" aria-hidden="true" />
      <div className="faq-ambient-glow faq-ambient-glow--2" aria-hidden="true" />

      <div className="faq-content-wrap">
        {/* Header */}
        <header className="faq-header">
          <div className="faq-eyebrow-badge">
            <span className="faq-eyebrow-badge__dot" aria-hidden="true" />
            Help Center
          </div>
          <h1 className="faq-title">
            Frequently Asked <em>Questions</em>
          </h1>
          <p className="faq-lead">
            Find fast answers to shipping queries, return policies, and Miroooo electric toothbrush care below.
          </p>
        </header>

        {/* Accordion FAQ List */}
        <div className="faq-accordion-list" role="region" aria-label="Frequently Asked Questions Accordion">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            const triggerId = `faq-trigger-${index + 1}`;
            const panelId = `faq-answer-${index + 1}`;

            return (
              <div key={faq.id} className={`faq-card ${isOpen ? 'is-open' : ''}`} data-faq-card>
                <button
                  type="button"
                  className="faq-card__button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  id={triggerId}
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
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  className="faq-card__panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                >
                  <div className="faq-card__panel-inner">
                    <div className="faq-card__divider" />
                    <div
                      className="faq-card__answer"
                      dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Help Center Box */}
        <div className="faq-helpbox">
          <h3 className="faq-helpbox__title">Still have questions?</h3>
          <p className="faq-helpbox__subtitle">Our support desk is here for you Mon – Fri: 9:00 AM – 6:00 PM GMT.</p>

          <div className="faq-helpbox__actions">
            <a href="mailto:support@trymiroooo.com" className="faq-action-btn faq-action-btn--email">
              <span className="btn-fill" data-fill />
              <span className="btn-text">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>support@trymiroooo.com</span>
              </span>
            </a>

            <Link href="/pages/contact-us#contact-form" className="faq-action-btn faq-action-btn--ticket">
              <span className="btn-fill" data-fill />
              <span className="btn-text">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Open Support Ticket</span>
              </span>
            </Link>
          </div>

          <div className="faq-helpbox__social">
            <span className="faq-helpbox__social-label">Connect with us:</span>
            <div className="faq-helpbox__social-links">
              <a
                href="https://www.facebook.com/profile.php?id=61593351131893"
                className="faq-social-link"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/miroooo_official/"
                className="faq-social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCVMc0L8ja_3DCL_bI3dczrQ"
                className="faq-social-link"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
