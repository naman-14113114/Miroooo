'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SMILE_COACH_GOALS } from '@/data/smileCoach';

interface SmileCoachProfile {
  model: 'x' | 'x2';
  name: string;
  goals: string[];
  frequency: string;
  interdental: string;
  sensitive: boolean;
  morningTime: string;
  eveningTime: string;
  headInstalledDate: string;
  streak: number;
  completedDays: number[];
  sessionsCompleted: number;
  startedOn?: string;
  completedDates?: string[];
}

export function SmileCoach() {
  const [profile, setProfile] = useState<SmileCoachProfile | null>(null);
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState<'today' | 'progress' | 'care' | 'profile'>('today');

  // Form State for Onboarding
  const [model, setModel] = useState<'x' | 'x2'>('x2');
  const [name, setName] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['consistency', 'coverage']);
  const [frequency, setFrequency] = useState('twice');
  const [interdental, setInterdental] = useState('some');
  const [sensitive, setSensitive] = useState(false);
  const [morningTime, setMorningTime] = useState('07:30');
  const [eveningTime, setEveningTime] = useState('21:30');
  const [headInstalledDate, setHeadInstalledDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Guided Session Takeover State
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(120);
  const [currentZone, setCurrentZone] = useState(0); // 0: Upper Right, 1: Upper Left, 2: Lower Left, 3: Lower Right
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('miroooo_smile_coach_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.name) {
          setProfile(parsed);
          setIsOnboarding(false);
          setModel(parsed.model || 'x2');
          setName(parsed.name || '');
          setSelectedGoals(parsed.goals || ['consistency']);
          setFrequency(parsed.frequency || 'twice');
          setInterdental(parsed.interdental || 'some');
          setSensitive(Boolean(parsed.sensitive));
          setMorningTime(parsed.morningTime || '07:30');
          setEveningTime(parsed.eveningTime || '21:30');
          setHeadInstalledDate(parsed.headInstalledDate?.split('T')[0] || new Date().toISOString().split('T')[0]);
        }
      }
    } catch {}
  }, []);

  // Timer Tick
  useEffect(() => {
    if (isTimerRunning && timerSecondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          const next = prev - 1;
          const elapsed = 120 - next;
          const zoneIndex = Math.min(3, Math.floor(elapsed / 30));
          setCurrentZone(zoneIndex);
          return next;
        });
      }, 1000);
    } else if (timerSecondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setSessionCompleted(true);
      if (timerRef.current) clearInterval(timerRef.current);

      // Update streak
      if (profile) {
        const today = new Date();
        const todayKey = today.toLocaleDateString('en-CA');
        const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
        const dates = profile.completedDates || [];
        const alreadyCompletedToday = dates.includes(todayKey);
        const started = new Date(`${profile.startedOn || todayKey}T00:00:00`);
        const todayDayNum = Math.max(1, Math.min(28, Math.round((new Date(`${todayKey}T00:00:00`).getTime() - started.getTime()) / 86400000) + 1));
        const updatedDays = Array.from(new Set([...(profile.completedDays || []), todayDayNum]));
        const updated: SmileCoachProfile = {
          ...profile,
          streak: alreadyCompletedToday ? profile.streak : dates.includes(yesterday.toLocaleDateString('en-CA')) ? (profile.streak || 0) + 1 : 1,
          startedOn: profile.startedOn || todayKey,
          completedDates: Array.from(new Set([...dates, todayKey])),
          sessionsCompleted: (profile.sessionsCompleted || 0) + 1,
          completedDays: updatedDays,
        };
        setProfile(updated);
        try {
          localStorage.setItem('miroooo_smile_coach_profile', JSON.stringify(updated));
        } catch {}
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timerSecondsLeft, profile]);

  const handleGoalToggle = (gId: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(gId)) return prev.filter((id) => id !== gId);
      if (prev.length >= 3) return prev;
      return [...prev, gId];
    });
  };

  const handleFinishOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    const newProfile: SmileCoachProfile = {
      model,
      name: name.trim() || 'Valued Customer',
      goals: selectedGoals,
      frequency,
      interdental,
      sensitive,
      morningTime,
      eveningTime,
      headInstalledDate: new Date(headInstalledDate).toISOString(),
      streak: 0,
      completedDays: [],
      sessionsCompleted: 0,
      startedOn: new Date().toLocaleDateString('en-CA'),
      completedDates: [],
    };
    setProfile(newProfile);
    setIsOnboarding(false);
    try {
      localStorage.setItem('miroooo_smile_coach_profile', JSON.stringify(newProfile));
    } catch {}
  };

  const handleStartSession = () => {
    setTimerSecondsLeft(120);
    setCurrentZone(0);
    setIsSessionOpen(true);
    setIsTimerRunning(true);
    setSessionCompleted(false);
    document.body.classList.add('is-session-open');
  };

  const handleCloseSession = () => {
    setIsSessionOpen(false);
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    document.body.classList.remove('is-session-open');
  };

  const handleResetPlan = () => {
    localStorage.removeItem('miroooo_smile_coach_profile');
    setProfile(null);
    setIsOnboarding(true);
    setStep(1);
    setActiveTab('today');
  };

  // Keep the rendered day stable across rerenders.
  const [todayMs] = useState(() => Date.now());
  const installTime = profile?.headInstalledDate ? new Date(profile.headInstalledDate).getTime() : todayMs;
  const daysUsed = Math.max(0, Math.floor((todayMs - installTime) / (1000 * 60 * 60 * 24)));
  const headLifePercent = Math.min(100, Math.round((daysUsed / 90) * 100));

  const modelImage =
    (profile?.model || model) === 'x2'
      ? '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp'
      : '/assets_ref/x/gallery/Miroooo_x_Silver-1.webp';

  const zoneNames = ['Upper right', 'Upper left', 'Lower left', 'Lower right'];
  const progressDeg = Math.round(((120 - timerSecondsLeft) / 120) * 360);

  return (
    <>
      {/* Top Header */}
      <header className="coach-topbar">
        <Link className="coach-brand" href="/" aria-label="Miroooo home">
          MIROOOO
        </Link>
        <div className="coach-topbar__actions">
          <p className="coach-save-status" id="save-status" aria-live="polite">
            Saved on this device
          </p>
          <Link className="coach-store-link" href="/pages/dentalcare-quiz">
            Dental Care Quiz
          </Link>
          <Link className="coach-store-link" href="/shop">
            Visit store
          </Link>
        </div>
      </header>

      <main id="coach-main">
        {isOnboarding ? (
          /* Onboarding Wizard */
          <section className="coach-onboarding" id="coach-onboarding" aria-labelledby="onboarding-title">
            <div className="onboarding-intro">
              <p className="coach-eyebrow">FREE MIROOOO CUSTOMER APP</p>
              <h1 id="onboarding-title">Your brushing plan should fit you.</h1>
              <p>
                Tell us about your brush, goals and current routine. Smile Coach will shape a practical 28-day plan
                around your answers.
              </p>
              <ul className="onboarding-proof" aria-label="What the app includes">
                <li>Guided two-minute sessions</li>
                <li>Morning and evening routine</li>
                <li>Brush-head care reminders</li>
              </ul>
              <p className="coach-privacy-note">Your answers stay in this browser. No account is required.</p>
            </div>

            <form className="onboarding-form" id="onboarding-form" onSubmit={handleFinishOnboarding}>
              <div className="onboarding-progress" aria-label="Setup progress">
                <span id="onboarding-step-label">Step {step} of 4</span>
                <div className="onboarding-progress__track" aria-hidden="true">
                  <span id="onboarding-progress-bar" style={{ width: `${(step / 4) * 100}%` }} />
                </div>
              </div>

              {/* Step 1: Model Choice */}
              {step === 1 && (
                <fieldset className="onboarding-step is-active" data-onboarding-step="1">
                  <legend>Which Miroooo do you use?</legend>
                  <p className="onboarding-step__lead">We will use your model throughout the experience.</p>
                  <div className="model-picker">
                    <label className={`model-option ${model === 'x' ? 'is-selected' : ''}`}>
                      <input
                        type="radio"
                        name="model"
                        value="x"
                        checked={model === 'x'}
                        onChange={() => setModel('x')}
                        required
                      />
                      <span className="model-option__media">
                        <img
                          src="/assets_ref/x/gallery/Miroooo_x_Silver-1.webp"
                          alt="Silver Miroooo X toothbrush"
                          width={900}
                          height={1200}
                        />
                      </span>
                      <span className="model-option__copy">
                        <strong>Miroooo X1</strong>
                        <small>Light, simple and travel ready</small>
                      </span>
                      <span className="model-option__check" aria-hidden="true">
                        ✓
                      </span>
                    </label>

                    <label className={`model-option ${model === 'x2' ? 'is-selected' : ''}`}>
                      <input
                        type="radio"
                        name="model"
                        value="x2"
                        checked={model === 'x2'}
                        onChange={() => setModel('x2')}
                        required
                      />
                      <span className="model-option__media">
                        <img
                          src="/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp"
                          alt="Silver Miroooo X2 toothbrush held upright"
                          width={1000}
                          height={1000}
                        />
                      </span>
                      <span className="model-option__copy">
                        <strong>Miroooo X2</strong>
                        <small>45° Bass sweep, 3 modes &amp; halo defense</small>
                      </span>
                      <span className="model-option__check" aria-hidden="true">
                        ✓
                      </span>
                    </label>
                  </div>
                </fieldset>
              )}

              {/* Step 2: Priorities & Name */}
              {step === 2 && (
                <fieldset className="onboarding-step is-active" data-onboarding-step="2">
                  <legend>What would make the biggest difference?</legend>
                  <p className="onboarding-step__lead">Choose up to three. Your plan will prioritise them.</p>
                  <label className="coach-field coach-field--name">
                    <span>First name</span>
                    <input
                      id="profile-name"
                      name="name"
                      type="text"
                      autoComplete="given-name"
                      maxLength={24}
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                  <div className="goal-picker" data-max-selections="3">
                    {SMILE_COACH_GOALS.map((g) => {
                      const isSelected = selectedGoals.includes(g.id);
                      return (
                        <label key={g.id} className={`goal-option ${isSelected ? 'is-selected' : ''}`}>
                          <input
                            type="checkbox"
                            name="goals"
                            value={g.id}
                            checked={isSelected}
                            onChange={() => handleGoalToggle(g.id)}
                          />
                          <span>
                            <strong>{g.title}</strong>
                            <small>{g.desc}</small>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              {/* Step 3: Current Feel */}
              {step === 3 && (
                <fieldset className="onboarding-step is-active" data-onboarding-step="3">
                  <legend>How does brushing feel today?</legend>
                  <p className="onboarding-step__lead">There is no perfect answer. This sets your starting point.</p>
                  <div className="choice-group">
                    <p className="choice-group__label">How often do you usually brush?</p>
                    <div className="segmented-choice">
                      {['irregular', 'once', 'twice'].map((val) => (
                        <label key={val}>
                          <input
                            type="radio"
                            name="frequency"
                            value={val}
                            checked={frequency === val}
                            onChange={() => setFrequency(val)}
                          />
                          <span>{val === 'irregular' ? 'Irregularly' : val === 'once' ? 'Once daily' : 'Twice daily'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="choice-group">
                    <p className="choice-group__label">How often do you clean between your teeth?</p>
                    <div className="segmented-choice">
                      {['rarely', 'some', 'daily'].map((val) => (
                        <label key={val}>
                          <input
                            type="radio"
                            name="interdental"
                            value={val}
                            checked={interdental === val}
                            onChange={() => setInterdental(val)}
                          />
                          <span>{val === 'rarely' ? 'Rarely' : val === 'some' ? 'Some days' : 'Daily'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <label className="switch-row">
                    <span>
                      <strong>My gums or teeth can feel sensitive</strong>
                      <small>We will favour calm technique cues.</small>
                    </span>
                    <input
                      type="checkbox"
                      name="sensitive"
                      checked={sensitive}
                      onChange={(e) => setSensitive(e.target.checked)}
                    />
                    <span className="switch" aria-hidden="true" />
                  </label>
                </fieldset>
              )}

              {/* Step 4: Schedule */}
              {step === 4 && (
                <fieldset className="onboarding-step is-active" data-onboarding-step="4">
                  <legend>When should Smile Coach help?</legend>
                  <p className="onboarding-step__lead">Set times that feel realistic. You can change them later.</p>
                  <div className="time-grid">
                    <label className="coach-field">
                      <span>Morning brush</span>
                      <input
                        type="time"
                        name="morningTime"
                        value={morningTime}
                        onChange={(e) => setMorningTime(e.target.value)}
                        required
                      />
                    </label>
                    <label className="coach-field">
                      <span>Evening brush</span>
                      <input
                        type="time"
                        name="eveningTime"
                        value={eveningTime}
                        onChange={(e) => setEveningTime(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <label className="coach-field">
                    <span>When did you fit this brush head?</span>
                    <input
                      type="date"
                      name="headInstalled"
                      value={headInstalledDate}
                      onChange={(e) => setHeadInstalledDate(e.target.value)}
                    />
                  </label>
                  <div className="plan-preview" id="plan-preview">
                    <span className="plan-preview__number">28</span>
                    <div>
                      <strong>Your 28-Day Smile Reset</strong>
                      <p>Two guided sessions, one small care action and a weekly check-in.</p>
                    </div>
                  </div>
                </fieldset>
              )}

              <div className="onboarding-actions">
                {step > 1 && (
                  <button
                    className="coach-button coach-button--quiet"
                    id="onboarding-back"
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                  >
                    Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    className="coach-button coach-button--primary"
                    id="onboarding-next"
                    type="button"
                    onClick={(event) => { event.preventDefault(); setStep((s) => s + 1); }}
                  >
                    Continue
                  </button>
                ) : (
                  <button className="coach-button coach-button--primary" id="onboarding-finish" type="submit">
                    Create my plan
                  </button>
                )}
              </div>
            </form>
          </section>
        ) : (
          /* Active App Dashboard */
          <section className="coach-product" id="coach-product" aria-label="Miroooo Smile Coach">
            <aside className="coach-sidebar" aria-label="Smile Coach navigation">
              <div className="coach-sidebar__profile">
                <span className="coach-avatar" id="coach-avatar" aria-hidden="true">
                  {profile?.name?.charAt(0).toUpperCase() || 'M'}
                </span>
                <div>
                  <strong id="sidebar-name">{profile?.name || 'My Plan'}</strong>
                  <span id="sidebar-model">{profile?.model === 'x2' ? 'Miroooo X2' : 'Miroooo X1'}</span>
                </div>
              </div>

              <nav className="coach-nav">
                <button
                  className={`coach-nav__item ${activeTab === 'today' ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('today')}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 12 12 4l9 8v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
                  </svg>
                  <span>Today</span>
                </button>
                <button
                  className={`coach-nav__item ${activeTab === 'progress' ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('progress')}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 19V9m6 10V5m6 14v-7m4 7H2" />
                  </svg>
                  <span>Progress</span>
                </button>
                <button
                  className={`coach-nav__item ${activeTab === 'care' ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('care')}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21s7-4 7-10V5l-7-3-7 3v6c0 6 7 10 7 10Z" />
                    <path d="m9 11 2 2 4-5" />
                  </svg>
                  <span>Brush care</span>
                </button>
                <button
                  className={`coach-nav__item ${activeTab === 'profile' ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('profile')}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                  </svg>
                  <span>My plan</span>
                </button>
              </nav>

              <div className="coach-sidebar__note">
                <strong>Private by design</strong>
                <p>Your plan and progress are stored only on this device.</p>
              </div>
            </aside>

            <div className="coach-workspace">
              {/* TAB 1: TODAY */}
              {activeTab === 'today' && (
                <section className="coach-view is-active" data-view="today" aria-labelledby="today-title">
                  <div className="view-heading">
                    <div>
                      <p className="coach-eyebrow" id="today-date">
                        TODAY · 28-DAY SMILE RESET
                      </p>
                      <h1 id="today-title">
                        Good day, <span>{profile?.name}</span>.
                      </h1>
                    </div>
                  </div>

                  <div className="today-hero">
                    <div className="today-hero__content">
                      <p className="today-hero__status" id="plan-phase">
                        DAY {profile?.completedDays?.length || 1} · FOUNDATION
                      </p>
                      <h2 id="daily-focus">Start with equal coverage.</h2>
                      <p id="daily-guidance">
                        Let the brush do the work. Move slowly through all four zones for thirty seconds each.
                      </p>
                      <button
                        className="coach-button coach-button--primary coach-button--large"
                        type="button"
                        onClick={handleStartSession}
                      >
                        <span className="coach-button__play" aria-hidden="true">
                          ▶
                        </span>{' '}
                        Start guided brush
                      </button>
                      <p className="today-hero__mode" id="recommended-mode">
                        Recommended today: Standard clean (2 mins)
                      </p>
                    </div>
                    <div className="today-hero__product" aria-hidden="true">
                      <span className="product-orbit" />
                      <img id="today-model-image" src={modelImage} alt="Miroooo Electric Toothbrush" />
                    </div>
                  </div>

                  <section className="routine-section" aria-labelledby="routine-title">
                    <div className="section-heading-inline">
                      <div>
                        <p className="coach-eyebrow">YOUR ROUTINE</p>
                        <h2 id="routine-title">Two moments, fully covered.</h2>
                      </div>
                      <p id="routine-summary">
                        {profile?.sessionsCompleted || 0} total sessions completed
                      </p>
                    </div>

                    <div className="routine-timeline">
                      <div className="routine-moment">
                        <span className="routine-moment__time">{profile?.morningTime || '07:30'}</span>
                        <div className="routine-moment__card">
                          <strong>Morning Session (2 mins)</strong>
                          <p>Freshen breath, wake up circulation, Standard or Whitening mode.</p>
                        </div>
                      </div>
                      <div className="routine-moment">
                        <span className="routine-moment__time">{profile?.eveningTime || '21:30'}</span>
                        <div className="routine-moment__card">
                          <strong>Evening Deep Clean (2 mins)</strong>
                          <p>Remove full-day plaque along the gumline with deliberate 45° sweeps.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="plan-strip" aria-labelledby="plan-strip-title">
                    <div className="section-heading-inline">
                      <div>
                        <p className="coach-eyebrow">28-DAY SMILE RESET</p>
                        <h2 id="plan-strip-title">Consistency, made visible.</h2>
                      </div>
                      <button className="text-button" type="button" onClick={() => setActiveTab('progress')}>
                        See full progress →
                      </button>
                    </div>
                    <div className="day-strip" id="day-strip" aria-label="28-day plan progress">
                      {Array.from({ length: 28 }, (_, i) => i + 1).map((dayNum) => {
                        const isDone = profile?.completedDays?.includes(dayNum);
                        const isCurrent = (profile?.completedDays?.length || 0) + 1 === dayNum;
                        return (
                          <span
                            key={dayNum}
                            className={`day-dot ${isDone ? 'is-complete' : ''} ${isCurrent ? 'is-current' : ''}`}
                            title={`Day ${dayNum}`}
                          >
                            {dayNum}
                          </span>
                        );
                      })}
                    </div>
                  </section>
                </section>
              )}

              {/* TAB 2: PROGRESS */}
              {activeTab === 'progress' && (
                <section className="coach-view is-active" data-view="progress" aria-labelledby="progress-title">
                  <div className="view-heading">
                    <div>
                      <p className="coach-eyebrow">YOUR PROGRESS</p>
                      <h1 id="progress-title">Every session adds up.</h1>
                    </div>
                  </div>

                  <div className="progress-overview">
                    <div className="progress-narrative">
                      <p id="progress-message">
                        You have completed {profile?.sessionsCompleted || 0} guided sessions.
                      </p>
                      <div className="progress-bar-large" aria-hidden="true">
                        <span
                          id="plan-progress-bar"
                          style={{
                            width: `${Math.min(100, Math.round(((profile?.completedDays?.length || 1) / 28) * 100))}%`,
                          }}
                        />
                      </div>
                      <small id="plan-progress-copy">
                        Day {profile?.completedDays?.length || 1} of 28
                      </small>
                    </div>

                    <dl className="progress-stats">
                      <div>
                        <dt>Current streak</dt>
                        <dd id="streak-value">{profile?.streak || 0} days</dd>
                      </div>
                      <div>
                        <dt>Guided sessions</dt>
                        <dd id="session-value">{profile?.sessionsCompleted || 0}</dd>
                      </div>
                      <div>
                        <dt>Completed days</dt>
                        <dd id="complete-days-value">{profile?.completedDays?.length || 0}</dd>
                      </div>
                    </dl>
                  </div>
                </section>
              )}

              {/* TAB 3: BRUSH CARE */}
              {activeTab === 'care' && (
                <section className="coach-view is-active" data-view="care" aria-labelledby="care-title">
                  <div className="view-heading">
                    <div>
                      <p className="coach-eyebrow">BRUSH CARE</p>
                      <h1 id="care-title">Keep your Miroooo ready.</h1>
                    </div>
                  </div>

                  <div className="care-hero">
                    <div className="care-hero__image">
                      <img
                        id="care-model-image"
                        src="/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-dupont-bristle-head-macro.webp"
                        alt="Close view of the Miroooo brush head"
                        width={1000}
                        height={1000}
                      />
                    </div>
                    <div className="care-hero__content">
                      <p className="coach-eyebrow">HEAD CHECK</p>
                      <h2 id="head-care-heading">
                        {daysUsed < 60 ? 'Your current head is in good condition.' : 'Approaching recommended 90-day replacement.'}
                      </h2>
                      <p id="head-care-copy">Dentists recommend replacing brush heads every 90 days for optimal plaque removal.</p>

                      <div className="head-life-track" aria-hidden="true">
                        <span id="head-life-progress" style={{ width: `${headLifePercent}%` }} />
                      </div>
                      <div className="head-life-meta">
                        <span id="head-days-used">{daysUsed} days used</span>
                        <span>Check at 90 days</span>
                      </div>

                      <button
                        className="coach-button coach-button--secondary"
                        id="replace-head-now"
                        type="button"
                        onClick={() => {
                          if (profile) {
                            const updated = { ...profile, headInstalledDate: new Date().toISOString() };
                            setProfile(updated);
                            localStorage.setItem('miroooo_smile_coach_profile', JSON.stringify(updated));
                          }
                        }}
                      >
                        I fitted a new head today
                      </button>
                    </div>
                  </div>

                  <div className="care-guide">
                    <section>
                      <span className="care-guide__number">01</span>
                      <h3>Rinse after every use</h3>
                      <p>Rinse the head under running water and remove any visible toothpaste residue.</p>
                    </section>
                    <section>
                      <span className="care-guide__number">02</span>
                      <h3>Let it air dry</h3>
                      <p>Store the brush upright and uncovered so moisture can leave the bristles.</p>
                    </section>
                    <section>
                      <span className="care-guide__number">03</span>
                      <h3>Check the bristles</h3>
                      <p>Replace earlier if the bristles become visibly frayed, flattened or damaged.</p>
                    </section>
                  </div>

                  <aside className="health-boundary">
                    <strong>Smile Coach supports your routine, not a diagnosis.</strong>
                    <p>
                      Persistent pain, bleeding, swelling or sensitivity should be discussed with a dentist or dental
                      hygienist.
                    </p>
                  </aside>
                </section>
              )}

              {/* TAB 4: PROFILE */}
              {activeTab === 'profile' && (
                <section className="coach-view is-active" data-view="profile" aria-labelledby="profile-title">
                  <div className="view-heading">
                    <div>
                      <p className="coach-eyebrow">MY PLAN</p>
                      <h1 id="profile-title">Make it work for real life.</h1>
                    </div>
                  </div>

                  <form
                    className="profile-form"
                    id="profile-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (profile) {
                        const updated = {
                          ...profile,
                          name,
                          model,
                          morningTime,
                          eveningTime,
                          goals: selectedGoals,
                        };
                        setProfile(updated);
                        localStorage.setItem('miroooo_smile_coach_profile', JSON.stringify(updated));
                        alert('Your plan preferences have been saved!');
                      }
                    }}
                  >
                    <section className="profile-section">
                      <div>
                        <h2>About you</h2>
                        <p>Used in greetings and your daily plan.</p>
                      </div>
                      <div className="profile-fields">
                        <label className="coach-field">
                          <span>First name</span>
                          <input
                            name="name"
                            type="text"
                            maxLength={24}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </label>
                        <label className="coach-field">
                          <span>My brush</span>
                          <select
                            name="model"
                            value={model}
                            onChange={(e) => setModel(e.target.value as 'x' | 'x2')}
                          >
                            <option value="x">Miroooo X1</option>
                            <option value="x2">Miroooo X2</option>
                          </select>
                        </label>
                      </div>
                    </section>

                    <section className="profile-section">
                      <div>
                        <h2>Reminder times</h2>
                        <p>Smile Coach shows these times in your routine.</p>
                      </div>
                      <div className="profile-fields profile-fields--two">
                        <label className="coach-field">
                          <span>Morning</span>
                          <input
                            name="morningTime"
                            type="time"
                            value={morningTime}
                            onChange={(e) => setMorningTime(e.target.value)}
                            required
                          />
                        </label>
                        <label className="coach-field">
                          <span>Evening</span>
                          <input
                            name="eveningTime"
                            type="time"
                            value={eveningTime}
                            onChange={(e) => setEveningTime(e.target.value)}
                            required
                          />
                        </label>
                      </div>
                    </section>

                    <div className="profile-actions">
                      <button className="coach-button coach-button--primary" type="submit">
                        Save changes
                      </button>
                      <button
                        className="text-button text-button--danger"
                        id="reset-plan"
                        type="button"
                        onClick={handleResetPlan}
                      >
                        Reset my local plan
                      </button>
                    </div>
                  </form>
                </section>
              )}
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="coach-bottom-nav" aria-label="Smile Coach navigation">
              <button
                className={activeTab === 'today' ? 'is-active' : ''}
                type="button"
                onClick={() => setActiveTab('today')}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12 12 4l9 8v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
                </svg>
                <span>Today</span>
              </button>
              <button
                className={activeTab === 'progress' ? 'is-active' : ''}
                type="button"
                onClick={() => setActiveTab('progress')}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 19V9m6 10V5m6 14v-7m4 7H2" />
                </svg>
                <span>Progress</span>
              </button>
              <button
                className={activeTab === 'care' ? 'is-active' : ''}
                type="button"
                onClick={() => setActiveTab('care')}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21s7-4 7-10V5l-7-3-7 3v6c0 6 7 10 7 10Z" />
                  <path d="m9 11 2 2 4-5" />
                </svg>
                <span>Care</span>
              </button>
              <button
                className={activeTab === 'profile' ? 'is-active' : ''}
                type="button"
                onClick={() => setActiveTab('profile')}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
                <span>My plan</span>
              </button>
            </nav>
          </section>
        )}
      </main>

      {/* 2-Minute Quadrant Session Takeover Overlay */}
      {isSessionOpen && (
        <section
          className="session-takeover"
          id="session-takeover"
          aria-labelledby="session-title"
          style={{ display: 'block' }}
        >
          <header className="session-header">
            <span className="coach-brand">MIROOOO</span>
            <button className="session-close" id="session-close" type="button" onClick={handleCloseSession}>
              End session
            </button>
          </header>

          {!sessionCompleted ? (
            <div className="session-layout">
              <div className="session-copy">
                <p className="coach-eyebrow" id="session-slot">
                  GUIDED 2-MINUTE SESSION
                </p>
                <h2 id="session-title">
                  {isTimerRunning ? `Brushing ${zoneNames[currentZone]}` : 'Session Paused'}
                </h2>
                <p id="session-cue">
                  {currentZone === 0 && 'Angle bristles 45° against the upper outer gumline. Let acoustic vibrations sweep gently.'}
                  {currentZone === 1 && 'Move smoothly to upper left quadrant. Focus on chewing surfaces and outer margins.'}
                  {currentZone === 2 && 'Clean lower left teeth and inner surfaces without aggressive manual pressure.'}
                  {currentZone === 3 && 'Final 30 seconds: Lower right quadrant and back molars. Almost done!'}
                </p>
                <div className="session-mode">
                  <span>Selected Mode</span>
                  <strong id="session-mode">Standard 45° Bass Sweep</strong>
                </div>
              </div>

              <div className="session-timer-wrap">
                <div className="session-ring" id="session-ring" style={{ ['--session-progress' as string]: `${progressDeg}deg` }}>
                  <div>
                    <span id="session-time">
                      {Math.floor(timerSecondsLeft / 60)}:{String(timerSecondsLeft % 60).padStart(2, '0')}
                    </span>
                    <small id="session-zone-label">{zoneNames[currentZone]}</small>
                  </div>
                </div>

                <div className="mouth-map" aria-label="Four brushing zones">
                  <span className={currentZone === 0 ? 'is-active' : ''} data-zone="0">
                    Upper right
                  </span>
                  <span className={currentZone === 1 ? 'is-active' : ''} data-zone="1">
                    Upper left
                  </span>
                  <span className={currentZone === 2 ? 'is-active' : ''} data-zone="2">
                    Lower left
                  </span>
                  <span className={currentZone === 3 ? 'is-active' : ''} data-zone="3">
                    Lower right
                  </span>
                </div>
              </div>

              <div className="session-controls">
                {isTimerRunning ? (
                  <button
                    className="coach-button coach-button--secondary"
                    id="session-pause"
                    type="button"
                    onClick={() => setIsTimerRunning(false)}
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    className="coach-button coach-button--primary coach-button--large"
                    id="session-start"
                    type="button"
                    onClick={() => setIsTimerRunning(true)}
                  >
                    Resume
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="session-complete" id="session-complete" style={{ display: 'block' }}>
              <div className="session-complete__mark" aria-hidden="true">
                ✓
              </div>
              <p className="coach-eyebrow">SESSION COMPLETED</p>
              <h2 id="complete-title">Two minutes, fully covered.</h2>
              <p id="complete-message">Your streak and progress have been updated on this device.</p>
              <button
                className="coach-button coach-button--primary"
                id="complete-return"
                type="button"
                onClick={handleCloseSession}
              >
                Return to today
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
