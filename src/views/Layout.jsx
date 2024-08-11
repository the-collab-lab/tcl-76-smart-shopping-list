import { Outlet } from 'react-router-dom';

import './Layout.css';
import { auth } from '../api/config.js';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<div className="Nav-container">
						<a href="#" className="Nav-link">
							Home
						</a>
						<a href="#" className="Nav-link">
							List
						</a>
						<a href="#" className="Nav-link">
							Manage List
						</a>
					</div>
				</nav>
			</div>
		</>
	);
}
