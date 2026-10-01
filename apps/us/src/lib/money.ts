/** USD amounts are quoted by XPage, not converted from the UK catalogue. */
export const cents = (value: number) => Math.round((value + Number.EPSILON) * 100);
export const roundMoney = (value: number) => cents(value) / 100;
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
export const savingPercent = (price: number, compareAt: number) =>
  compareAt > 0 ? Math.round((1 - price / compareAt) * 100) : 0;
