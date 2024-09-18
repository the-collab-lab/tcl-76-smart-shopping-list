import { ListItem } from '../components';
import { useState, useEffect } from 'react';
import BasicModal from './Modal';
import { comparePurchaseUrgency } from '../api';

export function List({ data, userId }) {
	const [filterVal, setFilterVal] = useState('');
	const [filteredList, setFilteredList] = useState([]);
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
		// const { soon, kindOfSoon, notSoon, inactive } = comparePurchaseUrgency(data)
		setSortedList(comparePurchaseUrgency(data));
	}, [data]);

	// useEffect(() => {
	// 	comparePurchaseUrgency(data);
	// 	// setFilteredList(
	// 	// 	data.filter((item) =>
	// 	// 		item.name.toLowerCase().includes(filterVal.toLowerCase()),
	// 	// 	),
	// 	// );

	// 	// {
	// 	// 	'soon', [....],
	// 	// 	'kindOfSoon', [...]
	// 	// }
	// 	// const filteredObject = {}

	// // 	Object.entries(sortedList).forEach([timeBucket, list]) => {
	// // 		filteredObject[timeBucket] = list.filter()
	// // 	}
	// // 	setFilteredObject(filteredObject)
	// }, [filterVal, data]);

	// useEffect(() => {
	// 	setFilteredList(comparePurchaseUrgency(data))
	// }, [data]);

	// console.log(filteredList)

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			{showModal && dataEmpty && (
				<BasicModal dataEmpty={dataEmpty} message={message} />
			)}

			<button onClick={() => comparePurchaseUrgency(data)}>CHECK FN</button>

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

			{/* <ul>
				{filteredList &&
					filteredList.map((item) => {
						return <ListItem key={item.id} item={item} />;
					})}
			</ul> */}
			{/* {console.log(sortedList.forEach(x => x))} */}
			<ul>
				{sortedList &&
					sortedList.map((item) => {
						return <ListItem key={item.id} item={item} />;
					})}
			</ul>
		</>
	);
}
