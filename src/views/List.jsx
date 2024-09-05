import { ListItem } from '../components';
import { useState, useEffect } from 'react';
import BasicModal from './Modal';

export function List({ data, userId }) {
	const [filterVal, setFilterVal] = useState('');
	const [filteredList, setFilteredList] = useState([]);

	const clearInput = (e) => {
		e.preventDefault();
		setFilterVal('');
	};

	useEffect(() => {
		console.log(
			'incoming data',
			filteredList,
			Boolean(filteredList),
			Boolean(filteredList.length),
		);
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

			{userId && !data.length && <BasicModal dataEmpty={true} />}

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
