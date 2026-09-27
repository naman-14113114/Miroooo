(function () {
  "use strict";

  // Automatic Client-Side Version Check & Cache Invalidation
  (function enforceClientCacheInvalidation() {
    var CURRENT_VERSION = "20260903_v1";
    try {
      var storedVersion = localStorage.getItem("miroooo_client_version");
      if (storedVersion !== CURRENT_VERSION) {
        if ("caches" in window) {
          caches.keys().then(function (names) {
            names.forEach(function (name) {
              if (name !== "miroooo-smile-coach-v2") {
                caches.delete(name);
              }
            });
          }).catch(function () {});
        }
        if (document.cookie) {
          var cookies = document.cookie.split(";");
          for (var i = 0; i < cookies.length; i++) {
            var cName = cookies[i].split("=")[0].trim();
            if (cName.indexOf("miroooo_cache") !== -1 || cName.indexOf("stale_") !== -1 || cName.indexOf("sw_") !== -1) {
              document.cookie = cName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            }
          }
        }
        localStorage.setItem("miroooo_client_version", CURRENT_VERSION);
      }
    } catch (e) {}
  })();

  // =========================================================================
  // MIROOOO MULTI-CURRENCY LOCALIZATION ENGINE
  // =========================================================================
  const ASIA_COUNTRIES = [
    "IN", "CN", "JP", "SG", "MY", "TH", "VN", "ID", "PH", "PK",
    "BD", "LK", "HK", "TW", "KR", "AE", "SA", "QA", "KW", "OM",
    "BH", "IL", "TR", "KZ", "UZ", "NP", "MM", "KH", "LA", "MN",
    "LB", "JO", "IQ", "IR", "AF", "YE", "SY", "GE", "AM", "AZ",
    "MV", "BN", "BT", "TL", "MO"
  ];

  const UK_COUNTRIES = ["GB", "UK", "IM", "JE", "GG"];

  const EUROZONE_COUNTRIES = [
    "DE", "FR", "IT", "ES", "NL", "BE", "IE", "AT", "PT", "FI",
    "GR", "LU", "EE", "LV", "LT", "SK", "SI", "CY", "MT"
  ];

  const CURRENCY_CONFIGS = {
    GBP: { code: "GBP", symbol: "£", rate: 1.0 },
    USD: { code: "USD", symbol: "$", rate: 1.30 },
    AUD: { code: "AUD", symbol: "$", rate: 1.95 },
    CAD: { code: "CAD", symbol: "$", rate: 1.78 },
    NZD: { code: "NZD", symbol: "$", rate: 2.12 },
    EUR: { code: "EUR", symbol: "€", rate: 1.17 },
    CHF: { code: "CHF", symbol: "CHF ", rate: 1.13 },
    SEK: { code: "SEK", symbol: "kr ", rate: 13.50 },
    NOK: { code: "NOK", symbol: "kr ", rate: 13.80 },
    DKK: { code: "DKK", symbol: "kr. ", rate: 8.75 }
  };

  function resolveCurrencyByCountry(countryCode) {
    return { ...CURRENCY_CONFIGS.USD, isUK: false, isAsia: false };
  }

  const currencyListeners = [];
  let activeCurrency = { ...CURRENCY_CONFIGS.USD, isUK: false, isAsia: false };

  // Lock US Storefront Currency to USD
  let initialResolved = true;
  activeCurrency = { ...CURRENCY_CONFIGS.USD, isUK: false, isAsia: false };

  function notifyCurrencyChange() {
    const info = {
      code: activeCurrency.code,
      symbol: activeCurrency.symbol,
      rate: activeCurrency.rate,
      isAsia: Boolean(activeCurrency.isAsia),
      isUK: Boolean(activeCurrency.isUK)
    };
    currencyListeners.forEach((fn) => {
      try { fn(info); } catch (e) { console.error("Currency listener error:", e); }
    });
    document.dispatchEvent(new CustomEvent("miroooo:currency-change", { detail: info }));
    document.dispatchEvent(new CustomEvent("miroooo:currency-updated", { detail: info }));
    window.dispatchEvent(new CustomEvent("miroooo:currency-change", { detail: info }));
    window.dispatchEvent(new CustomEvent("miroooo:currency-updated", { detail: info }));
  }

  const MirooooCurrency = {
    getCurrency() {
      return {
        code: activeCurrency.code,
        symbol: activeCurrency.symbol,
        rate: activeCurrency.rate,
        isAsia: Boolean(activeCurrency.isAsia),
        isUK: Boolean(activeCurrency.isUK)
      };
    },

    convert(gbpAmount) {
      const num = Number(gbpAmount) || 0;
      if (activeCurrency.code === "GBP") {
        return num;
      }
      return Number((num * activeCurrency.rate).toFixed(2));
    },

    format(gbpAmount) {
      const num = Number(gbpAmount) || 0;
      if (activeCurrency.code === "GBP") {
        return Number.isInteger(num) ? "£" + num : "£" + num.toFixed(2);
      }
      const converted = Number((num * activeCurrency.rate).toFixed(2));
      return activeCurrency.symbol + converted.toFixed(2);
    },

    formatConverted(convertedAmount) {
      const num = Number(convertedAmount) || 0;
      if (activeCurrency.code === "GBP") {
        return Number.isInteger(num) ? "£" + num : "£" + num.toFixed(2);
      }
      return activeCurrency.symbol + num.toFixed(2);
    },

    onCurrencyChange(fn) {
      if (typeof fn === "function") {
        currencyListeners.push(fn);
      }
    },

    setCurrency(currencyCode) {
      const code = String(currencyCode || "").trim().toUpperCase();
      if (CURRENCY_CONFIGS[code]) {
        activeCurrency = {
          ...CURRENCY_CONFIGS[code],
          isUK: code === "GBP",
          isAsia: false
        };
        try {
          localStorage.setItem("miroooo_currency", code);
        } catch (_) {}
        this.updateAllElements();
        notifyCurrencyChange();
        if (typeof window.MirooooCart?.renderCartDrawer === "function") {
          window.MirooooCart.renderCartDrawer();
        }
      }
    },

    setCountry(countryCode) {
      if (!countryCode) return;
      const code = String(countryCode).trim().toUpperCase();
      activeCurrency = resolveCurrencyByCountry(code);
      try {
        localStorage.setItem("miroooo_user_country", code);
        localStorage.setItem("miroooo_currency", activeCurrency.code);
      } catch (_) {}
      this.updateAllElements();
      notifyCurrencyChange();
      if (typeof window.MirooooCart?.renderCartDrawer === "function") {
        window.MirooooCart.renderCartDrawer();
      }
    },

    updateAllElements() {
      document.querySelectorAll("[data-price-gbp]").forEach((el) => {
        const gbp = parseFloat(el.getAttribute("data-price-gbp"));
        if (!isNaN(gbp)) {
          el.textContent = this.format(gbp);
        }
      });
      document.querySelectorAll("[data-price-compare-gbp]").forEach((el) => {
        const gbp = parseFloat(el.getAttribute("data-price-compare-gbp"));
        if (!isNaN(gbp)) {
          el.textContent = this.format(gbp);
        }
      });
    }
  };

  window.MirooooCurrency = MirooooCurrency;

  // Exchange Rates Cache & Live Fetch Engine
  const RATES_CACHE_KEY = "miroooo_rates_cache";
  const RATES_CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours

  function applyRates(rates) {
    if (!rates || typeof rates !== "object") return;
    let rateChanged = false;
    Object.keys(CURRENCY_CONFIGS).forEach((code) => {
      if (code !== "GBP" && typeof rates[code] === "number" && rates[code] > 0) {
        CURRENCY_CONFIGS[code].rate = rates[code];
        if (activeCurrency.code === code) {
          activeCurrency.rate = rates[code];
          rateChanged = true;
        }
      }
    });
    if (rateChanged) {
      MirooooCurrency.updateAllElements();
      notifyCurrencyChange();
      if (typeof window.MirooooCart?.renderCartDrawer === "function") {
        window.MirooooCart.renderCartDrawer();
      }
    }
  }

  // Load from cache initially
  try {
    const cachedData = localStorage.getItem(RATES_CACHE_KEY);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      if (parsed && parsed.rates) {
        applyRates(parsed.rates);
      }
    }
  } catch (_) {}

  // Live Exchange Rate Fetching
  function fetchLiveRates() {
    let shouldFetch = true;
    try {
      const cachedData = localStorage.getItem(RATES_CACHE_KEY);
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        if (parsed && parsed.timestamp && (Date.now() - parsed.timestamp < RATES_CACHE_TTL) && parsed.rates) {
          shouldFetch = false;
        }
      }
    } catch (_) {}

    if (!shouldFetch) return;

    fetch("https://open.er-api.com/v6/latest/GBP")
      .then(function (res) {
        if (!res.ok) throw new Error("Primary rates API error");
        return res.json();
      })
      .then(function (data) {
        if (data && data.rates) {
          applyRates(data.rates);
          try {
            localStorage.setItem(RATES_CACHE_KEY, JSON.stringify({
              timestamp: Date.now(),
              rates: data.rates
            }));
          } catch (_) {}
        } else {
          throw new Error("Invalid primary rates format");
        }
      })
      .catch(function () {
        fetch("https://api.exchangerate-api.com/v4/latest/GBP")
          .then(function (res) {
            if (!res.ok) throw new Error("Fallback rates API error");
            return res.json();
          })
          .then(function (data) {
            if (data && data.rates) {
              applyRates(data.rates);
              try {
                localStorage.setItem(RATES_CACHE_KEY, JSON.stringify({
                  timestamp: Date.now(),
                  rates: data.rates
                }));
              } catch (_) {}
            }
          })
          .catch(function (err) {
            console.warn("Live exchange rate fetch failed; using fallback rates.", err);
          });
      });
  }

  fetchLiveRates();

  // Geo Morocco Blocking Check
  (function detectUserGeoCurrency() {
    try {
      fetch("/api/geo/check")
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && (data.blocked || data.isMorocco || data.country === "MA")) {
            window.location.href = "/blocked";
          }
        }).catch(function () {});
    } catch (_) {}
  })();

  const arrowIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const accountIcon = '<svg class="icon icon-account icon-lg" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10.5" height="10.5" x="6.75" y="1.75" rx="5.25"></rect><path stroke-linecap="round" d="M12 15.5c1.5 0 4 .333 4.5.5.5.167 3.7.8 4.5 2 1 1.5 1 2 1 4m-10-6.5c-1.5 0-4 .333-4.5.5-.5.167-3.7.8-4.5 2-1 1.5-1 2-1 4"></path></svg>';
  const bagIcon = '<svg class="icon icon-cart icon-lg" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M1 1h.5v0c.226 0 .339 0 .44.007a3 3 0 0 1 2.62 1.976c.034.095.065.204.127.42l.17.597m0 0 1.817 6.358c.475 1.664.713 2.496 1.198 3.114a4 4 0 0 0 1.633 1.231c.727.297 1.592.297 3.322.297h2.285c1.75 0 2.626 0 3.359-.302a4 4 0 0 0 1.64-1.253c.484-.627.715-1.472 1.175-3.161l.06-.221c.563-2.061.844-3.092.605-3.906a3 3 0 0 0-1.308-1.713C19.92 4 18.853 4 16.716 4H4.857ZM12 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path></svg>';
  const menuIcon = '<svg class="icon icon-hamburger icon-lg" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" d="M3 6H21M3 12H11M3 18H16"></path></svg>';
  const closeIcon = '<svg class="icon icon-close icon-sm" viewBox="0 0 20 20" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15L15 5M5 5L15 15"></path></svg>';
  const supportIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-2v-6h4M4 13h4v6H6a2 2 0 0 1-2-2v-4Z"/></svg>';
  const deliveryIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 6h12v11H3zM15 10h3l3 3v4h-6z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>';
  const secureIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
  const techIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';
  const userMenuIcon = '<svg class="dropdown-item__icon" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';

  function getCurrentPage() {
    if (document.body && document.body.dataset && document.body.dataset.page) {
      return document.body.dataset.page;
    }
    const path = window.location.pathname || "";
    if (path === "/" || path === "/index.html" || path === "") return "home";
    if (path.startsWith("/products/miroooo-x2-heads")) return "product-x2-heads";
    if (path.startsWith("/products/miroooo-x1-heads")) return "product-x1-heads";
    if (path.startsWith("/products/miroooo-x2")) return "product-x2";
    if (path.startsWith("/products/miroooo-x")) return "product-x";
    if (path.startsWith("/products")) return "product";
    if (path.includes("dentalcare-quiz") || path.includes("quiz")) return "dentalcare-quiz";
    if (path.includes("shop")) return "shop";
    if (path.includes("about")) return "about-us";
    if (path.includes("contact")) return "contact";
    if (path.includes("faq")) return "faq";
    if (path.includes("cart")) return "cart";
    return "";
  }
  const currentPage = getCurrentPage();
  const current = (pages) => pages.includes(currentPage) ? ' aria-current="page"' : "";
  const flipLabel = (label) => `<span class="nav-link__flip"><span>${label}</span><span aria-hidden="true">${label}</span></span>`;
  const chevronDownIcon = '<svg class="dropdown-chevron" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg>';
  const menuPill = (href, label, pages) => `
    <li>
      <a href="${href}" class="menu__item nav-link text-sm-lg flex items-center font-medium z-2 relative cursor-pointer" is="magnet-link" data-magnet="0"${pages ? current(pages) : ""}>
        <span class="btn-text" data-text="${label}">${label}</span>
        <span class="btn-text btn-duplicate">${label}</span>
      </a>
    </li>`;

  function renderGlobalHeader() {
    const headerTarget = document.querySelector("[data-site-header]");
    if (!headerTarget) return;
    if (headerTarget.dataset.headerRendered) return;
    headerTarget.dataset.headerRendered = "true";

    const tickerItemSet = `
          <div class="miroooo-ticker-item"><span>Free tracked US delivery</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>50% OFF Today</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>Ultra Lightweight</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>4.9 Stars from 40,000+ Customers</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>`;

    const announcementHTML = `
      <div class="announcement" style="background: #e6e6e6; color: #111111; padding: 4px 0; overflow: hidden; width: 100%; min-height: 24px; border-bottom: 1px solid rgba(0, 0, 0, 0.08);">
        <div class="miroooo-announcement-ticker">
${tickerItemSet.repeat(12)}
        </div>
      </div>`;

    if (currentPage === "cart" || headerTarget.closest('[data-page="cart"]') || window.location.pathname.includes("/cart") || window.location.pathname.endsWith("cart.html")) {
      headerTarget.classList.remove("header-layer--overlay");
      headerTarget.innerHTML = `
      ${announcementHTML}
      <header class="site-header site-header--cart" is="custom-header" style="background: #080909; border-bottom: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: center; align-items: center; width: 100%;">
        <div class="header__logo flex justify-center w-full items-center" style="padding: 16px 0; justify-content: center; width: 100%;"><a href="/" class="header__logo-link" style="text-decoration: none;"><span class="miroooo-brand-logo" style="font-family: 'Montserrat', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: clamp(1.35rem, 2vw, 1.65rem); font-weight: 800; letter-spacing: 0.03em; text-transform: uppercase; color: #ffffff; line-height: 1;">MIROOOO</span></a></div>
      </header>`;
      return;
    }

    const isOverlayHeader = Boolean(headerTarget.hasAttribute("data-overlay-header") || currentPage === "home" || window.location.pathname === "/" || window.location.pathname === "/index.html");
    headerTarget.classList.toggle("header-layer--overlay", isOverlayHeader);
    if (isOverlayHeader && !document.body.dataset.page) {
      document.body.setAttribute("data-page", "home");
    }
    const logoBrandText = "MIROOOO";

    headerTarget.innerHTML = `
      ${announcementHTML}
      <menu-drawer id="MenuDrawer" class="menu-drawer drawer drawer--start z-30 fixed bottom-0 left-0 h-full w-full pointer-events-none" hidden>
        <overlay-element class="overlay fixed-modal invisible opacity-0 fixed bottom-0 left-0 w-full h-screen pointer-events-none" aria-controls="MenuDrawer" aria-expanded="false"></overlay-element>
        <div class="drawer__inner z-10 absolute top-0 flex flex-col w-full h-full overflow-hidden">
          <gesture-element class="drawer__header flex items-center justify-between relative">
            <span class="drawer__title heading lg:text-3xl text-2xl leading-none tracking-tight"></span>
            <button class="button button--secondary button--close drawer__close mobile-panel__close flex items-center justify-center" type="button" is="hover-button" aria-controls="MenuDrawer" aria-expanded="false" aria-label="Close">
              <span class="btn-fill" data-fill></span>
              <span class="btn-text">
                <svg class="icon icon-close icon-sm" viewBox="0 0 20 20" stroke="#ffffff" fill="none" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 15L15 5M5 5L15 15"></path>
                </svg>
              </span>
            </button>
          </gesture-element>
          <div class="drawer__content opacity-0 invisible flex flex-col h-full grow shrink">
            <nav class="relative grow overflow-hidden" role="navigation" aria-label="Mobile navigation">
              <ul class="drawer__scrollable drawer__menu relative w-full h-full" role="list" data-parent>
                <li class="drawer__menu-item--group">
                  <div class="drawer__group-label">Shop</div>
                  <div class="drawer__subgroup-label">Brushes</div>
                  <ul class="drawer__submenu" role="list">
                    <li>
                      <a class="drawer__submenu-item flex flex-col" href="/products/miroooo-x">
                        <span class="drawer__submenu-title">Miroooo X1</span>
                      </a>
                    </li>
                    <li>
                      <a class="drawer__submenu-item flex flex-col" href="/products/miroooo-x2">
                        <span class="drawer__submenu-title">Miroooo X2</span>
                      </a>
                    </li>
                  </ul>
                  <div class="drawer__subgroup-label">Accessories</div>
                  <ul class="drawer__submenu" role="list">
                    <li>
                      <a class="drawer__submenu-item flex flex-col" href="/products/miroooo-x1-heads">
                        <span class="drawer__submenu-title">Miroooo X1 Heads</span>
                      </a>
                    </li>
                    <li>
                      <a class="drawer__submenu-item flex flex-col" href="/products/miroooo-x2-heads">
                        <span class="drawer__submenu-title">Miroooo X2 Heads</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li><a class="drawer__menu-item block heading text-2xl leading-none tracking-tight" href="/pages/about-us">About Us</a></li>
                <li><a class="drawer__menu-item block heading text-2xl leading-none tracking-tight" href="/pages/dentalcare-quiz">Dental Care Quiz</a></li>
                <li><a class="drawer__menu-item block heading text-2xl leading-none tracking-tight" href="/pages/contact-us">Contact Us</a></li>
                <li><a class="drawer__menu-item block heading text-2xl leading-none tracking-tight" href="/pages/faqs">FAQs</a></li>
              </ul>
            </nav>
            <div class="drawer__footer grid w-full">
              <div class="drawer__footer-bottom flex items-center justify-between gap-6">
              </div>
            </div>
          </div>
        </div>
      </menu-drawer>
      <header class="site-header${isOverlayHeader ? " site-header--overlay" : ""}" is="custom-header">
        <div class="site-header__inner">
          <div class="site-header__left flex items-center justify-start">
            <div class="header__icons header__icons--start lg:hidden flex items-center justify-start">
              <div class="header__buttons flex items-center gap-1d5">
                <button class="nav-toggle menu-drawer-button flex items-center justify-center lg:hidden" type="button" aria-expanded="false" aria-controls="MenuDrawer" aria-label="Open menu" is="magnet-button">
                  <span class="sr-only">Navigation</span>
                  ${menuIcon}
                </button>
              </div>
            </div>
            <div class="header__navigation hidden lg:flex lg:gap-5 lg:justify-start">
              <nav class="header__menu site-nav hidden lg:flex" role="navigation" aria-label="Primary">
                <ul class="flex flex-wrap list-menu with-block">
                  <li>
                    <button type="button" id="ShopDrawerTrigger" class="menu__item nav-link header__shop-drawer-btn flex items-center font-medium z-2 relative cursor-pointer" style="border: none; outline: none; box-shadow: none; background: transparent; background-color: transparent;" aria-haspopup="dialog" aria-expanded="false" aria-controls="ShopDrawer" aria-label="Open Shop drawer" is="magnet-link" data-magnet="0"${["product-x", "product-x2", "product-x2-heads", "product-x1-heads", "shop"].includes(currentPage) ? ' aria-current="page"' : ""}>
                      <span class="btn-text flex items-center" data-text="Shop">Shop ${chevronDownIcon}</span>
                      <span class="btn-text btn-duplicate flex items-center">Shop ${chevronDownIcon}</span>
                    </button>
                  </li>
                  ${menuPill("/pages/about-us", "About Us", ["about", "about-us"])}
                  ${menuPill("/pages/dentalcare-quiz", "Dental Care Quiz", ["dentalcare-quiz", "quiz"])}
                </ul>
              </nav>
            </div>
          </div>
          <div class="site-header__center header__logo flex justify-center z-2" itemscope itemtype="http://schema.org/Organization">
            <a class="site-logo header__logo-link flex items-center relative" href="/" itemprop="url" style="text-decoration: none;" aria-label="Miroooo home">
              <span class="miroooo-brand-logo" style="font-family: 'Montserrat', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: clamp(1.35rem, 2vw, 1.65rem); font-weight: 800; letter-spacing: 0.03em; text-transform: uppercase; color: #ffffff; line-height: 1;">${logoBrandText}</span>
            </a>
          </div>
          <div class="site-header__right site-actions header__icons header__icons--end flex justify-end items-center z-2">
            <div class="header__navigation header__navigation--right hidden lg:flex items-center">
              <nav class="header__menu site-nav site-nav--right hidden lg:flex" role="navigation" aria-label="Secondary">
                <ul class="flex flex-wrap list-menu with-block">
                  ${menuPill("/pages/contact-us", "Contact Us", ["contact", "contact-us"])}
                  ${menuPill("/pages/faqs", "FAQs", ["faq", "faqs"])}
                </ul>
              </nav>
            </div>
            <div class="header__buttons flex items-center gap-1d5">
              <a class="site-actions__bag cart-drawer-button flex items-center justify-center relative" href="/cart" aria-label="Cart" is="magnet-link" aria-controls="CartDrawer" aria-expanded="false" data-no-instant>
                <span class="sr-only">Cart</span>
                ${bagIcon}
                <cart-count class="count absolute top-0 right-0 text-xs" aria-label="0 items" hidden>0</cart-count>
              </a>
            </div>
          </div>
        </div>
      </header>`;

    if (isOverlayHeader) {
      const headerEl = headerTarget.querySelector(".site-header");
      const checkScroll = () => {
        if (!headerEl) return;
        if (window.scrollY > 40) {
          headerEl.classList.add("is-scrolled");
        } else {
          headerEl.classList.remove("is-scrolled");
        }
      };
      window.addEventListener("scroll", checkScroll, { passive: true });
      checkScroll();
    }
  }

  function renderGlobalFooter() {
    if (currentPage === "cart" || window.location.pathname.includes("/cart")) return;
    const footerTarget = document.querySelector("[data-site-footer]");
    if (!footerTarget) return;
    if (footerTarget.dataset.footerRendered) return;
    footerTarget.dataset.footerRendered = "true";

    footerTarget.innerHTML = `
      <footer-group class="footer-group block w-full">
        <aside class="service-strip" aria-label="Miroooo customer care">
          <div class="service-strip__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="service-strip__icon" aria-hidden="true"><path d="M4 14a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/><path d="M4 14v4a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H4"/></svg>
            <div>
              <strong>Customer support</strong>
              <span>Real help when you need it</span>
            </div>
          </div>
          <div class="service-strip__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="service-strip__icon" aria-hidden="true"><rect x="1" y="5" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 18 16 18 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <div>
              <strong>Tracked US delivery</strong>
              <span>Free with every brush</span>
            </div>
          </div>
          <div class="service-strip__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="service-strip__icon" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            <div>
              <strong>Secure checkout</strong>
              <span>Encrypted &amp; protected</span>
            </div>
          </div>
          <div class="service-strip__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="service-strip__icon" aria-hidden="true"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/></svg>
            <div>
              <strong>Sonic technology</strong>
              <span>Precision oral care</span>
            </div>
          </div>
        </aside>
        <footer class="site-footer" role="contentinfo">
          <div class="site-footer__main">
            <!-- Column 0: Brand -->
            <div class="site-footer__brand">
              <a class="site-footer__logo" href="/" aria-label="Miroooo home">MIROOOO</a>
              <p class="site-footer__tagline">Quietly precise electric toothbrushes, built to make better brushing feel uncomplicated.</p>
              <div class="site-footer__address">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="site-footer__address-icon" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>131 Continental Dr Suite 305, Newark, DE 19713, USA</span>
              </div>
            </div>

            <!-- Column 1: SHOP -->
            <div class="site-footer__column">
              <h4 class="site-footer__heading">SHOP</h4>
              <ul class="site-footer__links">
                <li><a href="/">Home</a></li>
                <li><a href="/products/miroooo-x" data-product-link>Miroooo X1</a></li>
                <li><a href="/products/miroooo-x2" data-product-link>Miroooo X2</a></li>
                <li><a href="/products/miroooo-x1-heads" data-product-link>Miroooo X1 Heads</a></li>
                <li><a href="/products/miroooo-x2-heads" data-product-link>Miroooo X2 Heads</a></li>
                <li><a href="/policies/privacy-policy">Privacy Policy</a></li>
                <li><a href="/policies/return-policy">Return Policy</a></li>
                <li><a href="/policies/shipping-policy">Shipping Policy</a></li>
                <li><a href="/policies/refund-policy">Refund Policy</a></li>
                <li><a href="/policies/terms-of-service">Terms of Service</a></li>
              </ul>
            </div>

            <!-- Column 2: SUPPORT -->
            <div class="site-footer__column">
              <h4 class="site-footer__heading">SUPPORT</h4>
              <ul class="site-footer__links">
                <li><a href="/pages/smile-coach">Free Smile Coach App</a></li>
                <li><a href="/pages/dentalcare-quiz">Dental Care Quiz</a></li>
                <li><a href="/pages/contact-us">Contact Us</a></li>
                <li><a href="/pages/about-us">About Us</a></li>
                <li><a href="/guides">Oral Care Guides</a></li>
                <li><a href="/pages/faqs">FAQs</a></li>
                <li><a href="/policies/cookies-policy">Cookies Policy</a></li>
              </ul>
            </div>

            <!-- Column 3: GET IN TOUCH -->
            <div class="site-footer__column site-footer__column--touch">
              <h4 class="site-footer__heading">GET IN TOUCH</h4>
              <div class="site-footer__touch-content">
                <p class="site-footer__hours">Operating Hours<br>Monday - Friday - 9am - 5pm EST</p>
                <p class="site-footer__email">
                  <a href="mailto:support@trymiroooo.com" class="underline underline-offset-4" style="color: #ffffff;">support@trymiroooo.com</a>
                </p>
                <div class="site-footer__socials" aria-label="Social media links">
                  <a href="https://www.facebook.com/profile.php?id=61593351131893" target="_blank" rel="noopener noreferrer" class="site-footer__social-btn" aria-label="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/miroooo_official/" target="_blank" rel="noopener noreferrer" class="site-footer__social-btn" aria-label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="https://www.youtube.com/channel/UCVMc0L8ja_3DCL_bI3dczrQ" target="_blank" rel="noopener noreferrer" class="site-footer__social-btn" aria-label="YouTube">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="site-footer__bottom">
            <div class="site-footer__copyright">
              &copy; 2026 MIROOOO - ALL RIGHTS RESERVED
            </div>
            <ul class="site-footer__payments" aria-label="Accepted payment methods">
              <li><img src="/assets/icons/visa.svg" alt="Visa" width="38" height="24" loading="lazy" decoding="async" /></li>
              <li><img src="/assets/icons/mastercard.svg" alt="Mastercard" width="38" height="24" loading="lazy" decoding="async" /></li>
              <li><img src="/assets/icons/amex.svg" alt="American Express" width="38" height="24" loading="lazy" decoding="async" /></li>
              <li><img src="/assets/icons/jcb.svg" alt="JCB" width="38" height="24" loading="lazy" decoding="async" /></li>
              <li><img src="/assets/icons/paypal.svg" alt="PayPal" width="38" height="24" loading="lazy" decoding="async" /></li>
            </ul>
          </div>
        </footer>
      </footer-group>`;
  }

  // Mobile Menu Drawer Handler
  function initMobileMenuDrawer() {
    const menuDrawer = document.getElementById("MenuDrawer");
    if (!menuDrawer) return;

    const overlay = menuDrawer.querySelector(".overlay, overlay-element");
    const closeBtn = menuDrawer.querySelector(".drawer__close, button.drawer__close, .mobile-panel__close");
    const openBtns = document.querySelectorAll('[aria-controls="MenuDrawer"], .menu-drawer-button, .nav-toggle');
    const drawerInner = menuDrawer.querySelector(".drawer__inner");
    function openDrawer() {
      menuDrawer.removeAttribute("hidden");
      requestAnimationFrame(() => {
        menuDrawer.setAttribute("active", "");
        menuDrawer.setAttribute("open", "");
        document.body.classList.add("nav-open", "has-modal-open");
        openBtns.forEach((btn) => btn.setAttribute("aria-expanded", "true"));
      });
    }

    function closeDrawer() {
      menuDrawer.removeAttribute("active");
      menuDrawer.removeAttribute("open");
      document.body.classList.remove("nav-open", "has-modal-open");
      openBtns.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
      setTimeout(() => {
        if (!menuDrawer.hasAttribute("active")) {
          menuDrawer.setAttribute("hidden", "");
        }
      }, 800);
    }

    openBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = menuDrawer.hasAttribute("active");
        if (isOpen) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    });

    closeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      closeDrawer();
    });

    overlay?.addEventListener("click", (e) => {
      e.preventDefault();
      closeDrawer();
    });

    menuDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeDrawer();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuDrawer.hasAttribute("active")) {
        closeDrawer();
      }
    });

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth >= 991 && menuDrawer.hasAttribute("active")) {
          closeDrawer();
        }
      }, 100);
    }, { passive: true });

    // Touch gesture drag-to-dismiss physics
    let touchStartY = 0;
    let touchMoveY = 0;
    let isDragging = false;

    menuDrawer.addEventListener("touchstart", (e) => {
      if (!menuDrawer.hasAttribute("active")) return;
      const target = e.target;
      if (target.closest(".drawer__header") || target.closest(".drawer__inner")) {
        touchStartY = e.touches[0].clientY;
        touchMoveY = 0;
        isDragging = true;
      }
    }, { passive: true });

    menuDrawer.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const currentY = e.touches[0].clientY;
      const diffY = currentY - touchStartY;
      if (diffY > 0) {
        touchMoveY = diffY;
        if (drawerInner) {
          drawerInner.style.transform = `translate3d(0, ${diffY}px, 0)`;
          drawerInner.style.transition = "none";
        }
        if (overlay) {
          const opacity = Math.max(0, 1 - diffY / (window.innerHeight * 0.6));
          overlay.style.opacity = String(opacity);
          overlay.style.transition = "none";
        }
      }
    }, { passive: true });

    menuDrawer.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;
      const threshold = Math.min(160, window.innerHeight * 0.22);
      if (touchMoveY > threshold) {
        if (drawerInner) {
          drawerInner.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
        }
        if (overlay) {
          overlay.style.transition = "opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
        }
        closeDrawer();
        setTimeout(() => {
          if (drawerInner) drawerInner.style.transform = "";
          if (overlay) overlay.style.opacity = "";
        }, 550);
      } else {
        if (drawerInner) {
          drawerInner.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
          drawerInner.style.transform = "translate3d(0, 0, 0)";
        }
        if (overlay) {
          overlay.style.transition = "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
          overlay.style.opacity = "1";
        }
        setTimeout(() => {
          if (drawerInner) drawerInner.style.transition = "";
          if (overlay) overlay.style.transition = "";
        }, 450);
      }
      touchMoveY = 0;
    }, { passive: true });
  }

  // Header Dropdown Toggle & Accessibility Logic
  function initHeaderDropdowns() {
    const dropdowns = document.querySelectorAll(".header__dropdown, [data-dropdown]");
    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector(".header__dropdown-toggle, [aria-haspopup='true']");
      if (!toggle) return;

      const setOpen = (open) => {
        dropdown.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      };

      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdown.classList.contains("is-open") || toggle.getAttribute("aria-expanded") === "true";
        setOpen(!isOpen);
      });

      dropdown.addEventListener("mouseenter", () => {
        if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
          setOpen(true);
        }
      });

      dropdown.addEventListener("mouseleave", () => {
        if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
          setOpen(false);
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".header__dropdown, [data-dropdown]")) {
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("is-open");
          const toggle = dropdown.querySelector(".header__dropdown-toggle, [aria-haspopup='true']");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("is-open");
          const toggle = dropdown.querySelector(".header__dropdown-toggle, [aria-haspopup='true']");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  // Shop Sidebar Drawer Handler (Strict Click-to-Open Only)
  function ensureShopDrawer() {
    let drawer = document.getElementById("ShopDrawer");
    if (!drawer) {
      drawer = document.createElement("div");
      drawer.id = "ShopDrawer";
      drawer.className = "shop-drawer";
      drawer.setAttribute("aria-hidden", "true");
      drawer.setAttribute("role", "dialog");
      drawer.setAttribute("aria-modal", "true");
      drawer.setAttribute("aria-label", "Shop oral care collection");
      drawer.innerHTML = `
        <div class="shop-drawer__overlay" data-shop-drawer-close aria-label="Close Shop drawer" tabindex="-1"></div>
        <aside class="shop-drawer__inner">
          <div class="shop-drawer__header">
            <h2 class="shop-drawer__title">Shop</h2>
            <button type="button" class="shop-drawer__close" data-shop-drawer-close aria-label="Close Shop drawer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px!important;height:18px!important;flex-shrink:0!important;">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="shop-drawer__body">
            <!-- Section 1: Brushes -->
            <div class="shop-drawer__section">
              <span class="shop-drawer__section-title">Brushes</span>
              <ul class="shop-drawer__list">
                <li>
                  <a href="/products/miroooo-x" class="shop-drawer__card" data-shop-item="brush-x1">
                    <div class="shop-drawer__thumb">
                      <img src="/assets_ref/x/gallery/Miroooo_x_Pink-1.webp" alt="Miroooo X1" width="140" height="140" loading="lazy" />
                    </div>
                    <div class="shop-drawer__info">
                      <span class="shop-drawer__eyebrow">The Essential</span>
                      <h3 class="shop-drawer__product-title">Miroooo X1</h3>
                      <span class="shop-drawer__price"><span data-price-gbp="59">${MirooooCurrency.format(59)}</span> <s class="shop-drawer__compare" data-price-compare-gbp="119">${MirooooCurrency.format(119)}</s></span>
                    </div>
                    <svg class="shop-drawer__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px!important;height:16px!important;min-width:16px!important;max-width:16px!important;min-height:16px!important;max-height:16px!important;flex-shrink:0!important;"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </a>
                </li>
                <li>
                  <a href="/products/miroooo-x2" class="shop-drawer__card" data-shop-item="brush-x2">
                    <div class="shop-drawer__thumb">
                      <img src="/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-upright-grip.webp" alt="Miroooo X2" width="140" height="140" loading="lazy" />
                    </div>
                    <div class="shop-drawer__info">
                      <span class="shop-drawer__eyebrow">Flagship Pro</span>
                      <h3 class="shop-drawer__product-title">Miroooo X2</h3>
                      <span class="shop-drawer__price"><span data-price-gbp="69">${MirooooCurrency.format(69)}</span> <s class="shop-drawer__compare" data-price-compare-gbp="139">${MirooooCurrency.format(139)}</s></span>
                    </div>
                    <svg class="shop-drawer__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px!important;height:16px!important;min-width:16px!important;max-width:16px!important;min-height:16px!important;max-height:16px!important;flex-shrink:0!important;"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </a>
                </li>
              </ul>
            </div>

            <!-- Section 2: Accessories -->
            <div class="shop-drawer__section">
              <span class="shop-drawer__section-title">Accessories</span>
              <ul class="shop-drawer__list">
                <li>
                  <a href="/products/miroooo-x1-heads" class="shop-drawer__card" data-shop-item="brush-x1-heads">
                    <div class="shop-drawer__thumb">
                      <img src="/assets_ref/x/heads/B1.webp" alt="Miroooo X1 Heads" width="140" height="140" loading="lazy" />
                    </div>
                    <div class="shop-drawer__info">
                      <span class="shop-drawer__eyebrow">Replacement</span>
                      <h3 class="shop-drawer__product-title">Miroooo X1 Heads</h3>
                      <span class="shop-drawer__price" data-price-gbp="10">${MirooooCurrency.format(10)}</span>
                    </div>
                    <svg class="shop-drawer__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px!important;height:16px!important;min-width:16px!important;max-width:16px!important;min-height:16px!important;max-height:16px!important;flex-shrink:0!important;"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </a>
                </li>
                <li>
                  <a href="/products/miroooo-x2-heads" class="shop-drawer__card" data-shop-item="brush-x2-heads">
                    <div class="shop-drawer__thumb">
                      <img src="/assets_ref/x2/heads/B1.webp" alt="Miroooo X2 Heads" width="140" height="140" loading="lazy" />
                    </div>
                    <div class="shop-drawer__info">
                      <span class="shop-drawer__eyebrow">Replacement</span>
                      <h3 class="shop-drawer__product-title">Miroooo X2 Heads</h3>
                      <span class="shop-drawer__price" data-price-gbp="10">${MirooooCurrency.format(10)}</span>
                    </div>
                    <svg class="shop-drawer__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px!important;height:16px!important;min-width:16px!important;max-width:16px!important;min-height:16px!important;max-height:16px!important;flex-shrink:0!important;"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      `;
      document.body.appendChild(drawer);
    }
  }

  function initShopDrawer() {
    ensureShopDrawer();
    const shopDrawer = document.getElementById("ShopDrawer");
    if (!shopDrawer) return;

    const overlay = shopDrawer.querySelector(".shop-drawer__overlay, [data-shop-drawer-close]");
    const closeBtns = shopDrawer.querySelectorAll(".shop-drawer__close, [data-shop-drawer-close]");
    const triggers = document.querySelectorAll("#ShopDrawerTrigger, [aria-controls='ShopDrawer'], .header__shop-drawer-btn, [data-shop-drawer-toggle]");
    const itemLinks = shopDrawer.querySelectorAll("a");

    function openShopDrawer() {
      const cartDrawer = document.getElementById("CartDrawer");
      if (cartDrawer && typeof window.MirooooCart?.closeCart === "function") {
        window.MirooooCart.closeCart();
      }
      const menuDrawer = document.getElementById("MenuDrawer");
      if (menuDrawer && menuDrawer.hasAttribute("active")) {
        menuDrawer.removeAttribute("active");
        menuDrawer.removeAttribute("open");
      }

      shopDrawer.removeAttribute("hidden");
      requestAnimationFrame(() => {
        shopDrawer.classList.add("is-open");
        shopDrawer.setAttribute("active", "");
        document.body.classList.add("shop-drawer-open", "has-modal-open");
        triggers.forEach((btn) => btn.setAttribute("aria-expanded", "true"));
      });
    }

    function closeShopDrawer() {
      shopDrawer.classList.remove("is-open");
      shopDrawer.removeAttribute("active");
      document.body.classList.remove("shop-drawer-open", "has-modal-open");
      triggers.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
      setTimeout(() => {
        if (!shopDrawer.classList.contains("is-open")) {
          shopDrawer.setAttribute("hidden", "");
        }
      }, 350);
    }

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("#ShopDrawerTrigger, [aria-controls='ShopDrawer'], .header__shop-drawer-btn, [data-shop-drawer-toggle]");
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        if (shopDrawer.classList.contains("is-open")) {
          closeShopDrawer();
        } else {
          openShopDrawer();
        }
      }
    }, true);

    closeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        closeShopDrawer();
      });
    });

    overlay?.addEventListener("click", (e) => {
      e.preventDefault();
      closeShopDrawer();
    });

    itemLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeShopDrawer();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && shopDrawer.classList.contains("is-open")) {
        closeShopDrawer();
      }
    });

    window.ShopDrawer = {
      open: openShopDrawer,
      close: closeShopDrawer,
      toggle: () => (shopDrawer.classList.contains("is-open") ? closeShopDrawer() : openShopDrawer())
    };
  }

  // Live UK Midnight Countdown Engine (Europe/London timezone)
  function initGlobalUKCountdown() {
    const timerElements = document.querySelectorAll("#x2CountdownTimer, #x2UkCountdown, .x2-uk-countdown");
    if (!timerElements.length) return;

    const getUKMidnightRemaining = () => {
      try {
        const now = new Date();
        const dtf = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        const parts = dtf.formatToParts(now);
        const getVal = (type) => parseInt(parts.find(p => p.type === type)?.value || '0', 10);

        const hours = getVal('hour') % 24;
        const minutes = getVal('minute');
        const seconds = getVal('second');

        const elapsedSeconds = hours * 3600 + minutes * 60 + seconds;
        const totalDaySeconds = 86400; // 24 hours
        let remSeconds = totalDaySeconds - elapsedSeconds;

        if (remSeconds <= 0) {
          remSeconds = totalDaySeconds; // Reset at midnight
        }

        const h = Math.floor(remSeconds / 3600);
        const m = Math.floor((remSeconds % 3600) / 60);
        const s = remSeconds % 60;
        const pad = (n) => String(n).padStart(2, '0');

        const dayProgress = elapsedSeconds / totalDaySeconds;
        const fillPercent = Math.max(35, Math.min(95, Math.round(95 - (dayProgress * 60))));

        return {
          formatted: `${pad(h)}:${pad(m)}:${pad(s)}`,
          fillPercent,
          remSeconds
        };
      } catch (e) {
        const localNow = new Date();
        const rem = 86400 - (localNow.getHours() * 3600 + localNow.getMinutes() * 60 + localNow.getSeconds());
        const h = String(Math.floor(rem / 3600)).padStart(2, '0');
        const m = String(Math.floor((rem % 3600) / 60)).padStart(2, '0');
        const s = String(rem % 60).padStart(2, '0');
        return { formatted: `${h}:${m}:${s}`, fillPercent: 75, remSeconds: rem };
      }
    };

    const updateAll = () => {
      const data = getUKMidnightRemaining();
      timerElements.forEach((el) => {
        el.textContent = data.formatted;
      });
      const timelineFill = document.getElementById("x2TimelineFill");
      if (timelineFill) {
        timelineFill.style.width = `${data.fillPercent}%`;
      }
    };

    updateAll();
    setInterval(updateAll, 1000);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") updateAll();
    });
  }

  function initDeferredVideos() {
    const videos = document.querySelectorAll("video[data-src]");
    if (!videos.length) return;

    const loadVideo = (video) => {
      if (!video.dataset.src) return;
      video.src = video.dataset.src;
      video.removeAttribute("data-src");
      video.load();
      const playback = video.play();
      if (playback && typeof playback.catch === "function") playback.catch(() => {});
    };

    // Immediate top-to-bottom priority eager loading: do not defer until scroll intersection
    videos.forEach(loadVideo);
  }

  // Render components immediately
  renderGlobalHeader();
  renderGlobalFooter();
  initMobileMenuDrawer();
  initShopDrawer();
  initHeaderDropdowns();
  initGlobalUKCountdown();
  initDeferredVideos();

  // Authentic GoBrush Magnet Spring Hover Physics
  const initMagnet = () => {
    const magnetTargets = document.querySelectorAll(
      '[is="magnet-link"], [is="magnet-button"]'
    );
    magnetTargets.forEach((target) => {
      if (target.dataset.magnetAttached) return;
      target.dataset.magnetAttached = "true";

      const btnText = target.querySelector("[data-text]");

      let rafId = null;
      target.addEventListener("mousemove", (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = target.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;

          if (btnText) {
            btnText.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
            btnText.style.transition = "transform 0.08s ease-out";
          } else {
            target.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
            target.style.transition = "transform 0.08s ease-out";
          }
        });
      }, { passive: true });

      target.addEventListener("mouseleave", () => {
        if (rafId) cancelAnimationFrame(rafId);
        if (btnText) {
          btnText.style.transform = "translate3d(0px, 0px, 0px)";
          btnText.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        } else {
          target.style.transform = "translate3d(0px, 0px, 0px)";
          target.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        }
      });
    });
  };

  // Unified Button Hover & Fill Interaction Engine
  const initHoverButtons = () => {
    const hoverTargets = document.querySelectorAll(
      '[is="hover-button"], [is="hover-link"], .btn-fill, [data-fill]'
    );
    hoverTargets.forEach((target) => {
      const btn = target.closest('button, a, .button, .gb-button, #hero-cta, #sticky-bar-cta-btn, .proxy-bundle-btn, .miroooo-sticky-btn, .cart-checkout-cta-btn, .about-btn-action, .track-submit-btn, .faq-action-btn, .miroooo-btn-load-more') || (target.tagName === 'BUTTON' || target.tagName === 'A' ? target : null);
      if (!btn || btn.dataset.hoverAttached) return;
      btn.dataset.hoverAttached = "true";

      const btnFill = btn.querySelector(".btn-fill, [data-fill]");
      if (!btnFill) return;

      btn.addEventListener("mouseenter", () => {
        btn.classList.add("is-hovered");
      });

      btn.addEventListener("mouseleave", () => {
        btn.classList.remove("is-hovered");
      });
    });
  };

  // Authentic GoBrush Flickity Horizontal Sliding Hover Track on Cards
  const initSlideGalleries = () => {
    document.querySelectorAll("[data-slide-gallery]").forEach((gallery) => {
      if (gallery.dataset.slideAttached) return;
      gallery.dataset.slideAttached = "true";

      const track = gallery.querySelector(".gb-product-card__track");
      const slides = gallery.querySelectorAll(".gb-product-card__slide");
      const dots = gallery.querySelectorAll(".flickity-page-dots .dot");
      const count = slides.length;
      if (!track || count <= 1) return;

      const selectSlide = (index) => {
        track.style.transform = `translate3d(-${index * (100 / count)}%, 0, 0)`;
        dots.forEach((dot, i) => {
          dot.classList.toggle("is-selected", i === index);
        });
      };

      gallery.addEventListener("mousemove", (e) => {
        const rect = gallery.getBoundingClientRect();
        const mouseX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const index = Math.min(Math.floor((mouseX / rect.width) * count), count - 1);
        selectSlide(index);
      });

      gallery.addEventListener("mouseleave", () => {
        selectSlide(0);
      });
    });
  };

  function runAllInits() {
    renderGlobalHeader();
    renderGlobalFooter();
    initMobileMenuDrawer();
    initShopDrawer();
    initHeaderDropdowns();
    initGlobalUKCountdown();
    initDeferredVideos();
    initMagnet();
    initHoverButtons();
    initSlideGalleries();
    if (window.MirooooCart && typeof window.MirooooCart.init === "function") window.MirooooCart.init();
    if (typeof window.initProductPage === "function") window.initProductPage();
  }
  window.runAllInits = runAllInits;

  runAllInits();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runAllInits);
  }
  window.addEventListener("load", runAllInits);
  setTimeout(runAllInits, 50);
  setTimeout(runAllInits, 200);

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const allowedAttribution = ["msclkid", "gclid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "source"];
  const incoming = new URLSearchParams(window.location.search);
  const captured = {};

  allowedAttribution.forEach((key) => {
    const value = incoming.get(key);
    if (value) captured[key] = value;
  });

  let existingStored = {};
  try {
    const fromSession = JSON.parse(sessionStorage.getItem("miroooo_attribution") || "{}");
    const fromLocal = JSON.parse(localStorage.getItem("miroooo_attribution") || "{}");
    existingStored = Object.assign({}, fromLocal, fromSession);
  } catch (_) {}

  const mergedAttribution = Object.assign({}, existingStored, captured);

  if (Object.keys(mergedAttribution).length) {
    try {
      sessionStorage.setItem("miroooo_attribution", JSON.stringify(mergedAttribution));
    } catch (_) {}
    try {
      localStorage.setItem("miroooo_attribution", JSON.stringify(mergedAttribution));
    } catch (_) {}
  }

  const attribution = mergedAttribution;

  function decorateAttributionLinks(root) {
    if (!Object.keys(attribution).length) return;
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll("a[data-product-link], a[data-quiz-cta], a.quiz-cta, [data-product-link] a").forEach((link) => {
      try {
        const target = new URL(link.href, window.location.origin);
        Object.entries(attribution).forEach(([key, value]) => {
          if (value && typeof value === "string") target.searchParams.set(key, value);
        });
        link.href = target.toString();
      } catch (_) {}
    });
  }

  decorateAttributionLinks();

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5%" });
    revealItems.forEach((item) => observer.observe(item));
  }

  requestAnimationFrame(() => document.body.classList.add("is-ready"));

  document.querySelectorAll("[data-drag-scroll]").forEach((scroller) => {
    let pointerDown = false;
    let pointerStart = 0;
    let scrollStart = 0;
    let moved = false;

    scroller.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") return;
      // Don't capture pointer when clicking inside a link – let <a> navigate
      if (event.target.closest("a")) return;
      pointerDown = true;
      moved = false;
      pointerStart = event.clientX;
      scrollStart = scroller.scrollLeft;
      scroller.classList.add("is-dragging");
      scroller.setPointerCapture(event.pointerId);
    });
    scroller.addEventListener("pointermove", (event) => {
      if (!pointerDown) return;
      const distance = event.clientX - pointerStart;
      if (Math.abs(distance) > 5) moved = true;
      scroller.scrollLeft = scrollStart - distance;
    });
    const endDrag = (event) => {
      if (!pointerDown) return;
      pointerDown = false;
      scroller.classList.remove("is-dragging");
      if (scroller.hasPointerCapture(event.pointerId)) scroller.releasePointerCapture(event.pointerId);
    };
    scroller.addEventListener("pointerup", endDrag);
    scroller.addEventListener("pointercancel", endDrag);
    scroller.addEventListener("click", (event) => {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    }, true);
  });

  const trackingForm = document.querySelector("[data-tracking-form]");
  trackingForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = document.querySelector("[data-tracking-message]");
    if (!message) return;
    message.classList.add("is-visible");
    message.focus();
  });

  // =========================================================================
  // MIROOOO UNIVERSAL CART & PLUSBASE CHECKOUT REDIRECTION ENGINE
  // =========================================================================
  const CART_STORAGE_KEY = "miroooo_cart_v1";
  const ATTRIBUTION_STORAGE_KEY = "miroooo_attribution";

  const X_VARIANTS = {
    "Grey": "1000020700958564",
    "Gray": "1000020700958564",
    "Pink": "1000020700958562",
    "Rose Gold": "1000020700958562",
    "Silver": "1000020700958563"
  };

  const X2_VARIANTS = {
    "Grey": "1000020700182883",
    "Gray": "1000020700182883",
    "Pink": "1000020700182882",
    "Rose Gold": "1000020700182882",
    "Silver": "1000020700182884"
  };

  const GIFTS_DATABASE = {
    case: {
      id: "travel-case",
      name: "Luxury Travel Case",
      subtitle: "Protect & travel in style",
      value: "£16",
      valueNum: 16,
      image: "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-5.jpg?v=1734444578&width=120"
    },
    heads: {
      id: "brush-heads",
      name: "2x Extra DuPont Brush Heads",
      subtitle: "Ultra-soft DuPont bristles",
      value: "£20",
      valueNum: 20,
      image: "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-4.jpg?v=1734444578&width=120"
    }
  };

  function readCapturedAttribution() {
    const currentParams = new URLSearchParams(window.location.search);
    const captured = {};
    const allowed = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "msclkid", "gclid", "fbclid", "source"];

    allowed.forEach((key) => {
      const val = currentParams.get(key);
      if (val) captured[key] = val;
    });

    let stored = {};
    try {
      const fromSession = JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}");
      const fromLocal = JSON.parse(localStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}");
      stored = Object.assign({}, fromLocal, fromSession);
    } catch (_) {
      stored = {};
    }

    const merged = Object.assign({}, stored, captured);
    if (Object.keys(merged).length) {
      try {
        sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged));
      } catch (_) {}
      try {
        localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged));
      } catch (_) {}
    }
    return merged;
  }

  function decorateAttributionUrl(urlStr) {
    return decorateCheckoutUrl(urlStr, readCapturedAttribution(), "");
  }

  window.MirooooAttribution = {
    read: readCapturedAttribution,
    decorateUrl: decorateAttributionUrl,
  };

  function decorateCheckoutUrl(urlStr, attribution, discountCode) {
    if (!urlStr) return urlStr;
    try {
      const u = new URL(urlStr, window.location.origin);
      if (discountCode) {
        const code = Array.isArray(discountCode)
          ? discountCode.map(c => String(c).trim().toUpperCase()).filter(Boolean).pop() || ""
          : String(discountCode || "").trim();
        if (code && !u.searchParams.has("discount")) {
          u.searchParams.set("discount", code);
        }
      }
      const allowed = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "msclkid", "gclid", "fbclid", "source"];
      allowed.forEach((key) => {
        if (attribution && attribution[key] && !u.searchParams.has(key)) {
          u.searchParams.set(key, String(attribution[key]));
        }
      });
      return u.toString();
    } catch (_) {
      return urlStr;
    }
  }

  async function createXpageCheckoutSession(cartOrItem, extraParams = {}) {
    const rawCart = MirooooCart.getCart();
    let itemsToProcess = [];

    if (cartOrItem && Array.isArray(cartOrItem.items) && cartOrItem.items.length > 0) {
      itemsToProcess = cartOrItem.items;
    } else if (cartOrItem && cartOrItem.productHandle) {
      itemsToProcess = [cartOrItem];
    } else if (rawCart && Array.isArray(rawCart.items) && rawCart.items.length > 0) {
      itemsToProcess = rawCart.items;
    }

    let items = [];
    let x2Count = 0;

    itemsToProcess.forEach(item => {
      const h = item.productHandle || (item.productId === "1000000675616058" ? "miroooo-x2-heads" : (item.productId === "1000000675072187" ? "miroooo-x2" : (item.productId === "1000000675471182" ? "miroooo-x1-heads" : "miroooo-x")));
      const isX1Heads = h === "miroooo-x1-heads" || h === "miroooo-x-heads";
      const isX2Heads = h === "miroooo-x2-heads";
      const isHeads = isX1Heads || isX2Heads;
      const isX2 = h === "miroooo-x2";
      const qty = Math.max(1, parseInt(item.quantity || item.bundleCount || "1", 10));

      if (isX2) x2Count += qty;

      if (isHeads) {
        items.push({
          id: item.id,
          productHandle: h,
          productId: isX1Heads ? "1000000675471182" : "1000000675616058",
          variantId: isX1Heads ? "1000020710139724" : "1000020718937117",
          quantity: qty
        });
      } else {
        const variants = isX2 ? X2_VARIANTS : X_VARIANTS;
        const color = item.color || "Grey";
        const vId = variants[color] || variants["Grey"] || variants["Gray"] || variants["Pink"] || variants["Silver"] || (isX2 ? "1000020700182883" : "1000020700958564");
        const pId = isX2 ? "1000000675072187" : "1000000675113473";
        items.push({
          id: item.id,
          productHandle: h,
          color,
          productId: pId,
          variantId: vId,
          quantity: qty
        });
      }
    });

    // Unlocked free brush heads for X2 Buy 2+
    if (x2Count >= 2) {
      const extraSets = x2Count - 1;
      items.push({
        id: "miroooo-x2-heads:free",
        productHandle: "miroooo-x2-heads",
        isFree: true,
        productId: "1000000675616058",
        variantId: "1000020718937117",
        quantity: extraSets
      });
    }

    const attribution = readCapturedAttribution();
    Object.assign(attribution, extraParams);

    if (window.__mirooooMicrosoftAds && typeof window.__mirooooMicrosoftAds.trackCheckout === "function") {
      try {
        window.__mirooooMicrosoftAds.trackCheckout({
          content_type: "product",
          content_name: itemsToProcess[0]?.title || "Miroooo Toothbrush",
          currency: "GBP",
          value: itemsToProcess[0]?.unitPrice || 69
        });
      } catch (_) {}
    }

    const validCodes = ["MIROOOO", "MIROOOO10", "FREE2HEADS", "FREE4HEADS", "2-BRUSH-BUNDLE-SPECIAL", "3-BRUSH-BUNDLE-OFFER", "3-BRUSH-BUNDLE-SPECIAL"];
    let promoList = [];
    try {
      const storedArr = JSON.parse(localStorage.getItem("miroooo_promo_codes") || "[]");
      if (Array.isArray(storedArr)) {
        promoList = storedArr.map((c) => String(c).trim().toUpperCase()).filter((c) => validCodes.includes(c));
      }
    } catch (_) {}
    if (promoList.length === 0) {
      const single = (localStorage.getItem("miroooo_promo_code") || "").trim().toUpperCase();
      if (single) {
        single.split(",").forEach((c) => {
          const trimmed = c.trim();
          if (validCodes.includes(trimmed)) promoList.push(trimmed);
        });
      }
    }

    if (x2Count === 2) {
      promoList = promoList.filter((c) => c !== "3-BRUSH-BUNDLE-OFFER" && c !== "FREE4HEADS");
      if (!promoList.includes("2-BRUSH-BUNDLE-SPECIAL")) promoList.unshift("2-BRUSH-BUNDLE-SPECIAL");
      if (!promoList.includes("FREE2HEADS")) promoList.push("FREE2HEADS");
    } else if (x2Count >= 3) {
      promoList = promoList.filter((c) => c !== "2-BRUSH-BUNDLE-SPECIAL" && c !== "FREE2HEADS");
      if (!promoList.includes("3-BRUSH-BUNDLE-OFFER")) promoList.unshift("3-BRUSH-BUNDLE-OFFER");
      if (!promoList.includes("FREE4HEADS")) promoList.push("FREE4HEADS");
    }

    promoList = [...new Set(promoList)];
    const validDiscount = promoList.length > 0 ? promoList.join(",") : "";
    const discountCode = extraParams.discount || validDiscount;

    // 1. Serverless prepare route
    let prepareError = null;
    try {
      const response = await fetch("/api/checkout/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items,
          discountCode: discountCode,
          discountCodes: promoList,
          attribution: attribution,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data?.checkoutUrl) {
          const checkout = new URL(data.checkoutUrl);
          if (checkout.origin !== "https://8e9c584880e3.myxpage.shop" ||
              !/\/checkout\/[\da-f]{64}$/i.test(checkout.pathname)) {
            throw new Error("Checkout is not ready on XPageDrop yet.");
          }
          return decorateCheckoutUrl(checkout.toString(), attribution, "");
        }
      }
      const errorBody = await response.json().catch(() => null);
      prepareError = new Error(errorBody?.error || "Could not prepare the XPageDrop checkout.");
    } catch (err) {
      prepareError = err;
      console.warn("XPageDrop checkout preparation failed", err);
    }

    throw prepareError || new Error("Could not prepare the XPageDrop checkout.");
  }

  const MirooooCart = {
    timerInterval: null,
    timerSeconds: 585, // 09m : 45s

    getCart() {
      try {
        if (localStorage.getItem("miroooo_cart_empty") === "true") {
          return { version: 2, items: [], promoCode: "AUTO", promoApplied: true };
        }

        const storedStandard = localStorage.getItem("miroooo_cart");
        if (storedStandard) {
          const parsed = JSON.parse(storedStandard);
          if (parsed) {
            if (Array.isArray(parsed.items) && parsed.items.length > 0) {
              return {
                version: 2,
                items: parsed.items.map(item => {
                  const h = item.productHandle || "miroooo-x";
                  const color = item.color || "Grey";
                  const qty = Math.max(1, parseInt(item.quantity || "1", 10));
                  return {
                    id: item.id || `${h}:${color}`,
                    productHandle: h,
                    productId: item.productId || (h === "miroooo-x2" ? "1000000675072187" : (h === "miroooo-x2-heads" ? "1000000675616058" : (h === "miroooo-x1-heads" ? "1000000675471182" : "1000000675113473"))),
                    variantId: item.variantId || (h === "miroooo-x2" ? (color === "Pink" ? "1000020700182882" : (color === "Silver" ? "1000020700182884" : "1000020700182883")) : (h === "miroooo-x2-heads" ? "1000020718937117" : (h === "miroooo-x1-heads" ? "1000020710139724" : (color === "Pink" ? "1000020700958562" : (color === "Silver" ? "1000020700958563" : "1000020700958564"))))),
                    title: (h === "miroooo-x2" ? "Miroooo X2" : (h === "miroooo-x2-heads" ? "Miroooo X2 Heads" : (h === "miroooo-x1-heads" ? "Miroooo X1 Heads" : "Miroooo X1"))),
                    subtitle: (h === "miroooo-x2-heads" ? "DuPont precision heads for Miroooo X2." : (h === "miroooo-x1-heads" ? "DuPont precision heads for Miroooo X1." : (h === "miroooo-x2" ? "Includes free luxury travel case, wall-mounted storage & 90-day battery life." : "Electric Toothbrush with 32,000 VPM acoustic motor & 60-day battery."))),
                    color: color,
                    quantity: qty,
                    unitPrice: item.unitPrice || (h === "miroooo-x1-heads" || h === "miroooo-x2-heads" ? 10 : 69),
                    comparePrice: item.comparePrice || (h === "miroooo-x1-heads" || h === "miroooo-x2-heads" ? 10 : 139),
                    image: item.image || (h === "miroooo-x2-heads" ? "/assets_ref/x2/heads/B1.webp" : (h === "miroooo-x1-heads" ? "/assets_ref/x/heads/B1.webp" : (h === "miroooo-x2" ? "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-checkout.webp" : "/assets_ref/x/gallery/Miroooo_x_Grey-2.webp"))),
                    url: item.url || `/products/${h}`
                  };
                }),
                promoCode: "AUTO",
                promoApplied: true
              };
            }

            // Legacy conversion
            if (parsed.productId && (parsed.quantity > 0 || (Array.isArray(parsed.colors) && parsed.colors.length > 0))) {
              const isX1Heads = parsed.productId === "miroooo-x1-heads" || parsed.productId === "miroooo-x-heads";
              const isX2Heads = parsed.productId === "miroooo-x2-heads";
              const isHeads = isX1Heads || isX2Heads;
              const isX2 = parsed.productId === "miroooo-x2";
              const handle = isX2Heads ? "miroooo-x2-heads" : (isX1Heads ? "miroooo-x1-heads" : (isX2 ? "miroooo-x2" : "miroooo-x"));
              const qty = Math.max(1, parseInt(parsed.quantity || "1", 10));
              const items = [];

              if (isHeads) {
                items.push({
                  id: `${handle}:Default`,
                  productHandle: handle,
                  productId: isX2Heads ? "1000000675616058" : "1000000675471182",
                  variantId: isX2Heads ? "1000020718937117" : "1000020710139724",
                  title: isX2Heads ? "Miroooo X2 Heads" : "Miroooo X1 Heads",
                  subtitle: isX2Heads ? "DuPont precision heads for Miroooo X2." : "DuPont precision heads for Miroooo X1.",
                  color: "Default",
                  quantity: qty,
                  unitPrice: 10,
                  comparePrice: 10,
                  image: isX2Heads ? "/assets_ref/x2/heads/B1.webp" : "/assets_ref/x/heads/B1.webp",
                  url: `/products/${handle}`
                });
              } else {
                let colors = Array.isArray(parsed.colors) && parsed.colors.length > 0 ? parsed.colors : (parsed.color ? [parsed.color] : ["Grey"]);
                while (colors.length < qty) {
                  colors.push(colors[0] || "Grey");
                }
                const colorCounts = {};
                colors.forEach(c => {
                  const norm = String(c || "Grey").trim();
                  colorCounts[norm] = (colorCounts[norm] || 0) + 1;
                });

                Object.keys(colorCounts).forEach(color => {
                  const cCount = colorCounts[color];
                  const normColor = color === "Pink" || color === "Silver" ? color : "Grey";
                  const vId = isX2
                    ? (normColor === "Pink" ? "1000020700182882" : (normColor === "Silver" ? "1000020700182884" : "1000020700182883"))
                    : (normColor === "Pink" ? "1000020700958562" : (normColor === "Silver" ? "1000020700958563" : "1000020700958564"));
                  const img = isX2
                    ? (normColor === "Pink" ? "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-checkout.webp" : (normColor === "Silver" ? "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-checkout.webp" : "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-checkout.webp"))
                    : (normColor === "Pink" ? "/assets_ref/x/gallery/Miroooo_x_Pink-1.webp" : (normColor === "Silver" ? "/assets_ref/x/gallery/Miroooo_x_Silver-1.webp" : "/assets_ref/x/gallery/Miroooo_x_Grey-2.webp"));

                  items.push({
                    id: `${handle}:${normColor}`,
                    productHandle: handle,
                    productId: isX2 ? "1000000675072187" : "1000000675113473",
                    variantId: vId,
                    title: isX2 ? "Miroooo X2" : "Miroooo X1",
                    subtitle: isX2 ? "Includes free luxury travel case, wall-mounted storage & 90-day battery life." : "Electric Toothbrush with 32,000 VPM acoustic motor & 60-day battery.",
                    color: normColor,
                    quantity: cCount,
                    unitPrice: 69,
                    comparePrice: 139,
                    image: img,
                    url: `/products/${handle}`
                  });
                });
              }

              return {
                version: 2,
                items: items,
                promoCode: "AUTO",
                promoApplied: true
              };
            }
          }
        }
      } catch (_) {}
      return { version: 2, items: [], promoCode: "AUTO", promoApplied: true };
    },

    saveCart(cart) {
      try {
        if (cart && Array.isArray(cart.items) && cart.items.length > 0) {
          const totalQty = cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
          const allColors = [];
          cart.items.forEach(i => {
            for (let q = 0; q < (i.quantity || 1); q++) allColors.push(i.color || "Grey");
          });
          const primaryItem = cart.items[0];

          const payload = {
            version: 2,
            items: cart.items,
            productId: primaryItem ? primaryItem.productHandle : "miroooo-x",
            quantity: totalQty,
            colors: allColors
          };

          localStorage.setItem("miroooo_cart", JSON.stringify(payload));
          localStorage.removeItem("miroooo_cart_empty");
        } else {
          localStorage.removeItem("miroooo_cart");
          localStorage.setItem("miroooo_cart_empty", "true");
        }
      } catch (_) {}
      this.updateHeaderBadges(cart);
      document.dispatchEvent(new CustomEvent("miroooo:cart-updated", { detail: cart }));
    },

    updateHeaderBadges(cartState) {
      const cart = cartState || this.getCart();
      const totalCount = (cart && Array.isArray(cart.items))
        ? cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0)
        : 0;

      document.querySelectorAll("cart-count, .cart-count, .site-actions__bag .count, .cart-drawer-button .count, .site-actions__bag > span, .header__buttons cart-count").forEach((el) => {
        el.textContent = String(totalCount);
        if (totalCount > 0) {
          el.removeAttribute("hidden");
          el.classList.remove("hidden");
          el.style.display = "grid";
          el.style.opacity = "1";
          el.style.visibility = "visible";
        } else {
          el.setAttribute("hidden", "true");
          el.classList.add("hidden");
          el.style.display = "none";
        }
      });
    },

    addItem(newItem) {
      const cart = this.getCart();
      const handle = newItem.productHandle || newItem.handle || "miroooo-x";
      const isX1Heads = handle === "miroooo-x1-heads" || handle === "miroooo-x-heads";
      const isX2Heads = handle === "miroooo-x2-heads";
      const isX2 = handle === "miroooo-x2";
      const isHeads = isX1Heads || isX2Heads;

      if (isHeads) {
        const pId = isX2Heads ? "1000000675616058" : "1000000675471182";
        const vId = newItem.variantId || (isX2Heads ? "1000020718937117" : "1000020710139724");
        const qtyToAdd = Math.max(1, parseInt(newItem.quantity || "1", 10));
        const existingIndex = cart.items.findIndex(i => i.productHandle === handle);

        if (existingIndex > -1) {
          cart.items[existingIndex].quantity = (cart.items[existingIndex].quantity || 0) + qtyToAdd;
        } else {
          cart.items.push({
            id: `${handle}:Default`,
            productHandle: handle,
            productId: pId,
            variantId: vId,
            title: newItem.title || (isX2Heads ? "Miroooo X2 Heads" : "Miroooo X1 Heads"),
            subtitle: newItem.subtitle || (isX2Heads ? "DuPont precision heads for Miroooo X2." : "DuPont precision heads for Miroooo X1."),
            color: "Default",
            quantity: qtyToAdd,
            unitPrice: 10,
            comparePrice: 10,
            image: newItem.image || (isX2Heads ? "/assets_ref/x2/heads/B1.webp" : "/assets_ref/x/heads/B1.webp"),
            url: newItem.url || `/products/${handle}`
          });
        }
      } else {
        const colorCounts = {};
        if (Array.isArray(newItem.choices) && newItem.choices.length > 0) {
          newItem.choices.forEach(c => {
            const norm = (c === "Pink" || c === "Silver") ? c : "Grey";
            colorCounts[norm] = (colorCounts[norm] || 0) + 1;
          });
        } else {
          const color = (newItem.color === "Pink" || newItem.color === "Silver") ? newItem.color : "Grey";
          const qty = Math.max(1, parseInt(newItem.quantity || "1", 10));
          colorCounts[color] = (colorCounts[color] || 0) + qty;
        }

        Object.keys(colorCounts).forEach(color => {
          const count = colorCounts[color];
          const vId = isX2
            ? (color === "Pink" ? "1000020700182882" : (color === "Silver" ? "1000020700182884" : "1000020700182883"))
            : (color === "Pink" ? "1000020700958562" : (color === "Silver" ? "1000020700958563" : "1000020700958564"));
          const img = isX2
            ? (color === "Pink" ? "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-checkout.webp" : (color === "Silver" ? "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-checkout.webp" : "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-checkout.webp"))
            : (color === "Pink" ? "/assets_ref/x/gallery/Miroooo_x_Pink-1.webp" : (color === "Silver" ? "/assets_ref/x/gallery/Miroooo_x_Silver-1.webp" : "/assets_ref/x/gallery/Miroooo_x_Grey-2.webp"));

          const existingIndex = cart.items.findIndex(i => i.productHandle === handle && i.color === color);
          if (existingIndex > -1) {
            cart.items[existingIndex].quantity = (cart.items[existingIndex].quantity || 0) + count;
          } else {
            cart.items.push({
              id: `${handle}:${color}`,
              productHandle: handle,
              productId: isX2 ? "1000000675072187" : "1000000675113473",
              variantId: vId,
              title: isX2 ? "Miroooo X2" : "Miroooo X1",
              subtitle: isX2 ? "Includes free luxury travel case, wall-mounted storage & 90-day battery life." : "Electric Toothbrush with 32,000 VPM acoustic motor & 60-day battery.",
              color: color,
              quantity: count,
              unitPrice: 69,
              comparePrice: 139,
              image: img,
              url: `/products/${handle}`
            });
          }
        });
      }

      window.dispatchEvent(new CustomEvent("miroooo:added-to-cart", { detail: newItem }));
      this.saveCart(cart);
      this.renderCartDrawer();
      this.openCart();
    },

    updateQuantity(itemId, quantity) {
      const cart = this.getCart();
      const index = cart.items.findIndex(i => i.id === itemId || i.productHandle === itemId);
      if (index > -1) {
        if (quantity <= 0) {
          cart.items.splice(index, 1);
        } else {
          cart.items[index].quantity = quantity;
        }
        this.saveCart(cart);
        this.renderCartDrawer();
      }
    },

    updateColorQuantity(color, quantity) {
      const cart = this.getCart();
      const norm = String(color || "Grey").trim().toLowerCase();
      const index = cart.items.findIndex(i => String(i.color || "").trim().toLowerCase() === norm);
      if (index > -1) {
        if (quantity <= 0) {
          cart.items.splice(index, 1);
        } else {
          cart.items[index].quantity = quantity;
        }
        this.saveCart(cart);
        this.renderCartDrawer();
      }
    },

    removeColor(color) {
      const cart = this.getCart();
      const norm = String(color || "Grey").trim().toLowerCase();
      cart.items = cart.items.filter(i => String(i.color || "").trim().toLowerCase() !== norm);
      this.saveCart(cart);
      this.renderCartDrawer();
    },

    removeItem(itemId) {
      const cart = this.getCart();
      cart.items = cart.items.filter(i => i.id !== itemId && i.productHandle !== itemId);
      this.saveCart(cart);
      this.renderCartDrawer();
    },

    clearCart() {
      try {
        localStorage.removeItem("miroooo_cart");
        localStorage.setItem("miroooo_cart_empty", "true");
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (_) {}
      this.updateHeaderBadges();
      this.renderCartDrawer();
    },

    ensureCartDrawer() {
      let drawer = document.getElementById("CartDrawer");
      if (!drawer) {
        drawer = document.createElement("div");
        drawer.id = "CartDrawer";
        drawer.className = "miroooo-cart-drawer";
        drawer.setAttribute("aria-hidden", "true");
        document.body.appendChild(drawer);
      }

      if (!drawer.querySelector(".miroooo-cart-panel")) {
        drawer.innerHTML = `
          <div class="miroooo-cart-backdrop" aria-label="Close cart overlay"></div>
          <aside class="miroooo-cart-panel" aria-label="Shopping cart" role="dialog" aria-modal="true">
            <div class="miroooo-cart-header">
              <div class="miroooo-cart-header-title-wrap">
                <p class="miroooo-cart-kicker">CART</p>
                <h2 class="miroooo-cart-title">Your Miroooo bag</h2>
              </div>
              <button type="button" class="miroooo-cart-close-btn" aria-label="Close cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="miroooo-cart-body" id="cart-drawer-body">
              <div class="miroooo-cart-items" id="cart-items-list"></div>
            </div>
            <div class="miroooo-cart-footer" id="cart-drawer-footer">
              <div class="miroooo-cart-discount-row" id="cart-discount-toggle">
                <div class="miroooo-discount-btn">
                  <span class="miroooo-discount-label">
                    Total discount
                    <svg class="miroooo-chevron-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                  <span class="miroooo-discount-amount" id="cart-discount-val">-${MirooooCurrency.format(0)}</span>
                </div>
                <div class="miroooo-discount-details" id="cart-discount-details">
                  <div class="miroooo-discount-detail-item" id="cart-bundle-discount-row">
                    <span>Bundle Special Offer</span>
                    <span id="cart-bundle-discount-val">-${MirooooCurrency.format(0)}</span>
                  </div>
                  <div class="miroooo-discount-detail-item" id="cart-bundle-promo-row" style="display: none;">
                    <span id="cart-bundle-promo-label">2-brush-bundle-special</span>
                    <span id="cart-bundle-promo-val">-${MirooooCurrency.format(0)}</span>
                  </div>
                  <div class="miroooo-discount-detail-item" id="cart-gift-discount-row">
                    <span>Unlocked Free Gifts</span>
                    <span id="cart-gift-discount-val">-${MirooooCurrency.format(0)}</span>
                  </div>
                </div>
              </div>
              <div class="cart-subtotal-section" style="display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid rgba(0, 0, 0, 0.08); margin-bottom: 16px;">
                <div>
                  <span class="cart-subtotal-label" style="font-size: 0.88rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #000000; display: block;">SUBTOTAL</span>
                  <span class="cart-subtotal-sub" style="font-size: 0.75rem; color: #666666; display: block; margin-top: 2px;">Includes all taxes.</span>
                </div>
                <div class="cart-subtotal-amount" id="cart-subtotal-val" style="font-size: 1.85rem; font-weight: 800; color: #000000; line-height: 1; letter-spacing: -0.02em;">${MirooooCurrency.format(0)}</div>
              </div>
              <div class="miroooo-checkout-btn-wrap">
                <a href="/cart" class="cart-checkout-cta-btn miroooo-checkout-btn" is="hover-button" style="text-decoration: none;" onclick="window.MirooooCart.closeCart()">
                  <span class="btn-fill" data-fill></span>
                  <span class="btn-text">
                    <span>Go to cart &rarr;</span>
                  </span>
                </a>
              </div>
            </div>
          </aside>
        `;

        drawer.querySelector(".miroooo-cart-backdrop")?.addEventListener("click", () => this.closeCart());
        drawer.querySelector(".miroooo-cart-close-btn")?.addEventListener("click", () => this.closeCart());

        const discountToggle = drawer.querySelector("#cart-discount-toggle");
        discountToggle?.addEventListener("click", () => {
          discountToggle.classList.toggle("is-open");
          const details = discountToggle.querySelector("#cart-discount-details");
          if (details) {
            const isOpen = discountToggle.classList.contains("is-open");
            details.style.display = isOpen ? "block" : "none";
          }
        });
      }
    },

    renderCartDrawer() {
      this.ensureCartDrawer();
      const itemsList = document.getElementById("cart-items-list");
      const footer = document.getElementById("cart-drawer-footer");

      if (!itemsList) return;

      const cart = this.getCart();
      const items = cart.items || [];

      if (items.length === 0) {
        if (footer) footer.style.display = "none";
        itemsList.innerHTML = `
          <div class="miroooo-cart-empty">
            <h3 class="miroooo-empty-title">Your shopping bag is empty.</h3>
            <a href="/shop" class="miroooo-empty-shop-btn" onclick="window.MirooooCart.closeCart()">Shop Miroooo</a>
          </div>
        `;
        return;
      }

      if (footer) footer.style.display = "flex";

      let x2Count = 0;
      let x1Count = 0;
      let x2HeadsCount = 0;
      let x1HeadsCount = 0;

      items.forEach(item => {
        const qty = item.quantity || 1;
        if (item.productHandle === "miroooo-x2") x2Count += qty;
        else if (item.productHandle === "miroooo-x") x1Count += qty;
        else if (item.productHandle === "miroooo-x2-heads") x2HeadsCount += qty;
        else if (item.productHandle === "miroooo-x1-heads") x1HeadsCount += qty;
      });

      // Calculate totals
      let x2BundlePromoDiscount = 0;
      let extraBrushHeadSets = 0;
      if (x2Count === 2) {
        x2BundlePromoDiscount = 10;
        extraBrushHeadSets = 1;
      } else if (x2Count >= 3) {
        x2BundlePromoDiscount = 30 + (x2Count - 3) * 10;
        extraBrushHeadSets = x2Count - 1;
      }

      let x1BundleDiscount = 0;
      if (x1Count === 2) x1BundleDiscount = 10;
      else if (x1Count >= 3) x1BundleDiscount = 30 + (x1Count - 3) * 10;

      const baseBrushCompareSavings = (x2Count + x1Count) * (139 - 69);
      const bundleSavings = baseBrushCompareSavings + x1BundleDiscount;
      const x2Net = (x2Count * 69) - x2BundlePromoDiscount;
      const x1Net = (x1Count * 69) - x1BundleDiscount;
      const headsNet = (x2HeadsCount * 10) + (x1HeadsCount * 10);
      const subtotal = Math.max(0, x2Net + x1Net + headsNet);

      let totalGiftValueNum = 0;
      if (extraBrushHeadSets > 0) totalGiftValueNum += extraBrushHeadSets * 10;
      if (x1Count >= 1) totalGiftValueNum += 36;

      const totalDiscountNum = bundleSavings + x2BundlePromoDiscount + totalGiftValueNum;

      // Render Line Items in Drawer List
      let itemsHtml = "";
      items.forEach(item => {
        const count = item.quantity || 1;
        const itemPrice = item.unitPrice * count;
        const itemCompare = item.comparePrice * count;
        const canonicalBase = (item.productHandle === "miroooo-x2" ? "Miroooo X2" : (item.productHandle === "miroooo-x2-heads" ? "Miroooo X2 Heads" : (item.productHandle === "miroooo-x1-heads" ? "Miroooo X1 Heads" : "Miroooo X1")));
        const isBrush = item.productHandle === "miroooo-x2" || item.productHandle === "miroooo-x";
        const displayTitle = isBrush
          ? (item.color ? `${canonicalBase} (${item.color})` : canonicalBase)
          : canonicalBase;

        itemsHtml += `
          <div class="miroooo-cart-item" data-id="${item.id}">
            <div class="miroooo-cart-item-thumb">
              <img src="${item.image}" alt="${displayTitle}" />
            </div>
            <div class="miroooo-cart-item-content">
              <div class="miroooo-cart-item-top">
                <div>
                  <h4 class="miroooo-cart-item-title">${displayTitle}</h4>
                  <p class="miroooo-cart-item-desc" style="font-size: 0.76rem; color: #555555; margin: 3px 0 0; line-height: 1.35;">${item.subtitle}</p>
                </div>
                <div class="miroooo-cart-item-pricing">
                  <span class="miroooo-cart-item-price">${MirooooCurrency.format(itemPrice)}</span>
                  ${itemCompare > itemPrice ? `<span class="miroooo-cart-item-compare">${MirooooCurrency.format(itemCompare)}</span>` : ''}
                </div>
              </div>
              <div class="miroooo-cart-item-bottom">
                <div class="miroooo-cart-stepper">
                  <button type="button" class="miroooo-stepper-btn" aria-label="Decrease quantity" onclick="window.MirooooCart.updateQuantity('${item.id}', ${count - 1})">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                  <span class="miroooo-stepper-val">${count}</span>
                  <button type="button" class="miroooo-stepper-btn" aria-label="Increase quantity" onclick="window.MirooooCart.updateQuantity('${item.id}', ${count + 1})">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>
                <button type="button" class="miroooo-cart-remove-btn" aria-label="Remove item" onclick="window.MirooooCart.removeItem('${item.id}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        `;
      });

      // Render Free Extra Brush Heads item in drawer for X2 Buy 2+
      if (extraBrushHeadSets > 0) {
        const sets = extraBrushHeadSets;
        const heads = sets * 2;
        const title = `Free Miroooo X2 Heads (${sets} ${sets > 1 ? "Sets" : "Set"})`;
        const subtitle = `${sets} complimentary ${sets > 1 ? "sets contain" : "set contains"} ${heads} DuPont precision heads for Miroooo X2.`;
        const compareVal = sets * 10;
        itemsHtml += `
          <div class="miroooo-cart-item">
            <div class="miroooo-cart-item-thumb">
              <img src="/assets_ref/x2/heads/B1.webp" alt="${title}" />
            </div>
            <div class="miroooo-cart-item-content">
              <div class="miroooo-cart-item-top">
                <div>
                  <h4 class="miroooo-cart-item-title">${title}</h4>
                  <p class="miroooo-cart-item-desc" style="font-size: 0.76rem; color: #555555; margin: 3px 0 0; line-height: 1.35;">${subtitle}</p>
                </div>
                <div class="miroooo-cart-item-pricing">
                  <span class="miroooo-cart-item-price" style="color: #22c55e; font-weight: 700;">Free</span>
                  <span class="miroooo-cart-item-compare">${MirooooCurrency.format(compareVal)}</span>
                </div>
              </div>
              <div class="miroooo-cart-item-bottom">
                <span style="font-size: 0.72rem; font-weight: 700; color: #22c55e; letter-spacing: 0.05em;">UNLOCKED FREE GIFT</span>
              </div>
            </div>
          </div>
        `;
      }

      itemsList.innerHTML = itemsHtml;

      // Update Summary Values
      const discountToggle = document.getElementById("cart-discount-toggle");
      if (discountToggle) {
        discountToggle.style.display = totalDiscountNum > 0 ? "block" : "none";
      }

      const subtotalValEl = document.getElementById("cart-subtotal-val");
      const discountValEl = document.getElementById("cart-discount-val");
      const bundleDiscountValEl = document.getElementById("cart-bundle-discount-val");
      const giftDiscountValEl = document.getElementById("cart-gift-discount-val");

      const bundleDiscountRow = document.getElementById("cart-bundle-discount-row");
      const bundlePromoRow = document.getElementById("cart-bundle-promo-row");
      const bundlePromoLabelEl = document.getElementById("cart-bundle-promo-label");
      const bundlePromoValEl = document.getElementById("cart-bundle-promo-val");

      if (bundleDiscountRow) {
        bundleDiscountRow.style.display = bundleSavings > 0 ? "flex" : "none";
      }

      if (x2BundlePromoDiscount > 0) {
        if (bundlePromoRow) {
          bundlePromoRow.style.display = "flex";
          if (bundlePromoLabelEl) bundlePromoLabelEl.textContent = (x2Count === 2 ? "2-brush-bundle-special" : "3-brush-bundle-offer");
          if (bundlePromoValEl) bundlePromoValEl.textContent = `-${MirooooCurrency.format(x2BundlePromoDiscount)}`;
        }
      } else {
        if (bundlePromoRow) bundlePromoRow.style.display = "none";
      }

      if (subtotalValEl) subtotalValEl.textContent = MirooooCurrency.format(subtotal);
      if (discountValEl) discountValEl.textContent = `-${MirooooCurrency.format(totalDiscountNum)}`;
      if (bundleDiscountValEl) bundleDiscountValEl.textContent = `-${MirooooCurrency.format(bundleSavings)}`;
      if (giftDiscountValEl) giftDiscountValEl.textContent = `-${MirooooCurrency.format(totalGiftValueNum)}`;
    },

    startTimer() {
      if (this.timerInterval) return;
      const updateTimerDisplay = () => {
        const mins = Math.floor(this.timerSeconds / 60);
        const secs = this.timerSeconds % 60;
        const formatted = `${String(mins).padStart(2, "0")}m : ${String(secs).padStart(2, "0")}s`;
        const timerEl = document.getElementById("cart-countdown-timer");
        if (timerEl) timerEl.textContent = formatted;

        if (this.timerSeconds <= 0) {
          this.timerSeconds = 585;
        } else {
          this.timerSeconds -= 1;
        }
      };

      updateTimerDisplay();
      this.timerInterval = setInterval(updateTimerDisplay, 1000);
    },

    openCart() {
      this.ensureCartDrawer();
      this.renderCartDrawer();
      const drawer = document.getElementById("CartDrawer");
      if (drawer) {
        drawer.classList.add("is-open", "active");
        drawer.setAttribute("aria-hidden", "false");
        drawer.removeAttribute("hidden");
        document.body.classList.add("overflow-hidden", "cart-drawer-open");
      }
      this.startTimer();
    },

    closeCart() {
      const drawer = document.getElementById("CartDrawer");
      if (drawer) {
        drawer.classList.remove("is-open", "active");
        drawer.setAttribute("aria-hidden", "true");
        drawer.removeAttribute("open");
        const inner = drawer.querySelector(".drawer__inner");
        if (inner) inner.style.transform = "translateX(100%)";
        const overlay = drawer.querySelector("overlay-element");
        if (overlay) {
          overlay.classList.add("invisible", "opacity-0", "pointer-events-none");
          overlay.classList.remove("visible", "opacity-100", "pointer-events-auto");
        }
        document.body.classList.remove("overflow-hidden", "cart-drawer-open");
      }
    },

    async checkout() {
      const cart = this.getCart();
      const items = cart.items || [];
      if (items.length === 0) return;

      const checkoutBtn = document.getElementById("cart-drawer-checkout-btn");
      const btnText = document.getElementById("cart-checkout-btn-text");
      if (checkoutBtn) {
        checkoutBtn.disabled = true;
        if (btnText) btnText.textContent = "Securing checkout...";
      }

      try {
        const checkoutUrl = await createXpageCheckoutSession(cart);
        window.location.assign(checkoutUrl);
      } catch (err) {
        console.error("Checkout redirection failed:", err);
        if (typeof window.resetButtonLoadingStates === "function") {
          window.resetButtonLoadingStates();
        }
        window.alert(err.message || "Checkout is unavailable. Please try again.");
      }
    }
  };

  window.MirooooCart = MirooooCart;

  function updateDeliveryDates() {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const options = { weekday: "long", month: "long", day: "numeric" };
    const formattedDate = deliveryDate.toLocaleDateString("en-US", options);
    document.querySelectorAll(".miroooo-dynamic-date").forEach((el) => {
      el.textContent = formattedDate;
    });
  }

  // Animated Lottie Icons Initializer (Moving Truck & Animated Cart)
  function initMirooooLottieIcons() {
    const truckEls = document.querySelectorAll("[data-lottie-truck], .miroooo-lottie-truck");
    const cartEls = document.querySelectorAll("[data-lottie-cart], .miroooo-lottie-cart");

    if (truckEls.length === 0 && cartEls.length === 0) return;

    function renderLotties() {
      if (typeof window.lottie === "undefined") return;

      truckEls.forEach((el) => {
        if (el.dataset.lottieLoaded === "true") return;
        el.dataset.lottieLoaded = "true";
        el.innerHTML = "";
        try {
          window.lottie.loadAnimation({
            container: el,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "/assets/lottie-truck.json"
          });
        } catch (err) {
          console.warn("Lottie truck animation load error:", err);
        }
      });

      cartEls.forEach((el) => {
        if (el.dataset.lottieLoaded === "true") return;
        el.dataset.lottieLoaded = "true";
        el.innerHTML = "";
        try {
          window.lottie.loadAnimation({
            container: el,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "/assets/lottie-cart.json"
          });
        } catch (err) {
          console.warn("Lottie cart animation load error:", err);
        }
      });
    }

    if (typeof window.lottie !== "undefined") {
      renderLotties();
    } else {
      let script = document.querySelector('script[src*="lottie.min.js"]');
      if (!script) {
        script = document.createElement("script");
        script.src = "/assets/lottie.min.js";
        script.async = true;
        script.onload = renderLotties;
        document.head.appendChild(script);
      } else {
        script.addEventListener("load", renderLotties);
      }
    }
  }

  window.initMirooooLottieIcons = initMirooooLottieIcons;

  // Initialize cart state, header badges, dynamic delivery date, and lottie animations
  const initCartOnPage = () => {
    MirooooCart.updateHeaderBadges();
    MirooooCart.ensureCartDrawer();
    updateDeliveryDates();
    initMirooooLottieIcons();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCartOnPage);
  } else {
    initCartOnPage();
  }

  // Global Button Click Loader Reset Helper
  function resetButtonLoadingStates(root) {
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll(".miroooo-button-click-loader, .buudy-button-click-loader").forEach((loader) => {
      loader.remove();
    });
    scope.querySelectorAll("button[disabled], input[type='submit'][disabled], a.is-loading, button.is-loading, .is-loading").forEach((btn) => {
      if (btn.dataset.permanentlyDisabled !== "true" && !btn.hasAttribute("data-static-disabled")) {
        btn.disabled = false;
      }
      btn.classList.remove("is-loading");
      btn.removeAttribute("aria-busy");
    });
    const drawerCheckoutText = document.getElementById("cart-checkout-btn-text");
    if (drawerCheckoutText) {
      drawerCheckoutText.textContent = "Go to cart \u2192";
    }
  }

  window.resetButtonLoadingStates = resetButtonLoadingStates;
  MirooooCart.resetLoaders = resetButtonLoadingStates;

  window.addEventListener("pageshow", () => {
    MirooooCart.updateHeaderBadges();
    resetButtonLoadingStates();
  });

  window.addEventListener("popstate", () => {
    resetButtonLoadingStates();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      resetButtonLoadingStates();
    }
  });

  window.addEventListener("storage", (e) => {
    if (e.key === "miroooo_cart" || e.key === "miroooo_cart_empty" || e.key === "miroooo_cart_v1") {
      MirooooCart.updateHeaderBadges();
      const drawer = document.getElementById("CartDrawer");
      if (drawer && (drawer.classList.contains("is-open") || drawer.getAttribute("aria-hidden") === "false")) {
        MirooooCart.renderCartDrawer();
      }
    }
  });

  // Intercept cart open clicks ONLY on header cart icon / drawer triggers
  document.addEventListener("click", (e) => {
    const headerCartTrigger = e.target.closest(
      '.site-header a[href="/cart"], .site-header .cart-drawer-button, .site-header .site-actions__bag, .header__icons a[href="/cart"], .header__icons .cart-drawer-button, [data-drawer-trigger], .header-cart-icon'
    );
    if (headerCartTrigger && !headerCartTrigger.closest("#CartDrawer") && !headerCartTrigger.closest("#hero-cta") && !headerCartTrigger.closest("#sticky-bar-cta-btn")) {
      if (document.body.dataset.page === "cart") return;
      e.preventDefault();
      MirooooCart.openCart();
    }
  });

  // Global Button Click Loader (Strictly Scoped to Filled CTA Buttons ONLY)
  document.addEventListener("click", (e) => {
    // 1. STRICT EXCLUSIONS: Ignore accordions, FAQ questions/toggles, header navigation, mobile drawers, footers, swatches, steppers, remove buttons, review controls, modals, and plaintext cards
    if (e.target.closest(
      ".faq-card__button, .faq-card, [data-faq-card], .faq-accordion, .faq-item, .faq-question, " +
      ".accordion-summary, summary, [is='accordion-details'], .details__summary, .product__accordion, " +
      ".accordion__toggle, .accordion__title, .accordion-item, .accordion-header, [aria-controls^='faq'], [id^='faq-trigger'], " +
      ".site-header, .menu-drawer, #MenuDrawer, .drawer__menu, nav, .site-nav, .header__menu, .header__dropdown, [data-dropdown], .header__dropdown-toggle, .nav-toggle, .menu-drawer-button, .header-cart-icon, .cart-drawer-button, .site-actions__bag, .header__menu-item, .drawer__menu-item, .menu__item, .account-link, " +
      ".site-footer, .service-strip, .contact-service-card, .guide-card, .policy-card, " +
      ".color-swatch-btn, .standalone-swatch-btn, .brush-color-swatches, .brush-selection-row, .tier-addon-checkbox-wrap, .bundle-tier-card, .tier-header-btn, .tier-gift-strip, .swatch, .swatch-btn, .color-swatch, .variant-picker__option, .quiz-option, .quiz-reset-btn, [data-option-id], " +
      ".miroooo-stepper-btn, .cart-stepper-btn, .miroooo-cart-remove-btn, .cart-remove-button, .drawer__close, .miroooo-cart-close-btn, .mobile-panel__close, .flickity-button, .flickity-prev-next-button, .flickity-page-dots, .quick-view__button, .miroooo-gallery__thumb, .miroooo-gallery__nav-arrow, " +
      ".miroooo-helpful-btn, .miroooo-lightbox-helpful-btn, .miroooo-read-more-btn, .miroooo-star-btn, .miroooo-star-trigger, .miroooo-sort-trigger, .miroooo-dropdown-trigger, .miroooo-dropdown-item, .miroooo-filter-pill, .miroooo-breakdown-row, .miroooo-lightbox-close, .miroooo-write-close, .miroooo-lightbox-close-btn, .miroooo-write-close-btn, .miroooo-form-cancel, .miroooo-success-close, .miroooo-empty-reset-btn, #miroooo-clear-all-link, " +
      ".gift-msg-toggle, #gift-msg-toggle-btn, .gift-msg-save-btn, #gift-msg-save-btn, .cart-discount-toggle, #discount-toggle-btn, .cart-promo-remove-btn, #remove-promo-btn, #cart-more-discount-link, .cart-promo-apply-btn, .cart-promo-pill-remove, #quiz-retake-btn, dialog, .modal-close, " +
      ".button--outline, .btn--outline, .coach-button--quiet, .coach-button--secondary, .text-button, .gb-text-link, .contact-social-link, .about-contact-pill"
    )) {
      return;
    }

    // 2. TARGET ONLY FILLED ACTION CTA BUTTONS
    const ctaSelector = [
      // Home page CTAs
      "a.gb-button",
      ".gb-button",
      ".gb-button--light",
      ".gb-button--dark",
      ".gb-button--primary",
      ".btn-hero-primary",
      ".hero__button",

      // Product page Add to Cart buttons & Sticky Add to Cart buttons
      ".product-form__submit",
      "#hero-cta",
      ".hero-cta",
      "#sticky-bar-cta-btn",
      ".miroooo-sticky-btn",
      ".sticky-add-to-cart__button",
      ".proxy-bundle-btn",
      "button[data-action='add-to-cart']",
      "button#AddToCart",
      ".smile-coach-btn",

      // About Us page primary buttons
      ".about-hero__cta",
      ".about-btn-action",
      ".about-page-wrapper .button--primary",
      "body[data-page='about'] .button--primary",
      "body[data-page='about-us'] .button--primary",

      // Contact Us page Send button
      "button[type='submit']",
      ".contact-form__submit",
      ".contact-submit-btn",
      "#contact-submit-btn",
      ".contact-form-submit",
      "form.contact-form button[type='submit']",
      "form#contact-form button[type='submit']",
      "form#contact-form-element button[type='submit']",

      // Cart Drawer & Cart Page Checkout buttons
      ".cart-checkout-cta-btn",
      "#main-checkout-btn",
      "#sticky-checkout-btn",
      ".miroooo-checkout-btn",
      ".cart-drawer-checkout-btn",

      // Dental Quiz Next/CTA buttons
      ".quiz-btn-next",
      "#quiz-next-btn",
      "[data-quiz-next]",
      "#quiz-primary-cta",
      "#quiz-bottom-cta",
      "[data-quiz-cta]",
      ".quiz-actions .button--primary",
      ".results-cta-btn-primary",

      // Smile Coach action buttons
      ".coach-start-btn",
      ".coach-action-btn",
      ".coach-button--primary",
      "#onboarding-next",
      "#onboarding-finish",
      "[data-start-session]"
    ].join(", ");

    const btn = e.target.closest(ctaSelector);
    if (!btn || btn.disabled || btn.hasAttribute("disabled")) return;

    // Reject outline, secondary, quiet, or toggle elements
    if (
      btn.classList.contains("button--outline") ||
      btn.classList.contains("btn--outline") ||
      btn.classList.contains("button--secondary") ||
      btn.classList.contains("coach-button--quiet") ||
      btn.classList.contains("coach-button--secondary") ||
      btn.classList.contains("contact-faq-link") ||
      btn.classList.contains("faq-card__button") ||
      btn.hasAttribute("aria-expanded")
    ) {
      return;
    }

    // Detect background brightness to choose white vs black dots
    const compStyle = window.getComputedStyle(btn);
    const bg = compStyle.backgroundColor;
    let isLightBg = false;

    if (bg && bg.startsWith("rgb")) {
      const rgb = bg.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        if (brightness > 160) {
          isLightBg = true;
        }
      }
    }
    if (
      btn.classList.contains("cart-checkout-cta-btn") ||
      btn.classList.contains("btn--white") ||
      btn.classList.contains("gb-button--light") ||
      btn.id === "main-checkout-btn" ||
      btn.id === "sticky-checkout-btn"
    ) {
      isLightBg = true;
    }

    // Ensure relative positioning
    if (compStyle.position === "static") {
      btn.style.position = "relative";
    }

    let loader = btn.querySelector(".miroooo-button-click-loader");
    if (!loader) {
      loader = document.createElement("span");
      loader.setAttribute("aria-hidden", "true");
      loader.className = `miroooo-button-click-loader buudy-button-click-loader ${isLightBg ? "miroooo-button-click-loader--dark-dots" : "miroooo-button-click-loader--light-dots"}`;
      loader.innerHTML = `
        <span class="miroooo-button-click-loader-dots buudy-button-click-loader-dots">
          <span></span><span></span><span></span><span></span><span></span>
        </span>
      `;
      btn.appendChild(loader);
    } else {
      loader.className = `miroooo-button-click-loader buudy-button-click-loader ${isLightBg ? "miroooo-button-click-loader--dark-dots" : "miroooo-button-click-loader--light-dots"}`;
      loader.style.display = "flex";
    }

    // Auto-remove after 900ms to guarantee button returns to normal state
    if (btn._loaderTimer) clearTimeout(btn._loaderTimer);
    btn._loaderTimer = setTimeout(() => {
      if (loader && loader.parentNode) {
        loader.remove();
      }
      btn._loaderTimer = null;
    }, 900);
  });

  // Quiz CTA ("Claim My Personalised Match") & Dynamic Attribution Preservation Interceptor
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!target) return;

    const btn = target.closest("a, button, [role='button']");
    if (!btn) return;

    const btnText = (btn.textContent || "").trim();
    const isQuizMatchCta =
      /claim\s+my\s+personalised\s+match/i.test(btnText) ||
      /claim\s+my\s+match/i.test(btnText) ||
      btn.hasAttribute("data-quiz-cta") ||
      btn.classList.contains("quiz-cta") ||
      btn.getAttribute("data-action") === "claim-match";

    const isProductOrCheckoutLink =
      btn.tagName === "A" &&
      (btn.hasAttribute("data-product-link") ||
        isQuizMatchCta ||
        /^\/products\//.test(btn.getAttribute("href") || "") ||
        /^\/cart/.test(btn.getAttribute("href") || "") ||
        /checkouts/.test(btn.getAttribute("href") || ""));

    if (isQuizMatchCta || isProductOrCheckoutLink) {
      const attr = readCapturedAttribution();
      if (Object.keys(attr).length && btn.tagName === "A" && btn.href) {
        try {
          const dest = new URL(btn.href, window.location.origin);
          const allowed = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "msclkid", "gclid", "fbclid", "source"];
          allowed.forEach((key) => {
            if (attr[key] && !dest.searchParams.has(key)) {
              dest.searchParams.set(key, String(attr[key]));
            }
          });
          btn.href = dest.toString();
        } catch (_) {}
      }

      if (isQuizMatchCta && window.__mirooooMicrosoftAds?.trackCheckout) {
        try {
          window.__mirooooMicrosoftAds.trackCheckout({
            content_type: "product",
            content_name: "Quiz Personalised Match",
            currency: "USD"
          });
        } catch (_) {}
      }
    }
  }, true);

  // Universal Shipping Info Tooltip Interactivity (? icon)
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".shipping-info-btn");
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      const wrapper = btn.closest(".shipping-info-wrapper");
      const tooltip = wrapper ? wrapper.querySelector(".shipping-info-tooltip") : null;
      if (tooltip) {
        const isOpen = tooltip.classList.contains("is-active") || tooltip.style.display === "block";
        document.querySelectorAll(".shipping-info-tooltip").forEach(function (t) {
          t.classList.remove("is-active");
          t.style.display = "none";
        });
        document.querySelectorAll(".shipping-info-btn").forEach(function (b) {
          b.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          tooltip.classList.add("is-active");
          tooltip.style.display = "block";
          btn.setAttribute("aria-expanded", "true");
        }
      }
      return;
    }

    const closeBtn = e.target.closest(".shipping-info-close");
    if (closeBtn) {
      e.preventDefault();
      e.stopPropagation();
      const tooltip = closeBtn.closest(".shipping-info-tooltip");
      if (tooltip) {
        tooltip.classList.remove("is-active");
        tooltip.style.display = "none";
        const wrapper = tooltip.closest(".shipping-info-wrapper");
        const trigger = wrapper ? wrapper.querySelector(".shipping-info-btn") : null;
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      }
      return;
    }

    if (e.target.closest(".shipping-info-tooltip")) {
      return;
    }

    document.querySelectorAll(".shipping-info-tooltip").forEach(function (t) {
      t.classList.remove("is-active");
      t.style.display = "none";
    });
    document.querySelectorAll(".shipping-info-btn").forEach(function (b) {
      b.setAttribute("aria-expanded", "false");
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      MirooooCart.closeCart();
      document.querySelectorAll(".shipping-info-tooltip").forEach(function (t) {
        t.classList.remove("is-active");
        t.style.display = "none";
      });
      document.querySelectorAll(".shipping-info-btn").forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
      });
    }
  });
})();
