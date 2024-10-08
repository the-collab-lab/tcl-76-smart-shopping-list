import { db } from '../api/config';
import { useState, useEffect } from 'react';

export function StatsComponent() {
	const [userCount, setUserCount] = useState(0);
	const [listCount, setListCount] = useState(0);
	const [itemsCount, setItemsCount] = useState(0);

	// Get # of Users

	// Get # of Lists

	// Get # of Items

	return (
		<>
			<div>
				<h3>{userCount} of Users </h3>
				<h3>{listCount} of Lists </h3>
				<h3>{itemsCount} of Items on a List</h3>
			</div>
		</>
	);
}
