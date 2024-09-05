import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import './ListItem.css';
// import { updateItem } from '../api';

export function ListItem({ name, listPath }) {
	const [checked, setChecked] = useState(false);

	console.log(listPath);

	const handleChange = () => {
		setChecked(!checked);

		// 	if (checked) {
		// 		updateItem(listPath, { itemName: name })
		// 			.then(() => {
		// 				console.log('Item updated successfully');
		// 			})
		// 			.catch((error) => {
		// 				console.error('Error updating item:', error);
		// 			});
		// 	}
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
