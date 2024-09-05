import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import './ListItem.css';
import { updateItem } from '../api';

export function ListItem({ name }) {
	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		setChecked(!checked);
	};

	return (
		<li className="ListItem">
			<Checkbox
				checked={checked}
				onChange={handleChange}
				inputProps={{ 'aria-label': 'controlled' }}
			/>
			{name}
			{checked ? 'checked' : 'unchecked'}
		</li>
	);
}
