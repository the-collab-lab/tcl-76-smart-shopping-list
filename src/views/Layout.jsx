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

const handleActive = ({ isActive }) => {
	return {
		fontWeight: isActive ? '900' : '',
		color: isActive ? '#E8C900' : 'rgb(247 253 235 / 68%)',
	};
};

export function Layout() {
	const { user } = useAuth();

	return (
		<>
			<div className="Layout">
				<nav className="Nav navbar bg-neutral">
					<div
						style={{ paddingInline: 'min(5dvw, 3.2rem)' }}
						className="Nav-container bg-neutral"
					>
						<div className=" navbar-start pl-2.5">
							<h1 className="font-extrabold text-accent">SnapShop</h1>
						</div>

						{/* Navbar on Desktop */}
						<div className="space-x-8 navbar-end hidden sm:block">
							<NavLink to="/" style={handleActive}>
								Home
							</NavLink>

							<NavLink to="/list" style={handleActive}>
								List
							</NavLink>

							{user ? <SignOutButton /> : <SignInButton />}
						</div>

						{/* Mobile Screen Icon Dropdown */}
						<div className="space-x-8 dropdown dropdown-bottom dropdown-end sm:hidden  text-accent">
							<button className="btn btn-square btn-ghost ">
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
							<div className="menu menu-md dropdown-content  bg-neutral  rounded-box z-[1]  w-52 p-2 shadow space-y-2">
								<NavLink to="/" style={handleActive} className="text-3xl">
									Home
								</NavLink>

								<NavLink to="/list" style={handleActive} className="text-3xl">
									List
								</NavLink>

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
