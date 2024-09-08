import { ListItem } from '../components';
import { useState, useEffect } from 'react';
import BasicModal from './Modal';

export function List({ data, userId }) {
	const [filterVal, setFilterVal] = useState('');
	const [filteredList, setFilteredList] = useState([]);
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
		setFilteredList(
			data.filter((item) =>
				item.name.toLowerCase().includes(filterVal.toLowerCase()),
			),
		);
	}, [filterVal, data]);

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			{showModal && dataEmpty && (
				<BasicModal dataEmpty={dataEmpty} message={message} />
			)}

			<form onSubmit={clearInput}>
				<label htmlFor="item-name"> Item name:</label>
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
				{filteredList &&
					filteredList.map((list) => {
						return <ListItem key={list.id} name={list.name} />;
					})}
			</ul>
		</>
	);
}
