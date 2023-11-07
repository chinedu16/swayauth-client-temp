export const money = (value?: number | string, currency = true, trailingZero = 0) =>
  `${currency ? '₦' : ''}` +
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: trailingZero,
    maximumFractionDigits: trailingZero,
  }).format(((value ?? 0) as any) * 1);

export const cropString = (str?: string, length: number = 1) => {
  return str ? str.substring(0, length) + (str.length > length ? '. . .' : '') : 'N/A';
}