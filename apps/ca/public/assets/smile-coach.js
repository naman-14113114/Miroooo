(function () {
  "use strict";

  const STORAGE_KEY = "miroooo_smile_coach_v1";
  const SESSION_SECONDS = 120;
  const PLAN_DAYS = 28;
  const HEAD_CHECK_DAYS = 90;
  const goals = {
    consistency: { label: "Stay consistent", task: ["Prepare tonight", "Put your brush where you will see it"] },
    coverage: { label: "Better coverage", task: ["Check every zone", "Follow all four 30-second zones"] },
    whitening: { label: "Whitening routine", task: ["Rinse after coffee or tea", "A small routine cue for today"] },
    gentle: { label: "Gentler technique", task: ["Use a light grip", "Guide the brush without hard scrubbing"] },
    freshness: { label: "Fresher mouth", task: ["Clean your tongue", "Add a gentle tongue clean today"] }
  };
  const goalOrder = Object.keys(goals);
  const zoneNames = ["Upper right", "Upper left", "Lower left", "Lower right"];
  const modelAssets = {
    x: {
      label: "Miroooo X",
      today: "/assets_ref/x/gallery/Miroooo_x_Silver-1.webp",
      care: "/assets_ref/x/gallery/Miroooo_x_Silver-5.webp"
    },
    x2: {
      label: "Miroooo X2",
      today: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp",
      care: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-dupont-bristle-head-macro.webp"
    }
  };

  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));
  const today = () => new Date();
  const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dateKey = (date) => {
    const value = date || today();
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
  };
  const dateFromKey = (key) => {
    const parts = String(key || "").split("-").map(Number);
    return new Date(parts[0] || 2000, (parts[1] || 1) - 1, parts[2] || 1);
  };
  const addDays = (date, amount) => {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + amount);
    return copy;
  };
  const dayDifference = (later, earlier) => Math.floor((startOfDay(later) - startOfDay(earlier)) / 86400000);
  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
  const safeText = (value, fallback) => String(value || fallback || "").trim().slice(0, 24);
  const plural = (count, singular, pluralValue) => `${count} ${count === 1 ? singular : (pluralValue || `${singular}s`)}`;
  const formatTime = (value) => {
    const parts = String(value || "07:30").split(":");
    const date = new Date(2000, 0, 1, Number(parts[0]), Number(parts[1]));
    return new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit" }).format(date);
  };
  const formatDate = (value, options) => new Intl.DateTimeFormat("en-GB", options || { day: "numeric", month: "short" }).format(value);

  function defaultState() {
    const current = dateKey();
    return {
      version: 1,
      onboardingComplete: false,
      profile: {
        name: "",
        model: "x2",
        goals: ["consistency", "coverage"],
        frequency: "once",
        interdental: "rarely",
        sensitive: false,
        morningTime: "07:30",
        eveningTime: "21:30",
        headInstalled: current,
        startDate: current
      },
      sessions: [],
      tasks: {}
    };
  }

  function normaliseState(candidate) {
    const fallback = defaultState();
    if (!candidate || typeof candidate !== "object") return fallback;
    const profile = candidate.profile && typeof candidate.profile === "object" ? candidate.profile : {};
    const selectedGoals = Array.isArray(profile.goals) ? profile.goals.filter((goal) => goalOrder.includes(goal)).slice(0, 3) : fallback.profile.goals;
    return {
      version: 1,
      onboardingComplete: Boolean(candidate.onboardingComplete),
      profile: {
        name: safeText(profile.name),
        model: modelAssets[profile.model] ? profile.model : fallback.profile.model,
        goals: selectedGoals.length ? selectedGoals : fallback.profile.goals,
        frequency: ["irregular", "once", "twice"].includes(profile.frequency) ? profile.frequency : fallback.profile.frequency,
        interdental: ["rarely", "some", "daily"].includes(profile.interdental) ? profile.interdental : fallback.profile.interdental,
        sensitive: Boolean(profile.sensitive),
        morningTime: /^\d{2}:\d{2}$/.test(profile.morningTime || "") ? profile.morningTime : fallback.profile.morningTime,
        eveningTime: /^\d{2}:\d{2}$/.test(profile.eveningTime || "") ? profile.eveningTime : fallback.profile.eveningTime,
        headInstalled: /^\d{4}-\d{2}-\d{2}$/.test(profile.headInstalled || "") ? profile.headInstalled : fallback.profile.headInstalled,
        startDate: /^\d{4}-\d{2}-\d{2}$/.test(profile.startDate || "") ? profile.startDate : fallback.profile.startDate
      },
      sessions: Array.isArray(candidate.sessions) ? candidate.sessions.filter((session) => session && /^\d{4}-\d{2}-\d{2}$/.test(session.dateKey || "") && ["morning", "evening"].includes(session.slot)).slice(-120) : [],
      tasks: candidate.tasks && typeof candidate.tasks === "object" ? candidate.tasks : {}
    };
  }

  function loadState() {
    try {
      return normaliseState(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    } catch (_) {
      return defaultState();
    }
  }

  let state = loadState();
  let onboardingStep = 1;
  let deferredInstallPrompt = null;
  let saveStatusTimer = 0;
  let resetDeadline = 0;
  let activeSession = null;
  let timerHandle = 0;
  let lastTimerStamp = 0;

  function saveState(message) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      const status = $("#save-status");
      if (status) {
        status.textContent = message || "Saved just now";
        clearTimeout(saveStatusTimer);
        saveStatusTimer = window.setTimeout(() => { status.textContent = "Saved on this device"; }, 2600);
      }
    } catch (_) {
      const status = $("#save-status");
      if (status) status.textContent = "This browser could not save changes";
    }
  }

  function planDay() {
    return clamp(dayDifference(today(), dateFromKey(state.profile.startDate)) + 1, 1, PLAN_DAYS);
  }

  function planPhase(day) {
    if (day <= 7) return "Foundation";
    if (day <= 14) return "Consistency";
    if (day <= 21) return "Technique";
    return "Ownership";
  }

  function recommendation() {
    const selected = state.profile.goals;
    const day = planDay();
    let focus = "Build a calm, repeatable rhythm.";
    let guidance = "Move slowly through all four zones and let the brush do the work for thirty seconds in each area.";
    if (selected.includes("gentle") || state.profile.sensitive) {
      focus = "Keep today light and controlled.";
      guidance = "Hold the handle with a relaxed grip. Guide the bristles slowly without pressing or scrubbing hard.";
    } else if (selected.includes("coverage")) {
      focus = "Give every zone equal time.";
      guidance = "Follow all four thirty-second zones. Linger at the gumline and let the timer move you on.";
    } else if (selected.includes("whitening")) {
      focus = "Make your whitening routine consistent.";
      guidance = "Use the same patient coverage pattern today. Consistent technique matters more than rushing.";
    } else if (selected.includes("freshness")) {
      focus = "Finish the full-mouth routine.";
      guidance = "Complete all four brushing zones, then add the tongue and between-teeth care in your plan.";
    }
    if (day > 21) guidance = `You have built the pattern. ${guidance}`;
    const mode = state.profile.model === "x2"
      ? ((selected.includes("gentle") || state.profile.sensitive) ? "Soft" : (selected.includes("whitening") ? "White" : "Clean"))
      : ((selected.includes("gentle") || state.profile.sensitive) ? "Gentle" : "Standard");
    return { focus, guidance, mode };
  }

  function sessionsFor(key) {
    return state.sessions.filter((session) => session.dateKey === key);
  }

  function hasSession(key, slot) {
    return state.sessions.some((session) => session.dateKey === key && session.slot === slot);
  }

  function completedPlanDays() {
    const start = dateFromKey(state.profile.startDate);
    let completed = 0;
    for (let index = 0; index < PLAN_DAYS; index += 1) {
      const key = dateKey(addDays(start, index));
      if (sessionsFor(key).length >= 2) completed += 1;
    }
    return completed;
  }

  function currentStreak() {
    let cursor = startOfDay(today());
    if (sessionsFor(dateKey(cursor)).length === 0) cursor = addDays(cursor, -1);
    let streak = 0;
    while (sessionsFor(dateKey(cursor)).length > 0 && streak < 365) {
      streak += 1;
      cursor = addDays(cursor, -1);
    }
    return streak;
  }

  function personalisedTasks() {
    const items = [];
    state.profile.goals.slice(0, 2).forEach((goal) => {
      if (goals[goal]) items.push({ id: goal, title: goals[goal].task[0], copy: goals[goal].task[1] });
    });
    if (state.profile.interdental !== "daily") items.push({ id: "interdental", title: "Clean between your teeth", copy: "Use your preferred interdental method today" });
    if (!items.some((item) => item.id === "freshness")) items.push({ id: "tongue", title: "Finish with your tongue", copy: "A brief, gentle clean completes the routine" });
    return items.slice(0, 3);
  }

  function renderIdentity() {
    const name = state.profile.name || "there";
    const model = modelAssets[state.profile.model];
    $$('[data-profile-name]').forEach((element) => { element.textContent = name; });
    $("#sidebar-name").textContent = state.profile.name ? `${state.profile.name}'s plan` : "My plan";
    $("#sidebar-model").textContent = model.label;
    $("#coach-avatar").textContent = (state.profile.name || "M").charAt(0).toUpperCase();
    $("#today-model-image").src = model.today;
    $("#care-model-image").src = model.care;
    $("#care-model-image").alt = `Close view of the ${model.label} brush head`;
  }

  function renderToday() {
    const now = today();
    const hour = now.getHours();
    const greeting = hour < 12 ? "Good morning" : (hour < 18 ? "Good afternoon" : "Good evening");
    $("#today-date").textContent = formatDate(now, { weekday: "long", day: "numeric", month: "long" }).toUpperCase();
    $("#today-title").firstChild.textContent = `${greeting}, `;
    const day = planDay();
    $("#plan-phase").textContent = `DAY ${day} · ${planPhase(day).toUpperCase()}`;
    const plan = recommendation();
    $("#daily-focus").textContent = plan.focus;
    $("#daily-guidance").textContent = plan.guidance;
    $("#recommended-mode").textContent = `Recommended today: ${plan.mode} mode`;
    renderRoutine();
    renderTasks();
    renderDayStrip();
  }

  function renderRoutine() {
    const key = dateKey();
    const slots = [
      { id: "morning", label: "Morning brush", time: state.profile.morningTime },
      { id: "evening", label: "Evening brush", time: state.profile.eveningTime }
    ];
    const completed = sessionsFor(key).filter((session, index, all) => all.findIndex((item) => item.slot === session.slot) === index).length;
    $("#routine-summary").textContent = `${completed} of 2 sessions completed`;
    $("#routine-timeline").innerHTML = slots.map((slot) => {
      const done = hasSession(key, slot.id);
      return `<article class="routine-row${done ? " is-complete" : ""}">
        <time class="routine-row__time" datetime="${slot.time}">${formatTime(slot.time)}</time>
        <div class="routine-row__copy"><strong>${slot.label}</strong><small>${done ? "Two guided minutes completed" : "Four zones, thirty seconds each"}</small></div>
        <div class="routine-row__state">${done ? "✓ Complete" : `<button class="coach-button coach-button--quiet" type="button" data-start-session="${slot.id}">Start</button>`}</div>
      </article>`;
    }).join("");
  }

  function renderTasks() {
    const key = dateKey();
    if (!state.tasks[key] || typeof state.tasks[key] !== "object") state.tasks[key] = {};
    $("#care-actions-list").innerHTML = personalisedTasks().map((task) => {
      const done = Boolean(state.tasks[key][task.id]);
      return `<button class="care-task${done ? " is-complete" : ""}" type="button" data-task-id="${task.id}" aria-pressed="${done}">
        <span class="care-task__check" aria-hidden="true">✓</span>
        <span class="care-task__copy"><strong>${task.title}</strong><small>${task.copy}</small></span>
        <span class="care-task__action">${done ? "Done" : "Mark done"}</span>
      </button>`;
    }).join("");
  }

  function renderDayStrip() {
    const start = dateFromKey(state.profile.startDate);
    const current = planDay();
    $("#day-strip").innerHTML = Array.from({ length: PLAN_DAYS }, (_, index) => {
      const day = index + 1;
      const key = dateKey(addDays(start, index));
      const classes = ["day-dot"];
      if (sessionsFor(key).length >= 2) classes.push("is-complete");
      if (day === current) classes.push("is-current");
      if (day > current) classes.push("is-future");
      return `<span class="${classes.join(" ")}" title="Day ${day}: ${sessionsFor(key).length} of 2 sessions"><span>${day}</span></span>`;
    }).join("");
  }

  function renderProgress() {
    const day = planDay();
    const streak = currentStreak();
    const total = state.sessions.length;
    const completeDays = completedPlanDays();
    $("#streak-value").textContent = plural(streak, "day");
    $("#session-value").textContent = String(total);
    $("#complete-days-value").textContent = String(completeDays);
    $("#plan-progress-bar").style.width = `${Math.round((day / PLAN_DAYS) * 100)}%`;
    $("#plan-progress-copy").textContent = `Day ${day} of ${PLAN_DAYS}`;
    $("#progress-message").textContent = total === 0
      ? "Your first completed brush will begin your progress story."
      : (streak > 1 ? `${plural(streak, "day")} in motion. Keep the next session simple.` : "You have started. One calm session at a time is enough.");

    const start = dateFromKey(state.profile.startDate);
    $("#plan-calendar").innerHTML = Array.from({ length: PLAN_DAYS }, (_, index) => {
      const date = addDays(start, index);
      const key = dateKey(date);
      const count = sessionsFor(key).length;
      const classes = ["calendar-day"];
      if (count >= 2) classes.push("is-complete");
      if (index + 1 === day) classes.push("is-current");
      return `<article class="${classes.join(" ")}"><span>DAY ${index + 1}</span><strong>${formatDate(date, { day: "numeric" })}</strong><small>${count ? `${Math.min(count, 2)} of 2 sessions` : formatDate(date, { month: "short" })}</small></article>`;
    }).join("");

    const recent = state.sessions.slice().sort((a, b) => String(b.completedAt).localeCompare(String(a.completedAt))).slice(0, 8);
    $("#session-history").innerHTML = recent.length ? recent.map((session) => {
      const completedAt = new Date(session.completedAt || dateFromKey(session.dateKey));
      return `<article class="history-row"><time datetime="${session.completedAt || session.dateKey}">${formatDate(completedAt)}</time><strong>${session.slot === "morning" ? "Morning" : "Evening"} guided brush</strong><small>${session.duration || SESSION_SECONDS} seconds · ${session.mode || "Standard"}</small></article>`;
    }).join("") : '<div class="empty-history"><strong>No sessions yet</strong><p>Complete a guided brush to start your history.</p></div>';
  }

  function renderCare() {
    const used = Math.max(0, dayDifference(today(), dateFromKey(state.profile.headInstalled)));
    const percent = clamp(Math.round((used / HEAD_CHECK_DAYS) * 100), 0, 100);
    $("#head-life-progress").style.width = `${percent}%`;
    $("#head-days-used").textContent = `${plural(used, "day")} used`;
    if (used >= HEAD_CHECK_DAYS) {
      $("#head-care-heading").textContent = "It is time to check your brush head.";
      $("#head-care-copy").textContent = "Replace it if the bristles are frayed, flattened or no longer feel effective.";
    } else if (used >= 70) {
      $("#head-care-heading").textContent = "A brush-head check is coming up.";
      $("#head-care-copy").textContent = `${HEAD_CHECK_DAYS - used} days remain in your 90-day check window. Replace sooner if wear is visible.`;
    } else {
      $("#head-care-heading").textContent = used < 7 ? "Your current head is new." : "Your brush head is within its check window.";
      $("#head-care-copy").textContent = `We are counting from ${formatDate(dateFromKey(state.profile.headInstalled), { day: "numeric", month: "long" })}. Check sooner if the bristles show wear.`;
    }
  }

  function renderProfile() {
    const form = $("#profile-form");
    form.elements.name.value = state.profile.name;
    form.elements.model.value = state.profile.model;
    form.elements.morningTime.value = state.profile.morningTime;
    form.elements.eveningTime.value = state.profile.eveningTime;
    $("#profile-goals").innerHTML = goalOrder.map((goal) => `<label class="goal-option"><input type="checkbox" name="profileGoals" value="${goal}"${state.profile.goals.includes(goal) ? " checked" : ""}><span><strong>${goals[goal].label}</strong><small>${goals[goal].task[1]}</small></span></label>`).join("");
  }

  function renderAll() {
    renderIdentity();
    renderToday();
    renderProgress();
    renderCare();
    renderProfile();
  }

  function showProduct() {
    $("#coach-onboarding").hidden = true;
    $("#coach-product").hidden = false;
    renderAll();
  }

  function updateOnboarding() {
    $$("[data-onboarding-step]").forEach((step) => {
      const active = Number(step.dataset.onboardingStep) === onboardingStep;
      step.classList.toggle("is-active", active);
      step.hidden = !active;
    });
    $("#onboarding-step-label").textContent = `Step ${onboardingStep} of 4`;
    $("#onboarding-progress-bar").style.width = `${onboardingStep * 25}%`;
    $("#onboarding-back").hidden = onboardingStep === 1;
    $("#onboarding-next").hidden = onboardingStep === 4;
    $("#onboarding-finish").hidden = onboardingStep !== 4;
    const active = $(`[data-onboarding-step="${onboardingStep}"]`);
    if (active) active.querySelector("input")?.focus({ preventScroll: true });
  }

  function validateOnboardingStep() {
    const form = $("#onboarding-form");
    if (onboardingStep === 1) return Boolean(form.elements.model.value);
    if (onboardingStep === 2) {
      const name = safeText(form.elements.name.value);
      const selected = $$('input[name="goals"]:checked', form);
      $("#goal-message").textContent = !name ? "Add your first name to personalise the plan." : (!selected.length ? "Choose at least one goal." : "");
      if (!name) form.elements.name.focus();
      return Boolean(name && selected.length);
    }
    return true;
  }

  function limitGoalSelections(selector, messageTarget) {
    const selected = $$(`${selector}:checked`);
    if (selected.length <= 3) return true;
    selected[selected.length - 1].checked = false;
    if (messageTarget) {
      messageTarget.textContent = "Choose up to three priorities.";
      window.setTimeout(() => { messageTarget.textContent = ""; }, 2200);
    }
    return false;
  }

  function completeOnboarding(event) {
    event.preventDefault();
    if (!validateOnboardingStep()) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const current = dateKey();
    state = normaliseState({
      onboardingComplete: true,
      profile: {
        name: data.get("name"),
        model: data.get("model"),
        goals: data.getAll("goals"),
        frequency: data.get("frequency"),
        interdental: data.get("interdental"),
        sensitive: data.has("sensitive"),
        morningTime: data.get("morningTime"),
        eveningTime: data.get("eveningTime"),
        headInstalled: data.get("headInstalled") || current,
        startDate: current
      },
      sessions: [],
      tasks: {}
    });
    saveState("Your plan is ready");
    showProduct();
    $("#today-title").focus?.();
  }

  function setView(view) {
    if (!['today', 'progress', 'care', 'profile'].includes(view)) return;
    $$("[data-view]").forEach((section) => {
      const active = section.dataset.view === view;
      section.classList.toggle("is-active", active);
      section.hidden = !active;
    });
    $$("[data-view-target]").forEach((button) => {
      const active = button.dataset.viewTarget === view;
      button.classList.toggle("is-active", active);
      if (active) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current");
    });
    if (view === "progress") renderProgress();
    if (view === "care") renderCare();
    if (view === "profile") renderProfile();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  function chooseSessionSlot(requested) {
    if (["morning", "evening"].includes(requested)) return requested;
    const key = dateKey();
    if (!hasSession(key, "morning")) return "morning";
    if (!hasSession(key, "evening")) return "evening";
    return today().getHours() < 15 ? "morning" : "evening";
  }

  function updateSessionDisplay() {
    if (!activeSession) return;
    const remaining = clamp(Math.ceil(activeSession.remaining), 0, SESSION_SECONDS);
    const elapsed = SESSION_SECONDS - remaining;
    const zone = clamp(Math.floor(elapsed / 30), 0, 3);
    $("#session-time").textContent = `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`;
    $("#session-zone-label").textContent = zoneNames[zone];
    $("#session-cue").textContent = activeSession.started
      ? `${zoneNames[zone]}: guide the brush slowly. Keep your grip relaxed and let the bristles stay in contact.`
      : "Wet your brush, add fluoride toothpaste and place the bristles gently against your teeth.";
    $("#session-ring").style.setProperty("--session-progress", `${(elapsed / SESSION_SECONDS) * 360}deg`);
    $$("[data-zone]").forEach((element, index) => {
      element.classList.toggle("is-active", index === zone && remaining > 0);
      element.classList.toggle("is-complete", index < zone || remaining === 0);
    });
  }

  function openSession(requested) {
    const slot = chooseSessionSlot(requested);
    const plan = recommendation();
    activeSession = { slot, mode: plan.mode, remaining: SESSION_SECONDS, started: false, paused: false };
    $("#session-slot").textContent = `${slot.toUpperCase()} SESSION`;
    $("#session-title").textContent = "Ready when you are.";
    $("#session-mode").textContent = plan.mode;
    $("#session-start").textContent = "Start 2 minutes";
    $("#session-start").hidden = false;
    $("#session-pause").hidden = true;
    $("#session-takeover").hidden = false;
    document.body.classList.add("session-open");
    updateSessionDisplay();
    $("#session-start").focus();
  }

  function timerTick(timestamp) {
    if (!activeSession || activeSession.paused || !activeSession.started) return;
    const elapsed = Math.min(1, (timestamp - lastTimerStamp) / 1000);
    lastTimerStamp = timestamp;
    activeSession.remaining -= elapsed;
    updateSessionDisplay();
    if (activeSession.remaining <= 0) {
      finishSession();
      return;
    }
    timerHandle = requestAnimationFrame(timerTick);
  }

  function beginSession() {
    if (!activeSession) return;
    activeSession.started = true;
    activeSession.paused = false;
    lastTimerStamp = performance.now();
    $("#session-title").textContent = "Follow the four zones.";
    $("#session-start").hidden = true;
    $("#session-pause").hidden = false;
    $("#session-pause").textContent = "Pause";
    cancelAnimationFrame(timerHandle);
    timerHandle = requestAnimationFrame(timerTick);
    if (navigator.vibrate && navigator.userActivation?.hasBeenActive) navigator.vibrate(45);
  }

  function toggleSessionPause() {
    if (!activeSession || !activeSession.started) return;
    activeSession.paused = !activeSession.paused;
    $("#session-pause").textContent = activeSession.paused ? "Resume" : "Pause";
    $("#session-title").textContent = activeSession.paused ? "Session paused." : "Follow the four zones.";
    if (!activeSession.paused) {
      lastTimerStamp = performance.now();
      timerHandle = requestAnimationFrame(timerTick);
    }
  }

  function closeSession() {
    cancelAnimationFrame(timerHandle);
    timerHandle = 0;
    activeSession = null;
    $("#session-takeover").hidden = true;
    document.body.classList.remove("session-open");
  }

  function finishSession() {
    if (!activeSession) return;
    const completed = { ...activeSession };
    const key = dateKey();
    state.sessions = state.sessions.filter((session) => !(session.dateKey === key && session.slot === completed.slot));
    state.sessions.push({
      id: `${key}-${completed.slot}`,
      dateKey: key,
      slot: completed.slot,
      completedAt: new Date().toISOString(),
      duration: SESSION_SECONDS,
      mode: completed.mode
    });
    closeSession();
    saveState("Session saved");
    renderAll();
    $("#complete-message").textContent = `${completed.slot === "morning" ? "Morning" : "Evening"} session added to day ${planDay()} of your plan.`;
    $("#session-complete").hidden = false;
    document.body.classList.add("session-open");
    if (navigator.vibrate && navigator.userActivation?.hasBeenActive) navigator.vibrate([70, 55, 120]);
    $("#complete-return").focus();
  }

  function saveProfile(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const selected = $$('input[name="profileGoals"]:checked', form).map((input) => input.value).slice(0, 3);
    if (!selected.length) {
      const first = $('input[name="profileGoals"]', form);
      first?.focus();
      return;
    }
    state.profile.name = safeText(form.elements.name.value);
    state.profile.model = modelAssets[form.elements.model.value] ? form.elements.model.value : "x2";
    state.profile.morningTime = form.elements.morningTime.value || "07:30";
    state.profile.eveningTime = form.elements.eveningTime.value || "21:30";
    state.profile.goals = selected;
    saveState("Plan changes saved");
    renderAll();
    setView("today");
  }

  function resetPlan() {
    const button = $("#reset-plan");
    if (Date.now() > resetDeadline) {
      resetDeadline = Date.now() + 5000;
      button.textContent = "Click again to reset";
      window.setTimeout(() => {
        if (Date.now() > resetDeadline) button.textContent = "Reset my local plan";
      }, 5100);
      return;
    }
    localStorage.removeItem(STORAGE_KEY);
    state = defaultState();
    window.location.reload();
  }

  function attachEvents() {
    $("#onboarding-next").addEventListener("click", () => {
      if (!validateOnboardingStep()) return;
      onboardingStep = Math.min(4, onboardingStep + 1);
      updateOnboarding();
    });
    $("#onboarding-back").addEventListener("click", () => {
      onboardingStep = Math.max(1, onboardingStep - 1);
      updateOnboarding();
    });
    $("#onboarding-form").addEventListener("submit", completeOnboarding);
    $("#onboarding-form").addEventListener("change", (event) => {
      if (event.target.name === "goals") limitGoalSelections('input[name="goals"]', $("#goal-message"));
    });
    $("#profile-form").addEventListener("submit", saveProfile);
    $("#profile-form").addEventListener("change", (event) => {
      if (event.target.name === "profileGoals") limitGoalSelections('input[name="profileGoals"]');
    });
    $("#reset-plan").addEventListener("click", resetPlan);
    $("#replace-head-now").addEventListener("click", () => {
      state.profile.headInstalled = dateKey();
      saveState("Brush-head date updated");
      renderCare();
    });
    $("#session-start").addEventListener("click", beginSession);
    $("#session-pause").addEventListener("click", toggleSessionPause);
    $("#session-close").addEventListener("click", closeSession);
    $("#complete-return").addEventListener("click", () => {
      $("#session-complete").hidden = true;
      document.body.classList.remove("session-open");
      setView("today");
    });
    document.addEventListener("click", (event) => {
      const viewButton = event.target.closest("[data-view-target]");
      if (viewButton) setView(viewButton.dataset.viewTarget);
      const sessionButton = event.target.closest("[data-start-session]");
      if (sessionButton) openSession(sessionButton.dataset.startSession);
      const taskButton = event.target.closest("[data-task-id]");
      if (taskButton) {
        const key = dateKey();
        if (!state.tasks[key]) state.tasks[key] = {};
        state.tasks[key][taskButton.dataset.taskId] = !state.tasks[key][taskButton.dataset.taskId];
        saveState("Daily action updated");
        renderTasks();
      }
      const installButton = event.target.closest("#install-app, [data-install-trigger]");
      if (installButton && deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.finally(() => {
          deferredInstallPrompt = null;
          showInstallButtons(false);
        });
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !$("#session-takeover").hidden) closeSession();
    });
  }

  function showInstallButtons(show) {
    $("#install-app").hidden = !show;
    $$('[data-install-trigger]').forEach((button) => { button.hidden = !show; });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    showInstallButtons(true);
  });

  if ("serviceWorker" in navigator && window.isSecureContext) {
    window.addEventListener("load", () => navigator.serviceWorker.register("/smile-coach-sw.js", { scope: "/smile-coach" }).catch(() => {}));
  }

  const headDate = $('input[name="headInstalled"]');
  if (headDate) {
    headDate.max = dateKey();
    headDate.value = dateKey();
  }
  attachEvents();
  if (state.onboardingComplete) {
    showProduct();
    const requestedView = new URLSearchParams(window.location.search).get("view");
    if (requestedView) setView(requestedView);
    if (new URLSearchParams(window.location.search).get("start") === "session") openSession("auto");
  } else {
    updateOnboarding();
  }

  window.MirooooSmileCoach = Object.freeze({
    getState: () => JSON.parse(JSON.stringify(state)),
    openSession,
    completeSessionForTesting: () => {
      if (!activeSession) openSession("auto");
      finishSession();
    }
  });
})();
