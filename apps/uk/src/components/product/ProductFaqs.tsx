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
    "id": "miroooo-x2-faq-1",
    "question": "What sets the Miroooo X2 toothbrush apart?",
    "answer": "<p>The Miroooo X2 delivers next-generation oral care with its revolutionary 45° wide-angle sweep vibration system and smart sensing chip. Compared to the older Miroooo X1, the X2 features a unibody pressure-sensitive button, an extended 90-day battery life, IPX7 full waterproof immersion, and an adaptive soft balance algorithm for 10x deeper plaque removal.</p>"
  },
  {
    "id": "miroooo-x2-faq-2",
    "question": "How does the Miroooo X2 compare to the previous Miroooo X1?",
    "answer": "<p>While the original Miroooo X1 established our ultra-quiet acoustic standard, the Miroooo X2 adds active 45° sweeping oscillations (the Bass brushing method), increases battery endurance from 60 days to 90 days, integrates a seamless gapless touch button with intelligent halo glow, and includes dual home wall-mount &amp; portable travel storage.</p>"
  },
  {
    "id": "miroooo-x2-faq-3",
    "question": "Is the Miroooo X2 suitable for sensitive teeth and gums?",
    "answer": "<p>Absolutely! The Miroooo X2 is engineered with 90%+ rounded-tip bristles (0.12mm ultra-soft filament) and features an intelligent pressure sensor that automatically regulates vibration intensity if you press too hard, ensuring full gumline protection.</p>"
  },
  {
    "id": "miroooo-x2-faq-4",
    "question": "How long does the battery last and how is it charged?",
    "answer": "<p>Powered by a high-capacity lithium battery cell, a single full charge lasts up to 90 days (180 brushing sessions). It charges rapidly using the included universal USB-C cable.</p>"
  },
  {
    "id": "miroooo-x2-faq-5",
    "question": "What is your return policy?",
    "answer": "<p>Returns may be requested within 30 days of delivery for damaged, defective, incorrect, or missing items. Please contact our support team at <a href=\"mailto:support@trymiroooo.com\">support@trymiroooo.com</a> or via our <a href=\"/pages/contact-us#contact-form\">Contact Form</a> to obtain written return authorization and instructions prior to sending any product back.</p>"
  }
];

const FAQS_X1: FaqItem[] = [
  {
    "id": "miroooo-x-faq-1",
    "question": "What sets Miroooo X1 apart?",
    "answer": "<p>Miroooo X1 offers premium oral care with style. Powered by advanced acoustic technology with 32,000 vibrations per minute, it removes up to 10x more plaque than manual brushing, with an elegant unibody aluminium design, 60-day battery life, and ultra-quiet operation.</p>"
  },
  {
    "id": "miroooo-x-faq-2",
    "question": "Is an electric toothbrush better than a manual toothbrush?",
    "answer": "<p>Yes, clinical studies prove that electric toothbrushes are significantly more effective at eliminating plaque and improving gum health. Miroooo X1 delivers 32,000 micro-vibrations per minute, cleaning deeper and far more consistently than manual brushing.</p>"
  },
  {
    "id": "miroooo-x-faq-3",
    "question": "Is Miroooo X1 suitable for sensitive teeth and gums?",
    "answer": "<p>Absolutely! Miroooo X1 features multiple brushing modes, including a dedicated sensitive mode paired with ultra-soft DuPont rounded bristles to gently massage gums while protecting delicate tooth enamel.</p>"
  },
  {
    "id": "miroooo-x-faq-4",
    "question": "Can I subscribe for replacement brush heads?",
    "answer": "<p>Yes, replacement brush head sets are readily available on our site or via recurring delivery so you always have fresh, hygienic bristles ready every 3 months.</p>"
  },
  {
    "id": "miroooo-x-faq-5",
    "question": "What is your return policy?",
    "answer": "<p>Returns may be requested within 30 days of delivery for damaged, defective, incorrect, or missing items. Please contact our support team at <a href=\"mailto:support@trymiroooo.com\">support@trymiroooo.com</a> or via our <a href=\"/pages/contact-us#contact-form\">Contact Form</a> to obtain written return authorization and instructions prior to sending any product back.</p>"
  }
];

