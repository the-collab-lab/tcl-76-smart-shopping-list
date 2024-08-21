import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import { createList, useAuth } from '../api';
// import { useNavigate } from "react-router-dom";
// import { useStateWithStorage } from './utils';

export function Home({ data, setListPath }) {
	const [listName, setListName] = useState('');
	const [error, setError] = useState('');
	const { user } = useAuth();
	const userId = user?.uid;
	const userEmail = user?.email;
	// const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			await createList(userId, userEmail, listName);
			// console.log(createList(userId, userEmail, listName))
			//setListPath(pathName)
			/* need to pass in the new list path into setListPath, and then it should save to localStorage */
			//save to local storage
			setListName('');
			setError('List saved to database');
			// navigate("/list")
		} catch (error) {
			setListName('')(setError('List Not saved to database'));
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
