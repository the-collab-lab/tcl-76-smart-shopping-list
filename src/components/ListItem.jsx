import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem, deleteItem } from '../api';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
export function ListItem({ item }) {
	const { name, dateLastPurchased, dateNextPurchased, totalPurchases, id } =
		item;
	const [checked, setChecked] = useState(false);
	const [isActive, setIsActive] = useState(false);

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
		<li className="ListItem space-x-3">
			<input
				type="checkbox"
				checked={checked}
				onChange={handleChange}
				disabled={checked}
				className="checkbox checkbox-primary"
			/>
			<h2 style={{ fontSize: '20px' }}>{name}</h2>

			<button onClick={handleDelete}>
				<DeleteIcon />
			</button>
			<div className="dropdown">
				<button
					onClick={() => setIsActive(!isActive)}
					className="focus:bg-secondary"
				>
					<ExpandMoreIcon />
				</button>
				<div className="dropdown-content bg-base-200 rounded-box z-[1] w-60 p-4 shadow">
					<ul style={{ fontSize: '15px' }}>
						<li>
							<h4 className="font-bold">Last Purchase:</h4>
							<span>
								{' '}
								{dateLastPurchased
									? dateLastPurchased.toDate().toDateString()
									: 'N/A'}
							</span>
						</li>
						<li>
							<h4 className="font-bold">Next Purchase:</h4>

							<span> {dateNextPurchased?.toDate().toDateString()}</span>
						</li>
						<li>
							<h4 className="font-bold">Total Purchases: </h4>
							<span>{totalPurchases}</span>
						</li>
					</ul>
				</div>
			</div>
		</li>
	);
}