const FAQS_FLOSSER: FaqItem[] = [
  {
    "id": "miroooo-flosser-faq-1",
    "question": "What are the 4 operating modes and how do I choose?",
    "answer": "<p>The Miroooo Water Flosser features 4 intelligent cleaning modes tailored to your oral care needs: <strong>Clean / Normal (90 PSI)</strong> for everyday deep interdental plaque and food debris removal; <strong>White / Intense (138 PSI)</strong> for high-frequency stain clearing, deep tartar defence, and extrinsic coffee/tea stain lifting; <strong>Nurse / Pulse (60–100 PSI)</strong> for rhythmic intermittent hydro-massage to stimulate periodontal microcirculation and soothe sensitive gums; and <strong>Soft (60 PSI)</strong> low-turbulence gentle pressure engineered for first-time users, sensitive teeth, braces, and veneers. The one-touch selector button easily cycles through modes with an automatic memory chip that recalls your preferred setting.</p>"
  },
  {
    "id": "miroooo-flosser-faq-2",
    "question": "How often should I use the Miroooo Water Flosser?",
    "answer": "<p>Dentists recommend using the Miroooo Water Flosser once to twice daily, ideally in the evening alongside your daily oral care routine. Daily hydro-flossing dislodges plaque biofilm, bacteria, and trapped food particles from deep interproximal gaps and periodontal pockets where standard string floss and manual cleaning cannot reach, actively preventing gingivitis, bleeding, and interdental decay.</p>"
  },
  {
    "id": "miroooo-flosser-faq-3",
    "question": "What is the water pressure range?",
    "answer": "<p>The Miroooo Water Flosser delivers a precision-calibrated pressure range of <strong>60 to 138 PSI</strong> with <strong>1,400 to 2,000 micro-pulses per minute</strong>. It is powered by a high-precision medical-grade stainless steel piston pump that provides consistent fluid velocity across all water levels without pressure stuttering or power drop-off.</p>"
  },
  {
    "id": "miroooo-flosser-faq-4",
    "question": "Is the Miroooo Water Flosser waterproof?",
    "answer": "<p>Yes! The Miroooo Water Flosser is certified <strong>IPX7 fully immersion waterproof</strong> with dual-layer ultrasonic silicone perimeter seals. It is 100% submersible and completely safe for shower use, and the entire device can be easily rinsed clean under running tap water. Always ensure the USB-C charging port cover is securely sealed before water exposure.</p>"
  },
  {
    "id": "miroooo-flosser-faq-5",
    "question": "How long does the battery last?",
    "answer": "<p>Powered by a high-density <strong>2000mAh lithium-ion battery cell</strong>, a single 3-hour USB-C fast charge provides <strong>up to 60 days of daily use</strong> (based on standard 1-minute daily sessions). Universal USB-C fast charging allows you to power up using any standard charger, laptop, or power bank with no bulky charging cradles required.</p>"
  },
  {
    "id": "miroooo-flosser-faq-6",
    "question": "What are the 7 nozzles used for?",
    "answer": "<p>Every complete set includes 7 specialized 360° quick-release nozzles:</p><ul><li><strong>Standard Cleaning Nozzle:</strong> 0.6mm calibrated jet for everyday interdental and gumline flossing.</li><li><strong>Interdental Nozzle:</strong> Slim 0.45mm needle profile to access tight spaces and crowded contacts.</li><li><strong>Periodontal Pocket Nozzle:</strong> Soft silicone elastomeric tip for gentle subgingival sulcus irrigation.</li><li><strong>Orthodontic Nozzle:</strong> Specialized fine spray pattern for braces, archwires, and retainers.</li><li><strong>Tongue Coating Scraper Nozzle:</strong> Contoured spoon scraper with fan-spray water curtain for fresh breath and lingual biofilm removal.</li><li><strong>Precision Jet Nozzle:</strong> Pinpoint 0.4mm aperture for crowns, bridge margins, and dental implants.</li><li><strong>Plaque Defence Nozzle:</strong> High-density targeted water stream for concentrated plaque biofilm removal along the gum margin.</li></ul>"
  },
  {
    "id": "miroooo-flosser-faq-7",
    "question": "What is included in the box?",
    "answer": "<p>The complete retail package includes: <strong>1x Miroooo Precision Water Flosser</strong> main handle in your chosen finish (Obsidian Black or Pristine White), <strong>7x specialized 360° rotating nozzles</strong>, <strong>1x hygienic nozzle storage case</strong>, <strong>1x 320ml detachable high-capacity reservoir</strong>, <strong>1x USB-C fast charging cable</strong>, and <strong>1x luxury gift box with user manual</strong>.</p>"
  },
  {
    "id": "miroooo-flosser-faq-8",
    "question": "What is your return policy?",
    "answer": "<p>Returns may be requested within 30 days of delivery for damaged, defective, incorrect, or missing items. Please contact our support team at <a href=\"mailto:support@trymiroooo.com\">support@trymiroooo.com</a> or via our <a href=\"/pages/contact-us#contact-form\">Contact Form</a> to obtain written return authorization and instructions prior to sending any product back.</p>"
  }
];

