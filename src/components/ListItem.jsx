import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api';
import { increment } from 'firebase/firestore';

export function ListItem({ item }) {
	// Destructure item props
	const { name, dateLastPurchased } = item;
	const listPath = localStorage.getItem('tcl-shopping-list-path');

	// Get the initial checked state from localStorage or default to false
	const [checked, setChecked] = useState(() => {
		const storedChecked = localStorage.getItem(`checked-${name}`);
		return storedChecked ? JSON.parse(storedChecked) : false;
	});

	// Function to check if 24 hours have passed: Changed variable tagging.
	const has24HoursPassed = (dateLastPurchased) => {
		const userChecksCheckbox = dateLastPurchased.getTime(); // Time in milliseconds
		const currentTime = new Date().getTime(); // Current time in milliseconds
		const ONE_DAY_IN_MILLISECONDS = 86400000; // 24 hours in milliseconds
		return currentTime - userChecksCheckbox >= ONE_DAY_IN_MILLISECONDS;
	};

	// Run the effect when the component mounts
	useEffect(() => {
		if (dateLastPurchased) {
			const purchaseDate = dateLastPurchased.toDate(); // Convert Firebase timestamp to Date
			if (checked) {
				const is24HoursPassed = has24HoursPassed(purchaseDate);

				// If 24 hours have passed, uncheck the checkbox associated with the item.
				if (is24HoursPassed) {
					setChecked(false);
					localStorage.setItem(`checked-${name}`, JSON.stringify(false));
					updateItem(listPath, {
						itemName: name,
						isChecked: false, // Set isChecked to false explicitly
						dateLastPurchased: new Date(),
						totalPurchases: increment(1),
					});
					// updateData.totalPurchases = increment(1);
				}
			}
		}
	}, [dateLastPurchased, name, checked]);

	// Store the checked state in localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem(`checked-${name}`, JSON.stringify(checked));
	}, [checked, name]);

	const handleChange = () => {
		const newCheckedState = !checked;
		setChecked(newCheckedState);
		const listPath = localStorage.getItem('tcl-shopping-list-path');

		// Update the backend with the new checked state
		updateItem(listPath, {
			itemName: name,
			isChecked: newCheckedState,
			dateLastPurchased: newCheckedState && new Date(),
			totalPurchases: increment(1),
		});
	};

	return (
		<li className="ListItem">
			<Checkbox
				checked={checked}
				onChange={handleChange}
				inputProps={{ 'aria-label': 'controlled' }}
			/>
			{name}
		</li>
	);
}
