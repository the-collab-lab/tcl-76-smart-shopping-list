import './Home.css';
import { SingleList } from '../components';
import { Fragment, useState } from 'react';
import { createList, useAuth, deleteList } from '../api';
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
			navigate('/list');

			setTimeout(() => {
				alert('List saved to database');
			}, 100);
		} catch (err) {
			setError(err.message);
			console.log(error);
		}
	}

	const handleDelete = async (list) => {
		try {
			console.log('Here is list info', list);
			if (window.confirm(`Are you sure you want to delete ${list.name}?`)) {
				console.log('value of list path', list.path);
				await deleteList(list.path);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{data &&
					data.map((list) => {
						const uniqueId = crypto.randomUUID();
						return (
							<Fragment key={uniqueId}>
								<SingleList
									name={list.name}
									setListPath={setListPath}
									path={list.path}
								/>
								<button onClick={() => handleDelete(list)}>Delete</button>
								<br></br>
								<br></br>
							</Fragment>
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