interface ProductFaqsProps {
  isX2?: boolean;
  isFlosser?: boolean;
  model?: 'x1' | 'x2' | 'flosser' | 'miroooo-water-flosser';
}

export function ProductFaqs({ isX2 = true, isFlosser = false, model }: ProductFaqsProps) {
  const isFlosserProduct = isFlosser || model === 'flosser' || model === 'miroooo-water-flosser';
  const faqs = isFlosserProduct
    ? FAQS_FLOSSER
    : model === 'x1'
      ? FAQS_X1
      : model === 'x2'
        ? FAQS_X2
        : isX2 ? FAQS_X2 : FAQS_X1;
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
      <style>{`
  /* FAQ Exclusive Accordion Cards (Matching FAQ page greyish luxury design) */
  .faq-accordion-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
  }
  .faq-card {
    border-radius: 22px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: #e6e6e6;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.6);
    overflow: hidden;
  }
  .faq-card:hover {
    background: #dedede;
    border-color: rgba(0, 0, 0, 0.16);
    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.7);
    transform: translateY(-1px);
  }
  .faq-card.is-open {
    background: #e6e6e6;
    border-color: rgba(0, 0, 0, 0.16);
    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.75);
  }
  .faq-card__button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 22px 28px;
    text-align: left;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #111111;
    border-radius: 22px;
    font: inherit;
    outline: none;
    user-select: none;
  }
  .faq-card__button:focus-visible {
    outline: 2px solid #111111;
    outline-offset: 2px;
  }
  .faq-card__question {
    font-size: clamp(17px, 2vw, 19px);
    font-weight: 600;
    color: #111111;
    line-height: 1.4;
    transition: color 0.25s ease;
  }
  .faq-card:hover .faq-card__question,
  .faq-card.is-open .faq-card__question {
    color: #111111;
  }
  .faq-card__badge {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.06);
    color: #111111;
    border: 1px solid rgba(0, 0, 0, 0.08);
    flex-shrink: 0;
    transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .faq-card:hover .faq-card__badge {
    background: rgba(0, 0, 0, 0.12);
    border-color: rgba(0, 0, 0, 0.16);
    color: #111111;
  }
  .faq-card.is-open .faq-card__badge {
    transform: rotate(180deg);
    background: #111111;
    color: #ffffff;
    border-color: #111111;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  }
  .faq-card.is-open:hover .faq-card__badge {
    background: #000000;
    color: #ffffff;
    border-color: #000000;
  }
  .faq-card__panel {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition: grid-template-rows 0.38s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.38s ease;
  }
  .faq-card.is-open .faq-card__panel {
    grid-template-rows: 1fr;
    opacity: 1;
  }
  .faq-card__panel-inner {
    overflow: hidden;
  }
  .faq-card__divider {
    height: 1px;
    width: calc(100% - 56px);
    margin: 0 28px 18px;
    background: rgba(0, 0, 0, 0.08);
  }
  .faq-card__answer {
    padding: 0 28px 26px 28px;
    color: rgba(17, 17, 17, 0.85);
    font-size: 15.5px;
    line-height: 1.7;
    font-weight: 400;
  }
  .faq-card__answer p {
    margin: 0 0 14px 0;
  }
  .faq-card__answer p:last-child {
    margin-bottom: 0;
  }
`}</style>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', boxSizing: 'border-box', width: '100%' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2
            style={{
              fontFamily: "var(--font-didot), 'Playfair Display', Georgia, serif",
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
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Everything you need to know about {isFlosserProduct ? 'the Miroooo Water Flosser' : (isX2 ? 'the new Miroooo X2 electric toothbrush' : 'the Miroooo X1 electric toothbrush')}, shipping, and return policies.
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
                  aria-controls={`${faq.id}-panel`}
                  id={`${faq.id}-trigger`}
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
                <div className="faq-card__panel" id={`${faq.id}-panel`} role="region" aria-labelledby={`${faq.id}-trigger`} aria-hidden={!isOpen} inert={!isOpen}>
                    <div className="faq-card__panel-inner">
                      <div className="faq-card__divider"></div>
                      <div className="faq-card__answer" dangerouslySetInnerHTML={{ __html: faq.answer }} />
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
