import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api';
import { increment } from 'firebase/firestore';
// import { getDaysBetweenDates } from '../utils/dates';
// import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

export function ListItem({ item }) {
	const { name, dateLastPurchased } = item;
	const [checked, setChecked] = useState(false);
	const has24HoursPassed = (dateLastPurchased) => {
		const purchaseDate = dateLastPurchased.toDate();
		const currentTime = new Date().getTime(); // Current time in milliseconds
		const ONE_DAY_IN_MILLISECONDS = 86400000; // 24 hours in milliseconds
		return currentTime - purchaseDate >= ONE_DAY_IN_MILLISECONDS;
	};
	// console.log(calculateEstimate);

	useEffect(() => {
		if (dateLastPurchased) {
			const is24HoursPassed = has24HoursPassed(dateLastPurchased);
			if (is24HoursPassed) {
				setChecked(false);
			} else {
				setChecked(true);
			}
		}
	}, [dateLastPurchased]);

	const handleChange = () => {
		if (!checked) {
			setChecked(!checked);
			const listPath = localStorage.getItem('tcl-shopping-list-path');
			updateItem(listPath, {
				itemName: name,
				dateLastPurchased: checked ? new Date() : null,
				// dateNextPurchased: new Date(),
				totalPurchases: increment(1),
			})
				.then(() => {
					console.log('Item updated successfully.');
				})
				.catch(() => {
					console.error('Error updating item: ', error);
					console.log(error);
				});
		}
	};

	return (
		<li className="ListItem">
			<input
				type="checkbox"
				checked={checked}
				onChange={handleChange}
				disabled={checked}
			/>
			{name}
		</li>
	);
}
