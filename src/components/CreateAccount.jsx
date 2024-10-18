import { useState } from 'react';
import { auth } from '../api/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addUserToDatabase } from '../api';
import { useNavigate } from 'react-router-dom';

export function CreateAccount() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			//create user with email and password
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;

			//Add the user to firestore
			await addUserToDatabase({ ...user, displayName: name });

			//show success message
			window.alert('Account created successfully!');

			//Reset input fields or redirect as needed
			setEmail('');
			setPassword('');
			setName('');

			//redirect to the home page
			navigate('/');
		} catch (error) {
			//Handle errors
			console.error('Error signing up', error);
			setError(error.message);
		}
	};

	return (
		<div>
			<h2>Create Account</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
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
				{error && <p>{error}</p>}
			</form>
		</div>
	);
}

export default CreateAccount;
