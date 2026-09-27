export type CountryCode = "uk" | "us" | "ca" | "au";
export type CurrencyCode = "GBP" | "USD" | "CAD" | "AUD";

export interface MarketConfig {
  code: CountryCode;
  country: string;
  currency: CurrencyCode;
  currencySymbol: string;
  exchangeRate: number; // multiplier from base GBP
  locale: string;
  siteUrl: string;
  shipping: {
    carrier: string;
    deliveryText: string;
    processingDaysMin: number;
    processingDaysMax: number;
    transitDaysMin: number;
    transitDaysMax: number;
    freeThreshold: number;
  };
  support: {
    email: string;
    hours: string;
    address: string;
  };
  spelling: {
    color: "colour" | "color";
    aluminum: "aluminium" | "aluminum";
    odor: "odour" | "odor";
    specialized: "specialised" | "specialized";
    customized: "customised" | "customized";
    defense: "defence" | "defense";
  };
}

export const MARKETS: Record<CountryCode, MarketConfig> = {
  uk: {
    code: "uk",
    country: "United Kingdom",
    currency: "GBP",
    currencySymbol: "£",
    exchangeRate: 1.0,
    locale: "en-GB",
    siteUrl: "https://www.trymiroooo.com",
    shipping: {
      carrier: "Royal Mail Tracked 24/48",
      deliveryText: "Free tracked UK delivery",
      processingDaysMin: 1,
      processingDaysMax: 3,
      transitDaysMin: 3,
      transitDaysMax: 10,
      freeThreshold: 50,
    },
    support: {
      email: "support@trymiroooo.com",
      hours: "Monday – Friday, 9:00 AM – 6:00 PM GMT",
      address: "71-75 Shelton St, London WC2H 9JQ, UK",
    },
    spelling: {
      color: "colour",
      aluminum: "aluminium",
      odor: "odour",
      specialized: "specialised",
      customized: "customised",
      defense: "defence",
    },
  },
  us: {
    code: "us",
    country: "United States",
    currency: "USD",
    currencySymbol: "$",
    exchangeRate: 1.30,
    locale: "en-US",
    siteUrl: "https://us.trymiroooo.com",
    shipping: {
      carrier: "USPS Priority / FedEx Ground",
      deliveryText: "Free tracked US delivery",
      processingDaysMin: 1,
      processingDaysMax: 3,
      transitDaysMin: 3,
      transitDaysMax: 7,
      freeThreshold: 65,
    },
    support: {
      email: "support@trymiroooo.com",
      hours: "Monday – Friday, 9:00 AM – 6:00 PM EST",
      address: "131 Continental Dr Suite 305, Newark, DE 19713, USA",
    },
    spelling: {
      color: "color",
      aluminum: "aluminum",
      odor: "odor",
      specialized: "specialized",
      customized: "customized",
      defense: "defense",
    },
  },
  ca: {
    code: "ca",
    country: "Canada",
    currency: "CAD",
    currencySymbol: "$", // Strictly $ (NOT CA$)
    exchangeRate: 1.75,
    locale: "en-CA",
    siteUrl: "https://ca.trymiroooo.com",
    shipping: {
      carrier: "Canada Post Express",
      deliveryText: "Free Tracked Canada Delivery",
      processingDaysMin: 1,
      processingDaysMax: 3,
      transitDaysMin: 4,
      transitDaysMax: 10,
      freeThreshold: 85,
    },
    support: {
      email: "support@trymiroooo.com",
      hours: "Monday – Friday, 9:00 AM – 6:00 PM EST",
      address: "131 Continental Dr Suite 305, Newark, DE 19713, USA",
    },
    spelling: {
      color: "colour",
      aluminum: "aluminum",
      odor: "odour",
      specialized: "specialized",
      customized: "customized",
      defense: "defence",
    },
  },
  au: {
    code: "au",
    country: "Australia",
    currency: "AUD",
    currencySymbol: "$", // Strictly $ (NOT AU$)
    exchangeRate: 1.95,
    locale: "en-AU",
    siteUrl: "https://au.trymiroooo.com",
    shipping: {
      carrier: "Australia Post Express",
      deliveryText: "Free Tracked Australia Delivery",
      processingDaysMin: 1,
      processingDaysMax: 3,
      transitDaysMin: 4,
      transitDaysMax: 10,
      freeThreshold: 95,
    },
    support: {
      email: "support@trymiroooo.com",
      hours: "Monday – Friday, 9:00 AM – 6:00 PM AEST",
      address: "131 Continental Dr Suite 305, Newark, DE 19713, USA",
    },
    spelling: {
      color: "colour",
      aluminum: "aluminium",
      odor: "odour",
      specialized: "specialised",
      customized: "customised",
      defense: "defence",
    },
  },
};

/**
 * Convert base GBP price to market price rounded to 2 decimal places.
 */
export function convertPrice(baseGbpPrice: number, market: MarketConfig): number {
  const converted = baseGbpPrice * market.exchangeRate;
  return Math.round(converted * 100) / 100;
}

/**
 * Format money with currency symbol and 2 decimal places.
 * e.g. £59.00, $76.70, $103.25, $115.05
 */
export function formatMoney(amount: number, currencySymbol = "£"): string {
  const fixed = amount.toFixed(2);
  return `${currencySymbol}${fixed}`;
}

/**
 * Format money clean without trailing .00 if requested or strictly 2 decimal places.
 */
export function formatPriceDisplay(amount: number, currencySymbol = "£"): string {
  // If amount has no decimal cents (e.g. 59.00), UK often displays £59, but we can display either or £59.00
  const fixed = amount.toFixed(2);
  return `${currencySymbol}${fixed}`;
}
