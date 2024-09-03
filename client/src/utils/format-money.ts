export const formatMoney = (
  price: number,
  locale: string = 'en-US',
  currency: string = 'USD'
) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price)
