export const money = (value?: number | string, currency = true, trailingZero = 0) =>
  `${currency ? '₦' : ''}` +
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: trailingZero,
    maximumFractionDigits: trailingZero,
  }).format(((value ?? 0) as any) * 1);

export const cropString = (str?: string, length: number = 1) => {
  return str ? str.substring(0, length) + (str.length > length ? '. . .' : '') : 'N/A';
}

export const sortObject = (
  array: any[],
  sort: { key: string, asc: boolean }
) => {
  if (!sort.key || array?.length < 2) return array
  const s = sort.key.split('.');
  return array.sort((u1: any, u2: any) => {
    const v1 = s.length > 1 ? u1[s[0]][s[1]] : u1[s[0]]
    const v2 = s.length > 1 ? u2[s[0]][s[1]] : u2[s[0]]
    return sort.asc ? ((v1 < v2) ? 1 : (v1 > v2) ? -1 : 0) : (v1 > v2) ? 1 : (v1 < v2) ? -1 : 0
  })
}