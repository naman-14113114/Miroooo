'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { QUIZ_STEPS } from '@/data/quiz';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatGBP } from '@/lib/cart';

export function DentalQuiz() {
  const { addItem, openCart } = useCart();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const step = QUIZ_STEPS[currentStepIndex];
  const totalSteps = QUIZ_STEPS.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const currentSelection = answers[step?.name] || '';

  const handleSelectOption = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.name]: value }));
  };

  const handleNext = () => {
    if (!currentSelection) return;
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  // Determine recommendation
  const isX2Recommended =
    answers.goal === 'plaque-tartar' ||
    answers.goal === 'sensitive-gums' ||
    answers.sensitivity === 'heavy-sensitive' ||
    answers.sensitivity === 'active-feedback' ||
    answers.lifestyle === 'frequent-travel' ||
    answers.lifestyle === 'shower-brushing';

  const recommendedProduct = isX2Recommended ? PRODUCTS['miroooo-x2'] : PRODUCTS['miroooo-x'];
  const isBundle = answers.finish === 'bundle-two';
  const recommendedColor =
    answers.finish === 'pink' ? 'Pink' : answers.finish === 'grey' ? 'Grey' : 'Silver';

  const productImage =
    recommendedProduct.variants.find((v) => v.color.toLowerCase() === recommendedColor.toLowerCase())
      ?.image || recommendedProduct.galleryImages[0]?.src || '';

  return (
    <main id="main">
      {/* Hero Header */}
      <header className="quiz-hero">
        <div className="site-shell">
          <p className="eyebrow">PERSONALISED ORAL CARE</p>
          <h1>Find your exact Miroooo routine.</h1>
          <p className="lead">
            In 60 seconds, compare Miroooo X1 and X2 and build a two-minute routine around your preferences.
          </p>
          <p className="quiz-health-note" role="note">
            This tool provides general product and routine guidance, not a dental diagnosis. Persistent bleeding,
            pain, swelling or sensitivity should be discussed with a dentist.
          </p>
        </div>
      </header>

      {/* Quiz Flow Section */}
      <section className="quiz-section" id="quiz-main" aria-label="Personalised Dental Care Routine Quiz">
        <div className="site-shell">
          <div className="quiz-card-container" id="quiz-card-container">
            {!isCompleted ? (
              <>
                {/* Interactive Progress Bar */}
                <div className="quiz-progress" id="quiz-progress-wrapper" aria-label="Quiz progress">
                  <div className="quiz-progress-meta">
                    <span className="quiz-step-indicator" id="quiz-step-label">
                      Step {currentStepIndex + 1} of {totalSteps}
                    </span>
                    <div className="quiz-progress-meta-actions">
                      <span className="quiz-progress-percent" id="quiz-progress-percent">
                        {progressPercent}% Completed
                      </span>
                      <button
                        type="button"
                        className="quiz-reset-btn"
                        id="quiz-reset-btn"
                        onClick={handleReset}
                        aria-label="Reset Quiz"
                        title="Reset quiz and start over"
                      >
                        ↺ Reset Quiz
                      </button>
                    </div>
                  </div>
                  <div className="quiz-progress-track" aria-hidden="true">
                    <div
                      className="quiz-progress-bar"
                      id="quiz-progress-bar"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Form Step */}
                <form id="quiz-form" noValidate onSubmit={(e) => e.preventDefault()}>
                  <fieldset className="quiz-step is-active" data-step={currentStepIndex + 1}>
                    <legend>{step.legend}</legend>
                    <p className="quiz-step-desc">{step.description}</p>

                    <div className="quiz-options-grid" role="radiogroup" aria-label={step.legend}>
                      {step.options.map((opt) => {
                        const isSelected = currentSelection === opt.value;
                        return (
                          <label
                            key={opt.id}
                            className={`quiz-option ${isSelected ? 'is-selected' : ''}`}
                            data-option-id={opt.id}
                            onClick={() => handleSelectOption(opt.value)}
                          >
                            <input
                              type="radio"
                              name={step.name}
                              value={opt.value}
                              checked={isSelected}
                              onChange={() => handleSelectOption(opt.value)}
                              required
                            />
                            <span className="quiz-option-radio-visual" aria-hidden="true">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            <div className="quiz-option-content">
                              <span className="quiz-option-title">{opt.title}</span>
                              <span className="quiz-option-subtitle">{opt.subtitle}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Navigation Controls */}
                  <div className="quiz-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                    {currentStepIndex > 0 ? (
                      <button
                        type="button"
                        className="button button--secondary"
                        onClick={handlePrev}
                        style={{ padding: '10px 20px', fontSize: '13.5px' }}
                      >
                        <span className="btn-text">← Previous</span>
                      </button>
                    ) : (
                      <span />
                    )}

                    <button
                      type="button"
                      className="button button--primary"
                      onClick={handleNext}
                      disabled={!currentSelection}
                      style={{ padding: '10px 24px', fontSize: '14px', opacity: currentSelection ? 1 : 0.4 }}
                    >
                      <span className="btn-fill" data-fill />
                      <span className="btn-text">
                        {currentStepIndex === totalSteps - 1 ? 'See Recommended Routine →' : 'Continue →'}
                      </span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Results Card */
              <div className="quiz-results-card" style={{ padding: '28px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 14px',
                      borderRadius: '999px',
                      background: 'var(--signal-dark, #15803d)',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '10px',
                    }}
                  >
                    Your Personal Match
                  </span>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#111111', margin: '0 0 8px 0', lineHeight: 1.2 }}>
                    We recommend the {recommendedProduct.name}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#555555', margin: 0 }}>
                    Matched to your brushing preferences, sensitivity level, and {recommendedColor} finish.
                  </p>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '24px',
                    alignItems: 'center',
                    background: '#ffffff',
                    padding: '24px',
                    borderRadius: '18px',
                    border: '1px solid rgba(0,0,0,0.08)',
                    marginBottom: '24px',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src={productImage}
                      alt={recommendedProduct.name}
                      style={{ width: '100%', maxHeight: '220px', objectFit: 'contain', margin: '0 auto 12px' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '22px', fontWeight: 900, color: '#111111' }}>
                        {formatGBP(isBundle ? recommendedProduct.price * 2 - 10 : recommendedProduct.price)}
                      </strong>
                      <s style={{ fontSize: '14px', color: '#888888' }}>
                        {formatGBP(isBundle ? recommendedProduct.compareAt * 2 : recommendedProduct.compareAt)}
                      </s>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#15803d', background: 'rgba(21,128,61,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                        Save 50%
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111111', margin: '0 0 10px 0' }}>
                      Key Tailored Highlights
                    </h3>
                    <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px', fontSize: '13.5px', color: '#444444', lineHeight: 1.7 }}>
                      {recommendedProduct.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button
                        type="button"
                        className="button button--primary"
                        onClick={() => {
                          addItem({
                            productHandle: recommendedProduct.handle,
                            color: recommendedColor,
                            quantity: isBundle ? 2 : 1,
                          });
                          openCart();
                        }}
                        style={{ width: '100%', padding: '12px 20px', fontSize: '14px' }}
                      >
                        <span className="btn-fill" data-fill />
                        <span className="btn-text">
                          Add {isBundle ? 'Bundle (2x Brushes + Free Heads)' : 'to Cart'} ({formatGBP(isBundle ? recommendedProduct.price * 2 - 10 : recommendedProduct.price)}) <span aria-hidden="true">↗</span>
                        </span>
                      </button>

                      <Link
                        href={`/products/${recommendedProduct.handle}?color=${recommendedColor}`}
                        className="button button--secondary"
                        style={{ width: '100%', padding: '10px 20px', fontSize: '13.5px', textAlign: 'center' }}
                      >
                        <span className="btn-fill" data-fill />
                        <span className="btn-text">View Product Page</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={handleReset}
                    style={{ background: 'none', border: 'none', color: '#666666', fontSize: '13px', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    ↺ Retake Quiz with Different Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
