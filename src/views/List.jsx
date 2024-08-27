import { ListItem } from '../components';
import { useState, useEffect } from 'react';

export function List({ data }) {
	const [filterVal, setFilterVal] = useState('');
	let filteredItems = data;

	const filter = filteredItems.filter((x) => x.name.startsWith(filterVal));

	function renderList() {
		for (let item of filteredItems) {
			return <p>{item.name}</p>;
		}
	}

	useEffect(() => {
		//  console.log(data.map((item) => {
		// 	Object.item.name
		//  }))

		for (let item of data) {
			if (item.name.startsWith(filterVal)) {
				filteredItems.push(item);
				// console.log(item.name)
			}
		}

		// let filteredData = data.filter(item => item.name.includes(filterVal) )

		// console.log(filteredItems)
	}, [filterVal]);

	const clearInput = (e) => {
		e.preventDefault();
		setFilterVal('');
	};

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
				<button>Clear</button>
			</form>

			<ul>
				{data &&
					data.map((list) => {
						return <ListItem key={list.id} name={list.name} />;
					})}
			</ul>

			{/* Filtering item search results in progress:  */}

			{/* <ul>
				{filter &&
					filter.map((list) => {
						return <ListItem key={list.id} name={list.name} />;
					})}
			</ul> */}
		</>
	);
}
