// import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	console.log(new Date(Date.now() + offset * 86400000));

	return new Date(Date.now() + offset * 86400000);
}

export function getDaysBetweenDates(dateLastPurchased) {
	const dateLastPurchasedNumber = dateLastPurchased.getTime();
	const currentDay = Date.now();
	return Math.ceil((currentDay - dateLastPurchasedNumber) / 86400000);
}

// getDaysBetweenDates: We need to write a function that calculates current day - dateLastPurchased to calculate the number of days between the current day and the date last purchased
// if dateLastPurchased = null, then dateNextPurchased = null
// dateNextPurchased = days until you need this item again + dateLastPurchased

// I think we need to get an item's dateLastPurchased from firebase
// How do we access that? Import from firebase.js?
// getDaysBetweenDates should be return integer

// if (dateLastPurchased === null) {
// 	getFutureDate + createdDate;
// } else {
// 	getFutureDate + dateLastPurchased;
// }
