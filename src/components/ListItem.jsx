import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api';
import { increment } from 'firebase/firestore';

export function ListItem({ item }) {
	const { name, dateLastPurchased } = item;
	const [checked, setChecked] = useState(false);
	const has24HoursPassed = (dateLastPurchased) => {
		const purchaseDate = dateLastPurchased.toDate();
		const currentTime = new Date().getTime(); // Current time in milliseconds
		const ONE_DAY_IN_MILLISECONDS = 86400000; // 24 hours in milliseconds
		return currentTime - purchaseDate >= ONE_DAY_IN_MILLISECONDS;
	};

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
				totalPurchases: increment(1),
			})
				.then(() => {
					console.log('Item updated successfully.');
				})
				.catch(() => {
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
