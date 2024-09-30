import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import { useAuth, SignInButton, SignOutButton } from '../api';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

const handleActive = ({ isActive, isPending }) => {
	return {
		fontWeight: isActive ? 'bold' : '',
		color: isPending ? 'red' : 'black',
	};
};

export function Layout() {
	const { user } = useAuth();

	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
				</header>
				<nav className="Nav">
					<div className="Nav-container">
						<NavLink to="/" style={handleActive}>
							Home
						</NavLink>

						<NavLink to="/list" style={handleActive}>
							List
						</NavLink>

						<NavLink to="/manage-list" style={handleActive}>
							Manage List
						</NavLink>
					</div>
				</nav>
				<main className="Layout-main">
					{user ? <SignOutButton /> : <SignInButton />}
					<Outlet />
				</main>
			</div>
		</>
	);
}
