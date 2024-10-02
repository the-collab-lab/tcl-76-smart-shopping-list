import { useState, useEffect } from 'react';
import { addItem, shareList } from '../api';
import { useVoiceToText } from '../utils';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

export function ShareList({ userId, list }) {
	const [formData, setFormData] = useState({
		name: '',
		frequency: '',
	});

	const [email, setEmail] = useState('');

	const { text, isListening, startListening } = useVoiceToText();

	useEffect(() => {
		if (text) {
			setFormData((prev) => ({ ...prev, name: text }));
		}
	}, [text]);

	function handleChange(e) {
		e.preventDefault();
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}
	function handleEmailChange(e) {
		e.preventDefault();
		setEmail(e.target.value);
	}

	async function handleEmailSubmit(e) {
		e.preventDefault();
		const listPath = localStorage.getItem('tcl-shopping-list-path');
		try {
			const result = await shareList(listPath, userId, email);
			window.alert(result.response);
			setEmail('');
		} catch (error) {}
	}

	return (
		<>
			<div className="manage-list-form">
				<form onSubmit={handleEmailSubmit}>
					<label htmlFor="invite-email">Invite user by email:</label>
					<input
						id="invite-email"
						type="text"
						name="email"
						value={email}
						onChange={handleEmailChange}
						required
					></input>

					<button type="submit">Invite my friend</button>
				</form>
			</div>
		</>
	);
}
