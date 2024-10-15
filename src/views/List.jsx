import { ListItem } from '../components';
import { useState, useEffect, Fragment } from 'react';
import BasicModal from './Modal';
import { comparePurchaseUrgency } from '../api';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

export function List({ data, userId, path }) {
	const [filterVal, setFilterVal] = useState('');
	const [filteredObject, setFilteredObject] = useState({});
	const [sortedList, setSortedList] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const dataEmpty = userId && !data.length;
	const message = {
		header: 'Tip:',
		promptMSG: 'Your shopping list is empty. Start adding items!',
		btnText: 'Add Items',
	};

	useEffect(() => {
		if (dataEmpty) {
			setTimeout(() => {
				setShowModal(true);
			}, 2000);
		}
	}, []);

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
			<h2 className="py-8">{`${path.slice(path.indexOf('/') + 1)} List`}</h2>
			{showModal && dataEmpty && (
				<BasicModal dataEmpty={dataEmpty} message={message} />
			)}

			<button onClick={addItemNavigate}>
				{' '}
				Add item <AddBoxRoundedIcon fontSize="large" className="text-black" />
			</button>

			<form onSubmit={clearInput} className="py-4">
				<label htmlFor="item-name" aria-label="Search for an item">
					Find Item{' '}
				</label>
				<input
					id="item-name"
					name="item-name"
					type="text"
					value={filterVal}
					onChange={(e) => setFilterVal(e.target.value)}
					placeholder="e.g. Apple"
				/>
				<SearchRoundedIcon />
				{filterVal && <button>Clear</button>}
			</form>

			<ul className="space-y-2">
				{filteredObject &&
					Object.entries(filteredObject).map(([timeBucket, list]) => (
						<Fragment key={crypto.randomUUID()}>
							<div>
								<h3>{labels[timeBucket]}</h3>
							</div>
							{list.map((item) => (
								<ListItem item={item} key={crypto.randomUUID()} />
							))}
						</Fragment>
					))}
			</ul>
		</>
	);
}
