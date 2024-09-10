const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

// getDaysBetweenDates: We need to write a function that calculates current day - dateLastPurchased to calculate the number of days between the current day and the date last purchased

//  if dateLastPurchased = null, then dateNextPurchased = null
// dateNextPurchased = days until you need this item again + dateLastPurchased
