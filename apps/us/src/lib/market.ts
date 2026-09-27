import { MARKETS, MarketConfig, convertPrice, formatMoney, formatPriceDisplay } from "@miroooo/shared";

/**
 * US Market configuration
 * Currency: USD ($)
 * Exchange rate: 1.30
 * Decimal places: 2
 * Shipping: USPS Priority / FedEx Ground
 * en-US spelling: color, aluminum, odor, specialized, customized, defense
 */
export const market: MarketConfig = MARKETS.us;

export { convertPrice, formatMoney, formatPriceDisplay };
export type { MarketConfig };
