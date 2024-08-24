import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import { createList, useAuth } from '../api';
import { useNavigate } from 'react-router-dom';

export function Home({ data, setListPath }) {
	const [listName, setListName] = useState('');
	const [error, setError] = useState('');
	const { user } = useAuth();
	const userId = user?.uid;
	const userEmail = user?.email;
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			if (!listName || !listName.trim()) {
				throw new Error('Empty field, please enter a valid name');
			}
			const result = await createList(userId, userEmail, listName);
			setListPath(result);
			setError('List saved to database');
			navigate('/list');
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
	}

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{data &&
					data.map((list) => {
						return (
							<>
								<SingleList
									key={crypto.randomUUID()}
									name={list.name}
									setListPath={setListPath}
									path={list.path}
								/>
							</>
						);
					})}
			</ul>
			<form action="" onSubmit={handleSubmit}>
				<label htmlFor="listName">Enter List Name:</label>
				<input
					type="text"
					id="listName"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
				/>
				<button>Submit</button>
				<p>{error}</p>
			</form>
		</div>
	);
}
