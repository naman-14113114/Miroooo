(function () {
  "use strict";

  var SOURCE_SITE = "trymiroooo.com";
  var MARKET = "United Kingdom";
  var CURRENCY = "GBP";
  var PRODUCTS = {
    "miroooo-x": {
      ProductName: "Miroooo X1",
      ProductID: "1000000675113473",
      SKU: "MIROOOO-X1",
      Categories: ["Electric Toothbrushes", "Oral Care"],
      ImageURL: "https://www.trymiroooo.com/assets_ref/x/gallery/Miroooo_x_Pink-1.webp",
      URL: "https://www.trymiroooo.com/products/miroooo-x",
      Brand: "MIROOOO",
      Price: 69,
      CompareAtPrice: 139
    },
    "miroooo-x2": {
      ProductName: "Miroooo X2",
      ProductID: "1000000675072187",
      SKU: "MIROOOO-X2",
      Categories: ["Electric Toothbrushes", "Oral Care"],
      ImageURL: "https://www.trymiroooo.com/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-checkout.webp",
      URL: "https://www.trymiroooo.com/products/miroooo-x2",
      Brand: "MIROOOO",
      Price: 69,
      CompareAtPrice: 139
    },
    "miroooo-x1-heads": {
      ProductName: "Miroooo X1 Heads",
      ProductID: "1000000675471182",
      SKU: "MIROOOO-X1-HEADS-2PK",
      Categories: ["Brush Heads", "Oral Care"],
      ImageURL: "https://www.trymiroooo.com/assets_ref/x/heads/B1.webp",
      URL: "https://www.trymiroooo.com/products/miroooo-x1-heads",
      Brand: "MIROOOO",
      Price: 10,
      CompareAtPrice: 10
    },
    "miroooo-x2-heads": {
      ProductName: "Miroooo X2 Heads",
      ProductID: "1000000675616058",
      SKU: "MIROOOO-X2-HEADS-2PK",
      Categories: ["Brush Heads", "Oral Care"],
      ImageURL: "https://www.trymiroooo.com/assets_ref/x2/heads/B1.webp",
      URL: "https://www.trymiroooo.com/products/miroooo-x2-heads",
      Brand: "MIROOOO",
      Price: 10,
      CompareAtPrice: 10
    }
  };

  function callKlaviyo(method) {
    try {
      var args = Array.prototype.slice.call(arguments, 1);
      if (window.klaviyo && typeof window.klaviyo[method] === "function") {
        window.klaviyo[method].apply(window.klaviyo, args);
        return;
      }

      window._klOnsite = window._klOnsite || [];
      if (typeof window._klOnsite.push === "function") {
        window._klOnsite.push([method].concat(args));
      }
    } catch (_) {}
  }

  function track(eventName, payload) {
    try {
      callKlaviyo("track", eventName, payload);
    } catch (_) {}
  }

  function productHandleFromPath() {
    var match = window.location.pathname.match(/(?:^|\/)(?:products\/)?(miroooo-x1-heads|miroooo-x2-heads|miroooo-x2|miroooo-x)(?:\.html)?\/?$/i);
    return match ? match[1].toLowerCase() : null;
  }

  function productPayload(product) {
    return Object.assign({}, product, {
      Currency: CURRENCY,
      Market: MARKET,
      SourceSite: SOURCE_SITE
    });
  }

  function readCartSnapshot() {
    try {
      var stored = JSON.parse(window.localStorage.getItem("miroooo_cart") || "null");
      if (!stored) return null;

      var items = [];
      if (Array.isArray(stored.items) && stored.items.length > 0) {
        items = stored.items;
      } else if (stored.productId && PRODUCTS[stored.productId]) {
        var h = stored.productId;
        var qty = Math.max(1, Math.round(Number(stored.quantity) || 1));
        var colors = Array.isArray(stored.colors) ? stored.colors : ["Grey"];
        items.push({
          productHandle: h,
          productId: PRODUCTS[h].ProductID,
          quantity: qty,
          color: colors[0] || "Grey",
          title: PRODUCTS[h].ProductName
        });
      }

      if (!items.length) return null;

      var totalValue = 0;
      var itemPayloads = [];
      var itemNames = [];
      var allCategories = [];

      items.forEach(function (i) {
        var h = i.productHandle || "miroooo-x";
        var prod = PRODUCTS[h] || PRODUCTS["miroooo-x"];
        var qty = Math.max(1, Math.round(Number(i.quantity) || 1));
        var lineVal = 0;
        if (h === "miroooo-x1-heads" || h === "miroooo-x2-heads") {
          lineVal = qty * 10;
        } else {
          lineVal = qty === 1 ? 69 : (qty === 2 ? 128 : (qty === 3 ? 177 : qty * 59));
        }
        totalValue += lineVal;
        if (itemNames.indexOf(prod.ProductName) === -1) itemNames.push(prod.ProductName);
        if (prod.Categories) {
          prod.Categories.forEach(function (c) {
            if (allCategories.indexOf(c) === -1) allCategories.push(c);
          });
        }
        itemPayloads.push({
          ProductID: prod.ProductID,
          SKU: prod.SKU,
          ProductName: prod.ProductName,
          Quantity: qty,
          ItemPrice: Number((lineVal / qty).toFixed(2)),
          RowTotal: lineVal,
          ProductURL: prod.URL,
          ImageURL: i.image || prod.ImageURL,
          ProductCategories: prod.Categories,
          VariantNames: [i.color || "Default"]
        });
      });

      return {
        totalValue: totalValue,
        itemNames: itemNames,
        categories: allCategories,
        items: itemPayloads
      };
    } catch (_) {
      return null;
    }
  }

  function itemPayload(snapshot) {
    if (snapshot.items && snapshot.items[0]) return snapshot.items[0];
    if (snapshot.product) {
      return {
        ProductID: snapshot.product.ProductID,
        SKU: snapshot.product.SKU,
        ProductName: snapshot.product.ProductName,
        Quantity: snapshot.quantity,
        ItemPrice: Number((snapshot.totalValue / snapshot.quantity).toFixed(2)),
        RowTotal: snapshot.totalValue,
        ProductURL: snapshot.product.URL,
        ImageURL: snapshot.product.ImageURL,
        ProductCategories: snapshot.product.Categories,
        VariantNames: snapshot.colors
      };
    }
    return {};
  }

  function trackViewedProduct() {
    var handle = productHandleFromPath();
    var product = handle && PRODUCTS[handle];
    if (!product) return;

    var payload = productPayload(product);
    track("Viewed Product", payload);
    callKlaviyo("trackViewedItem", {
      Title: payload.ProductName,
      ItemId: payload.ProductID,
      Categories: payload.Categories,
      ImageUrl: payload.ImageURL,
      Url: payload.URL,
      Metadata: {
        Brand: payload.Brand,
        Price: payload.Price,
        CompareAtPrice: payload.CompareAtPrice,
        Currency: CURRENCY,
        Market: MARKET
      }
    });
  }

  function handleAddedToCart(event) {
    var detail = event.detail || {};
    var handle = detail.productHandle || detail.handle;
    var product = PRODUCTS[handle];
    if (!product) return;

    var quantity = Math.max(1, Math.round(Number(detail.quantity || detail.bundleCount) || 1));
    var totalValue = Number(detail.value);
    if (!Number.isFinite(totalValue)) totalValue = product.Price * quantity;
    var snapshot = {
      handle: handle,
      product: product,
      quantity: quantity,
      colors: Array.isArray(detail.colors) ? detail.colors : (Array.isArray(detail.choices) ? detail.choices : []),
      totalValue: totalValue
    };
    var item = itemPayload(snapshot);

    track("Added to Cart", {
      $event_id: "miroooo-add-" + Date.now(),
      $value: totalValue,
      AddedItemProductName: product.ProductName,
      AddedItemProductID: product.ProductID,
      AddedItemSKU: product.SKU,
      AddedItemCategories: product.Categories,
      AddedItemImageURL: product.ImageURL,
      AddedItemURL: product.URL,
      AddedItemPrice: item.ItemPrice,
      AddedItemQuantity: quantity,
      ItemNames: [product.ProductName],
      CheckoutURL: "https://www.trymiroooo.com/cart",
      Items: [item],
      Currency: CURRENCY,
      Market: MARKET,
      SourceSite: SOURCE_SITE
    });
  }

  function handleStartedCheckout(event) {
    var snapshot = readCartSnapshot();
    if (!snapshot) return;
    var checkoutUrl = event.detail && event.detail.checkoutUrl;

    track("Started Checkout", {
      $event_id: "miroooo-checkout-" + Date.now(),
      $value: snapshot.totalValue,
      ItemNames: snapshot.itemNames,
      CheckoutURL: checkoutUrl || "https://www.trymiroooo.com/cart",
      Categories: snapshot.categories,
      Items: snapshot.items,
      Currency: CURRENCY,
      Market: MARKET,
      SourceSite: SOURCE_SITE
    });
  }

  function trackViewedQuiz() {
    try {
      var body = document.body || document.documentElement;
      var pageAttr = body ? (body.getAttribute("data-page") || (body.dataset && body.dataset.page)) : "";
      var isQuizPage = pageAttr === "dentalcare-quiz" ||
        (document.querySelector && Boolean(document.querySelector('[data-page="dentalcare-quiz"]'))) ||
        window.location.pathname.indexOf("dentalcare-quiz") !== -1;

      if (!isQuizPage) return;

      track("Viewed Quiz Page", {
        PageName: document.title || "Dentalcare Quiz",
        URL: window.location.href,
        Path: window.location.pathname,
        Market: MARKET,
        SourceSite: SOURCE_SITE
      });
    } catch (_) {}
  }

  function handleQuizCompleted(event) {
    try {
      var detail = (event && event.detail) || {};
      var result = detail.result || detail;
      var matchedModel = detail.matchedModel || detail.model || (result && (result.model || result.matchedModel)) || "";
      var profile = detail.profile || detail.profileTitle || (result && (result.profileTitle || result.profile)) || "";

      track("Completed Dentalcare Quiz", {
        $event_id: "miroooo-quiz-" + Date.now(),
        matchedModel: matchedModel,
        profile: profile,
        Market: MARKET,
        SourceSite: SOURCE_SITE
      });
    } catch (_) {}
  }

  window._klOnsite = window._klOnsite || [];

  track("Viewed Page", {
    PageName: document.title,
    URL: window.location.href,
    Path: window.location.pathname,
    Market: MARKET,
    SourceSite: SOURCE_SITE
  });
  trackViewedProduct();
  trackViewedQuiz();

  window.addEventListener("miroooo:added-to-cart", handleAddedToCart);
  window.addEventListener("miroooo:started-checkout", handleStartedCheckout);
  window.addEventListener("miroooo:quiz-completed", handleQuizCompleted);
  window.addEventListener("miroooo:dentalcare-quiz-completed", handleQuizCompleted);
  window.addEventListener("quiz:completed", handleQuizCompleted);
  window.addEventListener("dentalcare-quiz:completed", handleQuizCompleted);

  window.__mirooooKlaviyo = {
    track: track,
    trackQuizCompleted: function (result) {
      handleQuizCompleted({ detail: result });
    }
  };
})();
