import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, Layout, List, ManageList, ShareList } from './views';

import { useAuth, useShoppingListData, useShoppingLists } from './api';

import { useStateWithStorage } from './utils';

import { useState, useEffect } from 'react';

export function App() {
	/**
	 * This custom hook takes the path of a shopping list
	 * in our database and syncs it with localStorage for later use.
	 * Check ./utils/hooks.js for its implementation.
	 *
	 * We'll later use `setListPath` when we allow a user
	 * to create and switch between lists.
	 */
	const [listPath, setListPath] = useStateWithStorage(
		'tcl-shopping-list-path',
		null,
	);

	/**
	 * This custom hook holds info about the current signed in user.
	 * Check ./api/useAuth.jsx for its implementation.
	 */
	const { user } = useAuth();
	const userId = user?.uid;
	const userEmail = user?.email;

	/**
	 * This custom hook takes a user ID and email and fetches
	 * the shopping lists that the user has access to.
	 * Check ./api/firestore.js for its implementation.
	 */
	const lists = useShoppingLists(userId, userEmail);
	/**
	 * This custom hook takes our token and fetches the data for our list.
	 * Check ./api/firestore.js for its implementation.
	 */
	const data = useShoppingListData(listPath);

	const [allLists, setAllLists] = useState([]);

	useEffect(() => {
		if (lists) {
			setAllLists(lists);
		}
	}, [lists]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							<Home
								data={allLists}
								setListPath={setListPath}
								setAllLists={setAllLists}
							/>
						}
					/>
					<Route
						path="/list"
						element={<List data={data} path={listPath} userId={userId} />}
					/>
					<Route
						path="/manage-list"
						element={<ManageList userId={userId} list={data} />}
					/>
					<Route
						path="/share-list"
						element={<ShareList userId={userId} list={data} />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}
