import { useState, useEffect } from 'react';
import { getAllUsersFromDatabase } from '../api';

export function StatsComponent() {
	const [userCount, setUserCount] = useState(0);
	const [listCount, setListCount] = useState(0);
	const [itemsCount, setItemsCount] = useState(0);

	useEffect(() => {
		const fetchUserCount = async () => {
			const users = await getAllUsersFromDatabase();
			setUserCount(users);
		};
		fetchUserCount();
	}, []);

	return (
		<>
			<div>
				<h3>{userCount} SnapShop users </h3>
				<h3>{listCount} of Lists </h3>
				<h3>{itemsCount} of Items on a List</h3>
			</div>
		</>
	);
}
