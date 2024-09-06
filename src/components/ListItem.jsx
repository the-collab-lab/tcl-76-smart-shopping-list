import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import './ListItem.css';
import { updateItem } from '../api';

export function ListItem({ name, listPath }) {
	const [checked, setChecked] = useState(false);

	// console.log("name:", name, "update item:", updateItem);

	const handleChange = () => {
		setChecked(!checked);
		updateItem(listPath, { itemName: name, isChecked: checked });
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
