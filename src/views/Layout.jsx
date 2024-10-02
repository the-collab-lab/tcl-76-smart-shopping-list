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
				{/* <header className="Layout-header">
				
				</header> */}
				<nav className="Nav navbar">
					<div className="Nav-container">
						<div className=" navbar-start">
							<h1 className="font-extrabold">SnapShop</h1>
						</div>
						{/* Navbar on Desktop */}
						<div className="space-x-8 dropdown navbar-end hidden sm:block ">
							<NavLink to="/" style={handleActive}>
								Home
							</NavLink>

							<NavLink to="/list" style={handleActive}>
								List
							</NavLink>

							{/* <NavLink to="/manage-list" style={handleActive}>
								Manage List
							</NavLink> */}

							{user ? <SignOutButton /> : <SignInButton />}
						</div>

						{/* Mobile Screen Icon Dropdown */}
						<div className="space-x-8 dropdown sm:hidden ">
							<button className="btn btn-square btn-ghost">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="inline-block h-5 w-5 stroke-current"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									></path>
								</svg>
							</button>
							<div className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
								<NavLink to="/" style={handleActive}>
									Home
								</NavLink>

								<NavLink to="/list" style={handleActive}>
									List
								</NavLink>

								{/* <NavLink to="/manage-list" style={handleActive}>
									Manage List
								</NavLink> */}

								{user ? <SignOutButton /> : <SignInButton />}
							</div>
						</div>
					</div>
				</nav>

				<main className="Layout-main">
					<Outlet />
				</main>
			</div>
		</>
	);
}
