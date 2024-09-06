import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api';

export function ListItem({ item }) {
	//Get the initial checked state from localStorage or default to false
	const [checked, setChecked] = useState(() => {
		const storedChecked = localStorage.getItem(`checked-${item.name}`);
		return storedChecked ? JSON.parse(storedChecked) : false;
	});

	// console.log(item);
	// console.log('item name:', item.name, ', date last purchased:', item.dateLastPurchased.toDate());

	//function to check if 24 hours have passed
	const has24HoursPassed = (dateLastPurchased) => {
		const purchaseTime = dateLastPurchased.getTime(); //time in miliseconds
		const currentTime = new Date().getTime(); //current time in miliseconds
		const oneDayInMs = 24 * 60 * 60 * 1000; //24 hours in miliseconds
		const calcTime = currentTime - purchaseTime >= oneDayInMs;
		console.log(calcTime);
	};

	// Run the effect when the component mounts
	useEffect(() => {
		if (item.dateLastPurchased) {
			//converting firebase timestamp to date object
			const purchaseDate = item.dateLastPurchased.toDate();

			//if 24 hours have passed since last purchase, uncheck item
			if (checked && has24HoursPassed(purchaseDate)) {
				setChecked(false);
				localStorage.setItem(`checked-${item.name}`, JSON.stringify(false));
			}
		}
	}, [item.dateLastPurchased, item.name, checked]);

	// if calcTime >= oneDayInMS, then check, else, uncheck.

	useEffect(() => {
		localStorage.setItem(`checked-${item.name}`, JSON.stringify(checked));
	}, [checked, item.name]);

	const handleChange = () => {
		const newCheckedState = !checked;
		setChecked(newCheckedState);

		const listPath = localStorage.getItem('tcl-shopping-list-path');

		updateItem(listPath, { itemName: item.name, isChecked: newCheckedState });

		//if the item is being checked, update the last purchased date
		if (newCheckedState) {
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
