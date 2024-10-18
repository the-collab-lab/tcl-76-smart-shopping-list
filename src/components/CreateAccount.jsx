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
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name:
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-accent"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email:
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-accent"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password:
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-accent"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-accent text-white py-2 rounded-md hover:bg-accent-dark transition"
					>
						Create Account
					</button>
					{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
				</form>
			</div>
		</div>
	);
}

export default CreateAccount;
