import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem, deleteItem } from '../api';

export function ListItem({ item }) {
	const { name, dateLastPurchased, dateNextPurchased, totalPurchases, id } =
		item;
	const [checked, setChecked] = useState(false);

	const dateNext = new Date(dateNextPurchased?.toDate());
	const dateLast = dateLastPurchased?.toDate();
	const handleDelete = async () => {
		try {
			if (window.confirm(`Are you sure you want to delete ${name}?`)) {
				const listPath = localStorage.getItem('tcl-shopping-list-path');
				await deleteItem(listPath, item);
			}
		} catch (error) {
			console.log(error);
		}
	};

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
			<h2>{name}</h2>

			<button onClick={handleDelete}>Delete</button>
			<div>
				<ul>
					<li>
						Last Purchased:
						{dateLastPurchased?.toDate().toDateString()}
					</li>
					<li> Next Purchased:{dateNextPurchased?.toDate().toDateString()}</li>
					<li>Total Purchases:{totalPurchases}</li>
				</ul>
			</div>
		</li>
	);
}
