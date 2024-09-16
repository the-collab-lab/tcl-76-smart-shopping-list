import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api';

export function ListItem({ item }) {
	const { name, dateLastPurchased, dateCreated, id } = item;
	const [checked, setChecked] = useState(false);

	const has24HoursPassed = (dateLastPurchased) => {
		const millisecondsFromTimestamp =
			dateLastPurchased.seconds * 1000 +
			dateLastPurchased.nanoseconds / 1000000;
		const purchaseDate = new Date(millisecondsFromTimestamp);
		const currentTime = new Date().getTime(); // Current time in milliseconds
		const ONE_DAY_IN_MILLISECONDS = 86400000; // 24 hours in milliseconds
		return currentTime - purchaseDate >= ONE_DAY_IN_MILLISECONDS;
	};

	useEffect(() => {
		if (dateLastPurchased) {
			const is24HoursPassed = has24HoursPassed(dateLastPurchased);
			setChecked(!is24HoursPassed);
		}
	}, [dateLastPurchased]);

	const handleChange = () => {
		if (!checked) {
			setChecked(!checked);
			const listPath = localStorage.getItem('tcl-shopping-list-path');

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
