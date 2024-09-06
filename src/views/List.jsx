import { ListItem } from '../components';
import { useState, useEffect } from 'react';

export function List({ data }) {
	const [filterVal, setFilterVal] = useState('');
	const [filteredList, setFilteredList] = useState([]);

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
					filteredList.map((item) => {
						return <ListItem key={item.id} item={item} />;
					})}
			</ul>
		</>
	);
}
