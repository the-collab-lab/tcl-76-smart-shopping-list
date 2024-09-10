import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api';
import { increment } from 'firebase/firestore';

export function ListItem({ item }) {
	// Destructure item props
	const { name, dateLastPurchased } = item;

	// Keeping [checked, setChecked] state, but removing any calls to local storage
	const [checked, setChecked] = useState(false);

	// Function to check if 24 hours have passed: Changed variable tagging.
	const has24HoursPassed = (dateLastPurchased) => {
		const purchaseDate = dateLastPurchased.toDate();
		const currentTime = new Date().getTime(); // Current time in milliseconds
		const ONE_DAY_IN_MILLISECONDS = 86400000; // 24 hours in milliseconds
		return currentTime - purchaseDate >= ONE_DAY_IN_MILLISECONDS;
	};

	// Run the effect when the component mounts
	useEffect(() => {
		if (dateLastPurchased) {
			const is24HoursPassed = has24HoursPassed(dateLastPurchased);
			// If 24 hours have passed, uncheck the checkbox associated with the item.
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

			// Update the backend with the new checked state
			updateItem(listPath, {
				itemName: name,
				dateLastPurchased: checked ? new Date() : null,
				totalPurchases: increment(1),
			})
				// Error handling
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
