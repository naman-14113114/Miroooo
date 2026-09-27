'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { QUIZ_STEPS } from '@/data/quiz';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';

export function DentalQuiz() {
  const { addItem, openCart } = useCart();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const step = QUIZ_STEPS[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / QUIZ_STEPS.length) * 100);

  const handleSelectOption = (value: string) => {
    const updated = { ...answers, [step.name]: value };
    setAnswers(updated);

    if (currentStepIndex < QUIZ_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
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
  const recommendedColor =
    answers.finish === 'pink' ? 'Pink' : answers.finish === 'grey' ? 'Grey' : 'Silver';

  return (
    <div className="dental-quiz-container max-w-3xl mx-auto px-4 sm:px-6 py-12 text-white">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/50 px-3 py-1 rounded-full bg-white/10 border border-white/10">
          Personalised Oral Care
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Find Your Exact Miroooo Routine
        </h1>
        <p className="text-[14.5px] text-white/70 max-w-xl mx-auto">
          In 60 seconds, compare Miroooo X1 and X2 and match a two-minute routine tailored to your brushing habits.
        </p>
      </div>

      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111213] border border-white/10 shadow-2xl space-y-6">
          {/* Progress Meta */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[12px] font-bold uppercase tracking-wider text-white/60">
              <span>
                Step {step.step} of {QUIZ_STEPS.length}
              </span>
              <div className="flex items-center gap-4">
                <span>{progressPercent}% Completed</span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="hover:text-white transition-colors"
                >
                  ↺ Reset
                </button>
              </div>
            </div>

            {/* Progress Track */}
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Body */}
          <div className="space-y-2 pt-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {step.legend}
            </h2>
            <p className="text-[13.5px] text-white/60">
              {step.description}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3 pt-2">
            {step.options.map((opt) => {
              const isSelected = answers[step.name] === opt.value;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.value)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                    isSelected
                      ? 'border-white bg-white/10 ring-2 ring-white/20'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-white bg-white' : 'border-white/30'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-black" />}
                  </span>

                  <div>
                    <strong className="block text-[14.5px] font-semibold text-white">
                      {opt.title}
                    </strong>
                    <span className="text-[12.5px] text-white/60 block mt-0.5">
                      {opt.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Back Button */}
          {currentStepIndex > 0 && (
            <div className="pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                className="text-[13px] text-white/60 hover:text-white font-medium"
              >
                ← Previous Question
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results Card */
        <div className="p-6 sm:p-10 rounded-3xl bg-[#111213] border border-white/10 shadow-2xl space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/30">
              Your Perfect Match
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              We recommend the {recommendedProduct.name}
            </h2>
            <p className="text-[14px] text-white/70 max-w-lg mx-auto">
              Based on your brushing priorities, sensitivity level, and daily routine habits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/[0.02] p-6 rounded-2xl border border-white/5">
            <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-black border border-white/10">
              <Image
                src={recommendedProduct.galleryImages[0]?.src || ''}
                alt={recommendedProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            <div className="md:col-span-7 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {recommendedProduct.name} ({recommendedColor} Finish)
                </h3>
                <p className="text-[13.5px] text-white/70 mt-1">
                  {recommendedProduct.description}
                </p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-white">
                  {recommendedProduct.formattedPrice}
                </span>
                <s className="text-sm text-white/40">
                  {recommendedProduct.formattedCompareAt}
                </s>
                <span className="text-rose-400 font-bold text-xs uppercase">
                  Save 50%
                </span>
              </div>

              <ul className="space-y-1.5 text-[13px] text-white/80">
                {recommendedProduct.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addItem({
                      productHandle: recommendedProduct.handle,
                      color: recommendedColor,
                      quantity: 1,
                    });
                    openCart();
                  }}
                  className="px-6 py-3 rounded-full bg-white text-black font-extrabold text-[14px] hover:bg-neutral-200 transition-all shadow-lg flex-1 text-center"
                >
                  Add To Cart ({recommendedProduct.formattedPrice})
                </button>

                <Link
                  href={`/products/${recommendedProduct.handle}?color=${recommendedColor}`}
                  className="px-6 py-3 rounded-full bg-white/10 text-white font-bold text-[14px] hover:bg-white/20 transition-all border border-white/15 text-center"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="text-[13px] text-white/50 hover:text-white underline"
            >
              Take the quiz again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
