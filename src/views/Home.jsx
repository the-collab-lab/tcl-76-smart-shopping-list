import './Home.css';
import { SingleList, ShareListComponent } from '../components';
import { createList, useAuth, deleteList } from '../api';
import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoiceToText } from '../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

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
		<div className="flex flex-col h-[70vh]  my-8 p-8 bg-white rounded-3xl shadow-xl overflow-hidden mx-auto">
			<ul className="font-archivo flex-grow overflow-y-auto space-y-4">
				{data &&
					data.map((list) => {
						const uniqueId = crypto.randomUUID();
						return (
							<Fragment key={uniqueId}>
								<div className="flex items-center justify-between p-4 rounded-3xl shadow-md border">
									<SingleList
										name={list.name}
										setListPath={setListPath}
										path={list.path}
									/>
									<div className="flex items-center space-x-4">
										<button onClick={() => handleDelete(list)} className="p-2">
											<DeleteIcon />
										</button>
										<ShareListComponent
											name={list.name}
											setListPath={setListPath}
											path={list.path}
										/>
									</div>
								</div>
							</Fragment>
						);
					})}
			</ul>
			<form
				action=""
				onSubmit={handleSubmit}
				className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4"
			>
				<label htmlFor="listName">Create a new list:</label>
				<input
					type="text"
					id="listName"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
				/>
				<button type="button" onClick={startListening}>
					{isListening ? 'Listening...' : <KeyboardVoiceIcon />}
				</button>
				<button>Submit</button>
				<p>{error}</p>
			</form>
		</div>
	);
}
