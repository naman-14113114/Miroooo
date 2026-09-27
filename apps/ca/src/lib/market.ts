import { MARKETS, MarketConfig, convertPrice, formatMoney, formatPriceDisplay } from "@miroooo/shared";

/**
 * Canadian Market Configuration:
 * Currency: CAD
 * Currency Symbol: $ (strictly NO CA$, ONLY $)
 * Exchange Rate: 1.75
 * Rounding: 2 decimal places
 * Shipping: Canada Post Express
 * Spelling: Canadian English (en-CA: colour, odour, defence, etc.)
 */
export const market: MarketConfig = {
  ...MARKETS.ca,
  currencySymbol: "$",
  exchangeRate: 1.75,
};

export { convertPrice, formatMoney, formatPriceDisplay };

export function formatCanadianPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export default market;
