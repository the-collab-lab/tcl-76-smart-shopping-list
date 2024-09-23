import { ListItem } from '../components';
import { useState, useEffect } from 'react';
import BasicModal from './Modal';
import { comparePurchaseUrgency } from '../api';

export function List({ data, userId }) {
	const [filterVal, setFilterVal] = useState('');
	const [filteredObject, setFilteredObject] = useState({});
	const [sortedList, setSortedList] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const dataEmpty = userId && !data.length;
	const message = {
		header: 'Tip:',
		promptMSG: 'Your shopping list is empty. Go to Manage List to start!',
		btnText: 'Go to Manage List',
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

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			{showModal && dataEmpty && (
				<BasicModal dataEmpty={dataEmpty} message={message} />
			)}

			<form onSubmit={clearInput}>
				<label htmlFor="item-name">Item name:</label>
				<input
					id="item-name"
					name="item-name"
					type="text"
					value={filterVal}
					onChange={(e) => setFilterVal(e.target.value)}
				/>
				{filterVal && <button>Clear</button>}
			</form>

			<ul>
				{filteredObject &&
					Object.entries(filteredObject).map(([timeBucket, list]) => (
						<>
							<div>
								<h3>{labels[timeBucket]}</h3>
							</div>
							{list.map((item) => (
								<ListItem key={item.id} item={item} />
							))}
						</>
					))}
			</ul>
		</>
	);
}
