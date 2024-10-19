import './Home.css';
import { SingleList, ShareListComponent } from '../components';
import {
	createList,
	useAuth,
	deleteList,
	unfollowList,
	SignInButton,
} from '../api';
import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoiceToText } from '../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'; //remove shopping list that are being shared with

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
				alert('Your list has been added!');
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

	const handleUnfollowSharedList = async (list) => {
		try {
			if (
				window.confirm(
					`Are you sure you want to remove ${list.name} from your shopping lists?`,
				)
			) {
				await unfollowList(userEmail, list.path);
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
		<>
			{data.length ? (
				<div className="flex flex-col h-[80vh]  my-8 p-8 rounded-3xl shadow-xl overflow-hidden mx-auto  bg-neutral">
					<ul className="font-archivo flex-grow overflow-y-auto space-y-4 ">
						{data &&
							data.map((list) => {
								const uniqueId = crypto.randomUUID();
								return (
									<Fragment key={uniqueId}>
										<div
											className="flex items-center justify-between p-4 rounded-3xl shadow-md border border-primary"
											style={{ background: '#f8fdef' }}
										>
											<SingleList
												name={list.name}
												setListPath={setListPath}
												path={list.path}
											/>
											<div className="flex items-center space-x-4">
												{!list.isShared && (
													<button
														onClick={() => handleDelete(list)}
														aria-label="Delete this shopping list"
													>
														<DeleteIcon />
													</button>
												)}

												{/* Remove button for shared lists */}
												{list.isShared && (
													<button
														onClick={() => handleUnfollowSharedList(list)}
														aria-label="Remove this shared list"
													>
														<RemoveCircleIcon />
													</button>
												)}
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
						onSubmit={handleSubmit}
						className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 justify-center"
					>
						<label htmlFor="listName" className="text-white font-medium">
							Create a new list:
						</label>
						<div className="flex flex-col">
							<input
								type="text"
								id="listName"
								value={listName}
								onChange={(e) => setListName(e.target.value)}
							/>
							<span className="text-error">{error}</span>
						</div>

						<button
							type="button"
							onClick={startListening}
							aria-label="Use microphone to add a new list"
							className="bg-accent text-black hover:bg-third"
						>
							{isListening ? 'Listening...' : <KeyboardVoiceIcon />}
						</button>
						<button className="bg-accent text-black hover:bg-third">
							Submit
						</button>
					</form>
				</div>
			) : (
				<div className="flex flex-col h-[80vh]  my-8 p-8 rounded-3xl overflow-hidden mx-auto place-content-center items-center ">
					<h1 className="text-center my-8 text-neutral text-6xl">
						{' '}
						Welcome to SnapShop!
					</h1>
					<SignInButton styles={'bg-neutral text-white btn-lg text-2xl'} />
				</div>
			)}
		</>
	);
}
