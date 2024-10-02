import './Home.css';
import { SingleList } from '../components';
import { createList, useAuth, deleteList } from '../api';
import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoiceToText } from '../utils';

export function Home({ data, setListPath, setAllLists }) {
	const [listName, setListName] = useState('');
	const [error, setError] = useState('');
	const { user } = useAuth();
	const userId = user?.uid;
	const userEmail = user?.email;
	const navigate = useNavigate();
	const { text, isListening, startListening } = useVoiceToText();

	useEffect(() => {
		if (text) {
			setListName(text);
		}
	}, [text]);

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
			if (window.confirm(`Are you sure you want to delete ${list.name}?`)) {
				await deleteList(userEmail, list.path);
				const updatedData = data.filter(
					(eachList) => eachList.path !== list.path,
				);

				setAllLists(updatedData);
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
			<ul className="font-archivo">
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
				<button type="button" onClick={startListening}>
					{isListening ? 'Listening...' : 'Start Voice Input'}
				</button>
				<button>Submit</button>
				<p>{error}</p>
			</form>
		</div>
	);
}
