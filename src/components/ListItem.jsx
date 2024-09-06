import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api';

export function ListItem({ item }) {
	// Get the initial checked state from localStorage or default to false
	const [checked, setChecked] = useState(() => {
		const storedChecked = localStorage.getItem(`checked-${item.name}`);
		return storedChecked ? JSON.parse(storedChecked) : false;
	});

	// Function to check if 24 hours have passed
	const has24HoursPassed = (dateLastPurchased) => {
		const purchaseTime = dateLastPurchased.getTime(); // Time in milliseconds
		const currentTime = new Date().getTime(); // Current time in milliseconds
		const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
		return currentTime - purchaseTime >= oneDayInMs;
	};

	// Run the effect when the component mounts
	useEffect(() => {
		if (item.dateLastPurchased) {
			const purchaseDate = item.dateLastPurchased.toDate(); // Convert Firebase timestamp to Date

			if (checked) {
				console.log('Checking if 24 hours passed since last purchase');
				const is24HoursPassed = has24HoursPassed(purchaseDate);
				console.log(`Has 24 hours passed: ${is24HoursPassed}`);

				// If 24 hours have passed, uncheck the item
				if (is24HoursPassed) {
					console.log('Unchecking item because 24 hours have passed');
					setChecked(false);
					localStorage.setItem(`checked-${item.name}`, JSON.stringify(false));
				}
			}
		}
	}, [item.dateLastPurchased, item.name, checked]);

	// Store the checked state in localStorage whenever it changes
	useEffect(() => {
		console.log(`Storing checked state for ${item.name}: ${checked}`);
		localStorage.setItem(`checked-${item.name}`, JSON.stringify(checked));
	}, [checked, item.name]);

	// Handle checkbox change (when user clicks on it)
	const handleChange = () => {
		const newCheckedState = !checked;
		console.log(`User toggled checkbox for ${item.name}: ${newCheckedState}`);
		setChecked(newCheckedState);

		const listPath = localStorage.getItem('tcl-shopping-list-path');

		// Update the backend with the new checked state
		updateItem(listPath, { itemName: item.name, isChecked: newCheckedState });

		// If the item is being checked, update the last purchased date
		if (newCheckedState) {
			console.log(`Updating last purchased date for ${item.name}`);
			updateItem(listPath, {
				itemName: item.name,
				isChecked: newCheckedState,
				dateLastPurchased: new Date(),
			});
		}
	};

	return (
		<li className="ListItem">
			<Checkbox
				checked={checked}
				onChange={handleChange}
				inputProps={{ 'aria-label': 'controlled' }}
			/>
			{item.name}
		</li>
	);
}
