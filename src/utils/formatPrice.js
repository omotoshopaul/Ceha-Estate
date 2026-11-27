const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

/**
 * Formats a numeric price in Nigerian Naira.
 * Appends " / year" when the listing is a rental.
 */
export function formatPrice(amount, listingType) {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount)) {
    return '₦0';
  }

  const formatted = nairaFormatter.format(numericAmount);
  return listingType === 'rent' ? `${formatted} / year` : formatted;
}
