'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { QUADRANT_STAGES, SMILE_COACH_GOALS } from '@/data/smileCoach';

interface SmileCoachProfile {
  model: 'x' | 'x2';
  name: string;
  goals: string[];
  frequency: string;
  interdental: string;
  morningTime: string;
  eveningTime: string;
  headInstalledDate: string;
  streak: number;
  completedDays: number[];
}

export function SmileCoach() {
  const [profile, setProfile] = useState<SmileCoachProfile | null>(null);
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [step, setStep] = useState(1);

  // Form state
  const [model, setModel] = useState<'x' | 'x2'>('x2');
  const [name, setName] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['consistency']);
  const [frequency, setFrequency] = useState('twice');
  const [interdental, setInterdental] = useState('some');
  const [morningTime, setMorningTime] = useState('07:30');
  const [eveningTime, setEveningTime] = useState('21:30');

  // Timer state
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(120);
  const [currentQuadrant, setCurrentQuadrant] = useState(1);

  // Load profile from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('miroooo_smile_coach_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.name) {
          setProfile(parsed);
          setIsOnboarding(false);
        }
      }
    } catch (_) {}
  }, []);

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          const next = prev - 1;
          const elapsed = 120 - next;
          const quad = Math.min(4, Math.floor(elapsed / 30) + 1);
          setCurrentQuadrant(quad);
          return next;
        });
      }, 1000);
    } else if (timerSecondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Record completed session
      if (profile) {
        const updated = {
          ...profile,
          streak: profile.streak + 1,
          completedDays: [...profile.completedDays, profile.completedDays.length + 1],
        };
        setProfile(updated);
        try {
          localStorage.setItem('miroooo_smile_coach_profile', JSON.stringify(updated));
        } catch (_) {}
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft, profile]);

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals((current) => {
      if (current.includes(goalId)) {
        return current.filter((g) => g !== goalId);
      }
      if (current.length >= 3) return current;
      return [...current, goalId];
    });
  };

  const handleFinishOnboarding = () => {
    const newProfile: SmileCoachProfile = {
      model,
      name: name.trim() || 'Friend',
      goals: selectedGoals,
      frequency,
      interdental,
      morningTime,
      eveningTime,
      headInstalledDate: new Date().toISOString(),
      streak: 1,
      completedDays: [1],
    };
    setProfile(newProfile);
    setIsOnboarding(false);
    try {
      localStorage.setItem('miroooo_smile_coach_profile', JSON.stringify(newProfile));
    } catch (_) {}
  };

  const resetProfile = () => {
    localStorage.removeItem('miroooo_smile_coach_profile');
    setProfile(null);
    setIsOnboarding(true);
    setStep(1);
  };

  return (
    <div className="smile-coach-app min-h-screen bg-[#0a0c0a] text-white flex flex-col">
      {/* Top Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-extrabold uppercase tracking-widest text-lg text-white">
          MIROOOO <span className="text-emerald-400 font-normal text-xs ml-2">SMILE COACH</span>
        </Link>
        <div className="flex items-center gap-4 text-[13px]">
          <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Saved on device
          </span>
          <Link href="/shop" className="text-white/70 hover:text-white underline">
            Visit Store
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {isOnboarding ? (
          /* Onboarding Form */
          <div className="p-6 sm:p-10 rounded-3xl bg-[#121512] border border-white/10 shadow-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Step {step} of 4 · Habit Setup
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {step === 1 && 'Which Miroooo do you use?'}
                {step === 2 && 'What would make the biggest difference?'}
                {step === 3 && 'How does brushing feel today?'}
                {step === 4 && 'When should Smile Coach guide you?'}
              </h1>
            </div>

            {/* Step 1: Model */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setModel('x2')}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    model === 'x2'
                      ? 'border-emerald-400 bg-emerald-950/30 ring-1 ring-emerald-400'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                  }`}
                >
                  <strong className="block text-lg font-bold text-white">Miroooo X2 Flagship</strong>
                  <span className="text-[13px] text-white/60">45° Bass sweep & 3 modes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModel('x')}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    model === 'x'
                      ? 'border-emerald-400 bg-emerald-950/30 ring-1 ring-emerald-400'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                  }`}
                >
                  <strong className="block text-lg font-bold text-white">Miroooo X1 Essential</strong>
                  <span className="text-[13px] text-white/60">51g linear sonic motor</span>
                </button>
              </div>
            )}

            {/* Step 2: Goals */}
            {step === 2 && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-[13px] text-white/70 mb-1.5">Your First Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white focus:outline-none focus:border-emerald-400 text-[14px]"
                  />
                </div>

                <div className="space-y-2">
                  <span className="block text-[13px] text-white/70">
                    Select up to 3 oral care focus areas:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SMILE_COACH_GOALS.map((g) => {
                      const isSelected = selectedGoals.includes(g.id);
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => handleGoalToggle(g.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'border-emerald-400 bg-emerald-950/30'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                          }`}
                        >
                          <strong className="block text-[14px] font-semibold text-white">
                            {g.title}
                          </strong>
                          <span className="text-[12px] text-white/50">{g.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Current Feel */}
            {step === 3 && (
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <span className="block text-[13px] text-white/70">Daily Brushing Frequency</span>
                  <div className="grid grid-cols-3 gap-3">
                    {['Once daily', 'Twice daily', 'Irregular'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFrequency(opt)}
                        className={`py-3 rounded-xl border text-center text-[13px] font-medium transition-all ${
                          frequency === opt
                            ? 'border-emerald-400 bg-emerald-950/30 text-white font-bold'
                            : 'border-white/10 bg-white/[0.02] text-white/70'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Schedule */}
            {step === 4 && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] text-white/70 mb-1">Morning Reminder</label>
                    <input
                      type="time"
                      value={morningTime}
                      onChange={(e) => setMorningTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-white/70 mb-1">Evening Reminder</label>
                    <input
                      type="time"
                      value={eveningTime}
                      onChange={(e) => setEveningTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="text-[13.5px] text-white/60 hover:text-white"
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev + 1)}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-[13.5px] hover:bg-neutral-200 transition-colors"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinishOnboarding}
                  className="px-8 py-3 rounded-full bg-emerald-400 text-black font-extrabold text-[14px] hover:bg-emerald-300 transition-colors shadow-lg"
                >
                  Start 28-Day Plan ✓
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Active Dashboard */
          <div className="space-y-6">
            {/* User Greeting & Streak Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#121512] border border-white/10 shadow-xl">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Day {profile?.completedDays.length || 1} of 28 · {profile?.model === 'x2' ? 'Miroooo X2' : 'Miroooo X1'}
                </span>
                <h2 className="text-2xl font-bold text-white mt-0.5">
                  Welcome back, {profile?.name}
                </h2>
                <p className="text-[13px] text-white/60">
                  Daily focus: {profile?.goals.join(', ')}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-2xl font-extrabold text-emerald-400">
                    🔥 {profile?.streak}
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Day Streak
                  </span>
                </div>

                <button
                  type="button"
                  onClick={resetProfile}
                  className="p-2 text-white/40 hover:text-white text-xs underline"
                  title="Reset Habit Plan"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Interactive 2-Minute Quad-Pacer Timer */}
            <div className="p-8 rounded-3xl bg-[#121512] border border-white/10 shadow-2xl text-center space-y-6">
              <span className="text-[11.5px] font-bold uppercase tracking-widest text-white/50 block">
                Guided 2-Minute Brush Session
              </span>

              {/* Big Timer Display */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-48 h-48 rounded-full border-4 border-emerald-500/30 flex flex-col items-center justify-center relative bg-black/40 shadow-inner">
                  <span className="text-4xl sm:text-5xl font-mono font-extrabold text-white">
                    {Math.floor(timerSecondsLeft / 60)}:
                    {String(timerSecondsLeft % 60).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] font-bold uppercase text-emerald-400 mt-1">
                    Zone {currentQuadrant} of 4
                  </span>
                </div>
              </div>

              {/* Active Quadrant Highlight */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 max-w-md mx-auto">
                <strong className="block text-[15px] font-bold text-white">
                  {QUADRANT_STAGES[currentQuadrant - 1]?.name}
                </strong>
                <p className="text-[13px] text-white/70 mt-0.5">
                  {QUADRANT_STAGES[currentQuadrant - 1]?.description}
                </p>
              </div>

              {/* Timer Controls */}
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning((prev) => !prev)}
                  className={`px-8 py-3.5 rounded-full font-extrabold text-[15px] tracking-wide transition-all shadow-xl ${
                    isTimerRunning
                      ? 'bg-rose-500 text-white hover:bg-rose-600'
                      : 'bg-emerald-400 text-black hover:bg-emerald-300'
                  }`}
                >
                  {isTimerRunning ? 'Pause Session' : 'Start 2-Minute Session'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSecondsLeft(120);
                    setCurrentQuadrant(1);
                  }}
                  className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-[13.5px] transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
