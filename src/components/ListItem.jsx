import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api';
import { increment } from 'firebase/firestore';
// import { getDaysBetweenDates } from '../utils/dates';
// import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

export function ListItem({ item }) {
	const { name, dateLastPurchased, dateCreated, id } = item;
	const [checked, setChecked] = useState(false);

	const has24HoursPassed = (dateLastPurchased) => {
		const purchaseDate = new Date(dateLastPurchased);
		const currentTime = new Date().getTime(); // Current time in milliseconds
		const ONE_DAY_IN_MILLISECONDS = 86400000; // 24 hours in milliseconds
		return currentTime - purchaseDate >= ONE_DAY_IN_MILLISECONDS;
	};
	// console.log(calculateEstimate);

	console.log('dateCreated: ', item.dateCreated.toDate());

	useEffect(() => {
		if (dateLastPurchased) {
			setChecked(has24HoursPassed(dateLastPurchased));
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

			//to delete
			if (!listPath) {
				console.error('Error: List path is not set in localStorage.');
				return; // Exit if listPath is invalid
			}

			updateItem(listPath, id, item)
				.then(() => {
					console.log('Item updated successfully.');
				})
				.catch((error) => {
					console.error('Error updating item: ', error);
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
