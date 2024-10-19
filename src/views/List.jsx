import { ListItem } from '../components';
import { useState, useEffect, Fragment } from 'react';
import BasicModal from './Modal';
import { comparePurchaseUrgency } from '../api';
import { useVoiceToText } from '../utils';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

export function List({ data, userId, path }) {
	const [filterVal, setFilterVal] = useState('');
	const [filteredObject, setFilteredObject] = useState({});
	const [sortedList, setSortedList] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const { text, isListening, startListening } = useVoiceToText();

	const dataEmpty = userId && !data.length;
	const message = {
		header: 'Tip:',
		promptMSG: 'Your shopping list is empty. Start adding items!',
		btnText: 'Add Items',
		route: '/manage-list',
	};

	useEffect(() => {
		if (dataEmpty) {
			setTimeout(() => {
				setShowModal(true);
			}, 2000);
		}
	}, []);

	useEffect(() => {
		if (text) {
			setFilterVal((prev) => prev + ' ' + text);
		}
	}, [text]);

	function handleChange(e) {
		e.preventDefault();
		setFilterVal(e.target.value);
	}

	const clearInput = (e) => {
		e.preventDefault();
		setFilterVal('');
	};

	useEffect(() => {
		setSortedList(comparePurchaseUrgency(data));
	}, [data]);

	const labels = {
		overdue: 'Overdue (!!!!)',
		soon: 'Soon (!!!)',
		kindOfSoon: 'Kind of soon (!!)',
		notSoon: 'Not soon (!)',
		inactive: 'Inactive Items',
	};

	useEffect(() => {
		const filteredObject = {};
		Object.entries(sortedList).forEach(([timeBucket, list]) => {
			filteredObject[timeBucket] = list.filter((item) =>
				item.name.toLowerCase().includes(filterVal.toLowerCase()),
			);
		});
		setFilteredObject(filteredObject);
	}, [filterVal, sortedList]);

	const addItemNavigate = (e) => {
		e.preventDefault();
		window.location.href = '/manage-list';
	};

	return (
		<>
			{userId ? (
				<Fragment>
					<h2 className="py-8">{`${path.slice(path.indexOf('/') + 1)} List`}</h2>
					{showModal && dataEmpty && (
						<BasicModal dataEmpty={dataEmpty} message={message} />
					)}

					<button
						onClick={addItemNavigate}
						aria-label="Add a new item"
						className="ml-0"
					>
						{' '}
						Add item <AddBoxRoundedIcon fontSize="large" />
					</button>

					<form onSubmit={clearInput} className="py-4 flex items-center">
						<label htmlFor="item-name" aria-label="Search for an item">
							Find Item{' '}
						</label>
						<input
							id="item-name"
							name="item-name"
							type="text"
							value={filterVal}
							onChange={handleChange}
							placeholder="e.g. Apple"
							className="placeholder-zinc-600"
						/>
						<SearchRoundedIcon />
						<button
							type="button"
							onClick={startListening}
							aria-label="Use microphone to find an item on your list"
						>
							{isListening ? 'Listening...' : <KeyboardVoiceIcon />}
						</button>
						{filterVal && <button>Clear</button>}
					</form>
					<div className="flex flex-col h-[60vh] my-8 p-8 rounded-3xl shadow-xl overflow-hidden mx-auto  bg-neutral">
						<ul className="space-y-2 font-archivo flex-grow overflow-y-auto space-y-4 ">
							{filteredObject &&
								Object.entries(filteredObject).map(([timeBucket, list]) => (
									<div
										key={crypto.randomUUID()}
										className="flex flex-col space-y-2"
									>
										<div>
											<h3 className="text-white">{labels[timeBucket]}</h3>
										</div>
										{list.map((item) => (
											<ListItem item={item} key={crypto.randomUUID()} />
										))}
									</div>
								))}
						</ul>
					</div>
				</Fragment>
			) : (
				<div className="flex flex-col h-[80vh]  my-8 p-8 rounded-3xl overflow-hidden mx-auto place-content-center items-center ">
					<h2 className="text-center my-8 text-neutral text-6xl">
						Please login or add items to your list
					</h2>
				</div>
			)}
		</>
	);
}
