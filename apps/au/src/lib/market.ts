import { MARKETS, MarketConfig, convertPrice, formatMoney, formatPriceDisplay } from "@miroooo/shared";

/**
 * Australian Market Configuration:
 * Currency: AUD
 * Currency Symbol: $ (strictly NO AU$, ONLY $)
 * Exchange Rate: 1.95
 * Rounding: 2 decimal places
 * Shipping: Australia Post Express
 * Spelling: Australian English (en-AU: colour, aluminium, odour, specialised, defence)
 */
export const market: MarketConfig = {
  ...MARKETS.au,
  currencySymbol: "$",
  exchangeRate: 1.95,
};

export { convertPrice, formatMoney, formatPriceDisplay };

export function formatAustralianPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export default market;
