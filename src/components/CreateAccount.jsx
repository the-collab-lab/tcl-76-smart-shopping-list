import { useState } from 'react';

export function CreateAccount() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		//logic for handling form submission when creating account
		console.log('Creating account with email:', email);
	};

	return (
		<div>
			<h2>Create Account</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">Create Account</button>
			</form>
		</div>
	);
}

export default CreateAccount;
