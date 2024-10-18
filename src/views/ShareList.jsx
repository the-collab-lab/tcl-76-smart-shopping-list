import { useState } from 'react';
import { shareList } from '../api';

export function ShareList({ userId }) {
	// const [formData, setFormData] = useState({
	// 	name: '',
	// 	frequency: '',
	// });

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
			<div className="manage-list-form flex flex-col h-[10vh] my-8 p-8 rounded-3xl shadow-xl overflow-hidden mx-auto  bg-neutral text-white font-medium">
				<form onSubmit={handleEmailSubmit}>
					<label htmlFor="invite-email" className="font-medium">
						Invite user by email:
					</label>
					<input
						id="invite-email"
						type="text"
						placeholder="Type here"
						name="email"
						value={email}
						onChange={handleEmailChange}
						required
						className="text-black placeholder-zinc-600"
					></input>

					<button
						type="submit"
						className="bg-accent text-black hover:text-white"
					>
						Share List
					</button>
				</form>
			</div>
		</>
	);
}
