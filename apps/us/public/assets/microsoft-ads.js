(function () {
  "use strict";

  var PRIMARY_UET_TAG_ID = "211072489";
  var PURCHASE_UET_TAG_ID = "355060364";
  var ATTRIBUTION_STORAGE_KEY = "miroooo_attribution";
  var ATTRIBUTION_KEYS = [
    "msclkid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "source"
  ];

  function readStoredAttribution(storage) {
    try {
      return JSON.parse(storage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}");
    } catch (_) {
      return {};
    }
  }

  function persistAttribution() {
    var params = new URLSearchParams(window.location.search);
    var localStored = readStoredAttribution(window.localStorage);
    var sessionStored = readStoredAttribution(window.sessionStorage);
    var stored = Object.assign({}, localStored, sessionStored);

    ATTRIBUTION_KEYS.forEach(function (key) {
      var value = params.get(key);
      if (value) stored[key] = value.slice(0, 500);
    });

    if (!stored.landing_page) stored.landing_page = window.location.href.slice(0, 1000);
    if (!stored.referrer && document.referrer) stored.referrer = document.referrer.slice(0, 1000);

    try {
      window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(stored));
    } catch (_) {}

    try {
      window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(stored));
    } catch (_) {}

    return stored;
  }

  function getAttribution() {
    return persistAttribution();
  }

  function appendAttribution(urlStr) {
    if (!urlStr) return urlStr;
    try {
      var parsed = new URL(urlStr, window.location.origin);
      var currentAttr = persistAttribution();
      ATTRIBUTION_KEYS.forEach(function (key) {
        if (currentAttr[key] && !parsed.searchParams.has(key)) {
          parsed.searchParams.set(key, currentAttr[key]);
        }
      });
      return parsed.toString();
    } catch (_) {
      return urlStr;
    }
  }

  function initialiseUetQueue(queueName, tagId) {
    if (typeof window.UET !== "function") return;

    var pendingQueue = window[queueName] || [];
    var options = {
      ti: tagId,
      enableAutoSpaTracking: true,
      q: pendingQueue
    };

    window[queueName] = new window.UET(options);
    window[queueName].push("pageLoad");
  }

  function initialiseMicrosoftAds() {
    if (window.__mirooooMicrosoftAdsReady) return;
    window.__mirooooMicrosoftAdsReady = true;

    initialiseUetQueue("uetq", PRIMARY_UET_TAG_ID);
    initialiseUetQueue("shoppingUetq", PURCHASE_UET_TAG_ID);
  }

  persistAttribution();

  window.uetq = window.uetq || [];
  window.shoppingUetq = window.shoppingUetq || [];
  window.__mirooooMicrosoftAds = {
    primaryTagId: PRIMARY_UET_TAG_ID,
    purchaseTagId: PURCHASE_UET_TAG_ID,
    getAttribution: getAttribution,
    appendAttribution: appendAttribution,
    trackCheckout: function (details) {
      var payload = details || {};
      window.uetq.push("event", "begin_checkout", payload);
      window.shoppingUetq.push("event", "begin_checkout", payload);
    }
  };

  // Quiz CTA ("Claim My Personalised Match") and data-product-link click handler
  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target) return;

    var btn = target.closest("a, button, [role='button']");
    if (!btn) return;

    var text = (btn.textContent || "").trim();
    var isQuizMatchCta =
      /claim\s+my\s+personalised\s+match/i.test(text) ||
      /claim\s+my\s+match/i.test(text) ||
      btn.hasAttribute("data-quiz-cta") ||
      btn.classList.contains("quiz-cta") ||
      btn.getAttribute("data-action") === "claim-match";

    if (isQuizMatchCta) {
      var attr = persistAttribution();

      if (btn.tagName === "A" && btn.href) {
        try {
          var dest = new URL(btn.href, window.location.origin);
          ATTRIBUTION_KEYS.forEach(function (key) {
            if (attr[key] && !dest.searchParams.has(key)) {
              dest.searchParams.set(key, attr[key]);
            }
          });
          btn.href = dest.toString();
        } catch (_) {}
      }

      window.__mirooooMicrosoftAds.trackCheckout({
        content_type: "product",
        content_name: "Quiz Personalised Match",
        currency: "GBP"
      });
    }

    if (btn.tagName === "A" && (btn.hasAttribute("data-product-link") || isQuizMatchCta)) {
      try {
        var linkUrl = new URL(btn.href, window.location.origin);
        var activeAttr = persistAttribution();
        ATTRIBUTION_KEYS.forEach(function (key) {
          if (activeAttr[key] && !linkUrl.searchParams.has(key)) {
            linkUrl.searchParams.set(key, activeAttr[key]);
          }
        });
        btn.href = linkUrl.toString();
      } catch (_) {}
    }
  }, true);

  if (typeof window.UET === "function") {
    initialiseMicrosoftAds();
    return;
  }

  var existing = document.getElementById("miroooo-microsoft-uet");
  if (existing) {
    existing.addEventListener("load", initialiseMicrosoftAds, { once: true });
    return;
  }

  var script = document.createElement("script");
  script.id = "miroooo-microsoft-uet";
  script.async = true;
  script.src = "https://bat.bing.com/bat.js";
  script.addEventListener("load", initialiseMicrosoftAds, { once: true });
  document.head.appendChild(script);
})();
