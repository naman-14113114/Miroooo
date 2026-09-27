(function () {
  "use strict";

  document.documentElement.lang = "en-GB";

  const main = document.getElementById("MainContent");
  if (main && !document.querySelector(".miroooo-skip")) {
    const skip = document.createElement("a");
    skip.className = "miroooo-skip";
    skip.href = "#MainContent";
    skip.textContent = "Skip to product details";
    document.body.prepend(skip);
  }

  // Synchronize Navigation links and duplicate text for roll-up animation
  const desktopLinks = document.querySelectorAll(".header__menu > ul > li > a, .site-nav > ul > li > a");
  desktopLinks.forEach((link) => {
    const text = link.getAttribute("data-nav-label") || link.querySelector(".btn-text:not(.btn-duplicate)")?.textContent?.trim() || link.textContent?.trim();
    if (!text) return;
    
    // Ensure both default text and duplicate pill span exist
    let defaultSpan = link.querySelector(".btn-text:not(.btn-duplicate)");
    let duplicateSpan = link.querySelector(".btn-duplicate");
    
    if (!defaultSpan) {
      defaultSpan = document.createElement("span");
      defaultSpan.className = "btn-text";
      defaultSpan.setAttribute("data-text", text);
      defaultSpan.textContent = text;
      link.prepend(defaultSpan);
    } else {
      defaultSpan.dataset.text = text;
      defaultSpan.textContent = text;
    }
    
    if (!duplicateSpan) {
      duplicateSpan = document.createElement("span");
      duplicateSpan.className = "btn-text btn-duplicate";
      link.append(duplicateSpan);
    }
    duplicateSpan.textContent = text;
  });

  // Header Dropdown Toggle Logic for Product Shell
  const initShellDropdowns = () => {
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
  };
  initShellDropdowns();

  // Authentic GoBrush Magnet Spring Hover Physics
  const initMagnetEffect = () => {
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMagnetEffect);
  } else {
    initMagnetEffect();
  }

  // Mobile Menu Drawer Handler & Close Logic
  const closeMenuDrawer = () => {
    const drawer = document.getElementById("MenuDrawer");
    if (!drawer) return;
    if (typeof drawer.hide === "function") {
      try {
        drawer.hide();
      } catch (_) {
        drawer.removeAttribute("open");
        drawer.removeAttribute("active");
        drawer.hidden = true;
      }
    } else {
      drawer.removeAttribute("open");
      drawer.removeAttribute("active");
      drawer.hidden = true;
    }
    document.querySelectorAll('[aria-controls="MenuDrawer"]').forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
    });
  };
  document.addEventListener("click", (event) => {
    const menuCloseBtn = event.target.closest?.("#MenuDrawer .drawer__close, #MenuDrawer [aria-label='Close'], #MenuDrawer .button--close");
    if (menuCloseBtn) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      closeMenuDrawer();
      return;
    }

    const drawer = document.getElementById("MenuDrawer");
    if (drawer && (drawer.hasAttribute("open") || drawer.hasAttribute("active") || !drawer.hidden)) {
      const isInsideInner = event.target.closest?.("#MenuDrawer .drawer__inner");
      const isMenuToggle = event.target.closest?.('.menu-drawer-button, [aria-controls="MenuDrawer"]');
      if (!isInsideInner && !isMenuToggle && event.target.closest?.("#MenuDrawer")) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        closeMenuDrawer();
      }
    }
  }, true);

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (/collections\/frontpage|blogs\/news|pages\/onze-verantwoordelijkheid/.test(href)) link.href = "/shop";
    if (/pages\/(contact|contact-us|klantenservice)|^\/contact(-us)?$/.test(href)) link.href = "/pages/contact-us";
    if (/pages\/(over-ons|about|about-us)|^\/about(-us)?$/.test(href)) link.href = "/pages/about-us";
    if (/pages\/(faq|faqs)|^\/faqs?$/.test(href)) link.href = "/pages/faqs";
    if (/pages\/(privacybeleid|privacy-policy|privacy)|^\/(privacy|privacy-policy)$/.test(href)) link.href = "/policies/privacy-policy";
    if (/pages\/(return-policy|returns)|^\/(return-policy|returns)$/.test(href)) link.href = "/policies/return-policy";
    if (/pages\/(refund-policy)|^\/refund-policy$/.test(href)) link.href = "/policies/refund-policy";
    if (/pages\/(shipping-policy)|^\/shipping-policy$/.test(href)) link.href = "/policies/shipping-policy";
    if (/pages\/(cookies-policy)|^\/cookies-policy$/.test(href)) link.href = "/policies/cookies-policy";
    if (/pages\/(retouren-garantie|delivery-returns)|^\/delivery-returns$/.test(href)) link.href = "/policies/delivery-returns";
    if (/pages\/(warranty|garantie)|^\/warranty$/.test(href)) link.href = "/policies/warranty";
    if (/pages\/(reviews|terms|terms-of-service)|^\/(terms|terms-of-service)$/.test(href)) link.href = "/policies/terms-of-service";
    if (/pages\/(dentalcare-quiz|quiz)|^\/(dentalcare-quiz|quiz)$/.test(href)) link.href = "/pages/dentalcare-quiz";
    if (/pages\/(smile-coach)|^\/smile-coach$/.test(href)) link.href = "/pages/smile-coach";
    if (/pages\/(order-tracking|tracking)|^\/order-tracking$/.test(href)) link.href = "/pages/order-tracking";
  });

  const allowedAttribution = ["msclkid", "gclid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "source"];
  const query = new URLSearchParams(location.search);
  let storedAttribution = {};
  try {
    const fromSession = JSON.parse(sessionStorage.getItem("miroooo_attribution") || "{}");
    const fromLocal = JSON.parse(localStorage.getItem("miroooo_attribution") || "{}");
    storedAttribution = Object.assign({}, fromLocal, fromSession);
  } catch (_) {}

  const capturedShellAttr = {};
  allowedAttribution.forEach((key) => {
    const value = query.get(key);
    if (value) capturedShellAttr[key] = value;
  });
  const shellAttribution = Object.assign({}, storedAttribution, capturedShellAttr);

  if (Object.keys(shellAttribution).length) {
    try {
      sessionStorage.setItem("miroooo_attribution", JSON.stringify(shellAttribution));
    } catch (_) {}
    try {
      localStorage.setItem("miroooo_attribution", JSON.stringify(shellAttribution));
    } catch (_) {}
  }

  document.querySelectorAll('a[href*="/checkouts"], a[href*="cart"], a[data-product-link], a[data-quiz-cta], a.quiz-cta').forEach((link) => {
    try {
      const target = new URL(link.href, window.location.origin);
      allowedAttribution.forEach((key) => {
        const value = shellAttribution[key];
        if (value && !target.searchParams.has(key)) target.searchParams.set(key, value);
      });
      link.href = target.toString();
    } catch (_) {}
  });

  const closeCartDrawer = () => {
    if (window.MirooooCart?.closeCart) {
      window.MirooooCart.closeCart();
    }
    const drawer = document.getElementById("CartDrawer");
    if (!drawer) return;
    drawer.removeAttribute("open");
    drawer.classList.remove("active", "pointer-events-auto", "is-open");
    drawer.classList.add("pointer-events-none");
    drawer.setAttribute("aria-hidden", "true");
    const inner = drawer.querySelector(".drawer__inner");
    if (inner) inner.style.transform = "translateX(100%)";
    const overlay = drawer.querySelector("overlay-element");
    if (overlay) {
      overlay.classList.add("invisible", "opacity-0", "pointer-events-none");
      overlay.classList.remove("visible", "opacity-100", "pointer-events-auto");
    }
    document.body.classList.remove("overflow-hidden", "cart-drawer-open");
  };

  document.addEventListener("click", (event) => {
    const closeControl = event.target.closest?.("#CartDrawer .drawer__close, #CartDrawer overlay-element, #CartDrawer .miroooo-cart-close-btn, #CartDrawer .miroooo-cart-backdrop");
    if (!closeControl) return;
    event.preventDefault();
    setTimeout(closeCartDrawer, 0);
  }, true);
  document.querySelectorAll("#CartDrawer .drawer__close, #CartDrawer overlay-element, #CartDrawer .miroooo-cart-close-btn, #CartDrawer .miroooo-cart-backdrop").forEach((control) => {
    control.addEventListener("click", () => {
      setTimeout(closeCartDrawer, 0);
    }, true);
  });

  // =========================================================
  // MIROOOO LUXURY 1:1 PRODUCT GALLERY LIGHTBOX MODAL
  // =========================================================
  function initProductGalleryLightbox() {
    const modal = document.getElementById("MirooooGalleryLightbox");
    if (!modal) return;

    const mediaBox = document.getElementById("MirooooGalleryLightboxMediaBox");
    const closeBtn = document.getElementById("MirooooGalleryLightboxClose");
    const prevBtn = document.getElementById("MirooooGalleryLightboxPrev");
    const nextBtn = document.getElementById("MirooooGalleryLightboxNext");
    const currentCountEl = document.getElementById("MirooooGalleryLightboxCurrent");
    const totalCountEl = document.getElementById("MirooooGalleryLightboxTotal");
    const backdrop = modal.querySelector(".miroooo-gallery-lightbox__backdrop");

    let currentIndex = 0;
    let isOpen = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let previousActiveElement = null;
    let previousBodyOverflow = "";

    function getGalleryMediaItems() {
      const items = [];
      const mediaNodes = document.querySelectorAll("#MirooooGallerySlides .miroooo-gallery__slide, .product__media-list .product__media");
      mediaNodes.forEach((node) => {
        if (node.style.display === "none" || node.classList.contains("hidden")) return;
        const video = node.querySelector("video");
        if (video || node.dataset.mediaType === "video" || node.classList.contains("product__media--video")) {
          const src = video ? (video.getAttribute("src") || video.currentSrc || video.src) : "";
          items.push({
            type: "video",
            src: src,
            alt: "Miroooo Product Video"
          });
        } else {
          const img = node.querySelector("img");
          if (img) {
            const src = img.getAttribute("src") || img.currentSrc || img.src;
            const alt = img.getAttribute("alt") || "Miroooo Product View";
            items.push({
              type: "image",
              src: src,
              alt: alt
            });
          }
        }
      });
      return items;
    }

    function preloadNextMedia(index, items) {
      if (!items || !items.length) return;
      const nextIdx = (index + 1) % items.length;
      const nextItem = items[nextIdx];
      if (!nextItem) return;
      if (nextItem.type === "video") {
        const v = document.createElement("video");
        v.preload = "metadata";
        v.src = nextItem.src;
        v.load();
      } else {
        const im = new Image();
        im.decoding = "async";
        im.src = nextItem.src;
      }
    }

    function renderMedia(index) {
      const items = getGalleryMediaItems();
      if (!items.length) return;

      if (index < 0) index = items.length - 1;
      if (index >= items.length) index = 0;
      currentIndex = index;

      if (currentCountEl) currentCountEl.textContent = String(currentIndex + 1);
      if (totalCountEl) totalCountEl.textContent = String(items.length);
      if (!mediaBox) return;

      const item = items[currentIndex];
      if (!item) return;

      // Clean up existing video if any
      const existingVideo = mediaBox.querySelector("video");
      if (existingVideo) {
        existingVideo.pause();
        existingVideo.removeAttribute("src");
        existingVideo.load();
      }
      mediaBox.innerHTML = "";

      if (item.type === "video") {
        const videoEl = document.createElement("video");
        videoEl.className = "miroooo-gallery-lightbox__video";
        videoEl.src = item.src;
        videoEl.autoplay = true;
        videoEl.loop = true;
        videoEl.muted = true;
        videoEl.playsInline = true;
        videoEl.setAttribute("playsinline", "");
        videoEl.setAttribute("autoplay", "");
        videoEl.setAttribute("loop", "");
        videoEl.setAttribute("muted", "");
        videoEl.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");
        videoEl.setAttribute("disablepictureinpicture", "");
        mediaBox.appendChild(videoEl);
        videoEl.play().catch(() => {});
      } else {
        const imgEl = document.createElement("img");
        imgEl.className = "miroooo-gallery-lightbox__img";
        imgEl.src = item.src;
        imgEl.alt = item.alt || "Expanded Product View";
        imgEl.decoding = "async";
        imgEl.loading = "eager";
        mediaBox.appendChild(imgEl);
      }

      preloadNextMedia(currentIndex, items);
    }

    function openLightbox(index) {
      previousActiveElement = document.activeElement;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
      isOpen = true;

      renderMedia(typeof index === "number" ? index : 0);

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");

      closeBtn?.focus();
    }

    function closeLightbox() {
      if (!isOpen && !modal.classList.contains("is-open")) return;
      isOpen = false;

      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");

      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");

      if (mediaBox) {
        const vid = mediaBox.querySelector("video");
        if (vid) {
          vid.pause();
          vid.removeAttribute("src");
          vid.load();
        }
        mediaBox.innerHTML = "";
      }

      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        try {
          previousActiveElement.focus();
        } catch (err) {}
      }
    }

    function goNext() {
      const items = getGalleryMediaItems();
      if (!items.length) return;
      renderMedia((currentIndex + 1) % items.length);
    }

    function goPrev() {
      const items = getGalleryMediaItems();
      if (!items.length) return;
      renderMedia((currentIndex - 1 + items.length) % items.length);
    }

    // Button controls
    closeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeLightbox();
    });

    prevBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      goPrev();
    });

    nextBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      goNext();
    });

    backdrop?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeLightbox();
    });

    modal.addEventListener("click", (e) => {
      if (
        e.target === modal ||
        e.target === backdrop ||
        e.target.classList.contains("miroooo-gallery-lightbox__stage")
      ) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Tab") {
        const focusables = modal.querySelectorAll("button:not([disabled])");
        if (focusables.length) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });

    // Touch Swipe Navigation
    modal.addEventListener(
      "touchstart",
      (e) => {
        if (!isOpen) return;
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );

    modal.addEventListener(
      "touchend",
      (e) => {
        if (!isOpen) return;
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
          if (diffX < 0) {
            goNext();
          } else {
            goPrev();
          }
        }
      },
      { passive: true }
    );

    // Attach click listeners to all main gallery media items and thumbnails
    const mainMediaItems = document.querySelectorAll(".product__media-list .product__media");
    mainMediaItems.forEach((mediaEl, idx) => {
      mediaEl.style.cursor = "url('/cursor-zoom-in.svg') 20 20, zoom-in";
      mediaEl.style.pointerEvents = "auto";
      const vidWrap = mediaEl.querySelector(".video-wrapper");
      if (vidWrap) vidWrap.style.pointerEvents = "auto";
      const vid = mediaEl.querySelector("video");
      if (vid) vid.style.pointerEvents = "auto";

      mediaEl.addEventListener("click", (e) => {
        e.preventDefault();
        openLightbox(idx);
      });
    });

    const thumbnails = document.querySelectorAll(".product__thumbnails-list .product__thumbnail");
    thumbnails.forEach((thumb, idx) => {
      thumb.style.cursor = "pointer";
      thumb.addEventListener("click", (e) => {
        thumbnails.forEach((t) => t.classList.remove("is-active"));
        thumb.classList.add("is-active");
        if (mainMediaItems[idx]) {
          mainMediaItems[idx].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        }
        openLightbox(idx);
      });
    });

    window.openMirooooLightbox = openLightbox;
    window.closeMirooooLightbox = closeLightbox;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProductGalleryLightbox);
  } else {
    initProductGalleryLightbox();
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMirooooLottieIcons);
  } else {
    initMirooooLottieIcons();
  }

})();

