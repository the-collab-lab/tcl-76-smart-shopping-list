import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api';
import { logDOM } from '@testing-library/dom';

export function ListItem({ name, listPath }) {
	const [checked, setChecked] = useState(() => {
		const storedChecked = localStorage.getItem(`checked-${name}`);
		return storedChecked ? JSON.parse(storedChecked) : false;
	});

	useEffect(() => {
		localStorage.setItem(`checked-${name}`, JSON.stringify(checked));
	}, [checked]);

	const handleChange = () => {
		setChecked(!checked);

		const listPath = localStorage.getItem('tcl-shopping-list-path');

		updateItem(listPath, { itemName: name, isChecked: checked });
		console.log(name, checked);
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
