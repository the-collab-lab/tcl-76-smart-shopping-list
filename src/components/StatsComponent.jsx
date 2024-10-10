import { useState, useEffect } from 'react';
import { getAllUsersFromDatabase, getTotalListCount } from '../api';

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

	useEffect(() => {
		const fetchListCount = async () => {
			const totalLists = await getTotalListCount();
			setListCount(totalLists);
		};
		fetchListCount();
	}, []);

	return (
		<>
			<div>
				<h3>{userCount} SnapShop users </h3>
				<h3>{listCount} SnapShop lists </h3>
			</div>
		</>
	);
}
