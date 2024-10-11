import { useState } from 'react';
import { shareList } from '../api';

export function ShareList({ userId }) {
	const [email, setEmail] = useState('');

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
						placeholder="Type here"
						name="email"
						value={email}
						onChange={handleEmailChange}
						required
					></input>

					<button type="submit">Share List</button>
				</form>
			</div>
		</>
	);
}
