
export function currencyFormat(mount, locale = 'es-CO') {
  const options = {
    style: 'currency',
    currency: 'COP',
    maximumSignificantDigits: 5,
 }
 return mount.toLocaleString(locale, options)
}