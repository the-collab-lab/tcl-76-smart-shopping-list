import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import { useAuth, SignInButton, SignOutButton } from '../api';

const handleActive = ({ isActive }) => {
	return {
		fontWeight: isActive ? '900' : '',
		color: isActive ? 'rgb(237 208 0)' : 'white',
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
							<NavLink to="/" style={handleActive}>
								<h1 className="font-extrabold text-accent">SnapShop</h1>
							</NavLink>
						</div>

						{/* Navbar on Desktop */}
						<div className="space-x-8 hidden sm:block">
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

				<footer className="footer bg-neutral text-center flex items-center justify-center py-10">
					<div className="text-center">
						<p className="text-xl font-extrabold  text-[#e8c900]">
							<span>Developed by: </span>
							<a
								href="https://www.linkedin.com/in/binmaemma/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[#e8c900] no-underline hover:underline"
							>
								Emma Ma
							</a>
							,
							<a
								href="https://www.linkedin.com/in/sarah-mko/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[#e8c900] no-underline hover:underline"
							>
								{' '}
								Sarah Mekonnen
							</a>
							,
							<a
								href="https://www.linkedin.com/in/codemarcos/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[#e8c900] no-underline hover:underline"
							>
								{' '}
								Marcos Perez
							</a>
							,
							<a
								href="https://www.linkedin.com/in/allison-randel/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[#e8c900] no-underline hover:underline"
							>
								{' '}
								Allison Randel{' '}
							</a>
							<span className="ml-8">Special thanks to our mentors: </span>
							<a
								href="https://www.linkedin.com/in/nathanejbrown/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[#e8c900] no-underline hover:underline"
							>
								Nathan Brown
							</a>
							,
							<a
								href="https://www.linkedin.com/in/devin-jaggernauth/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[#e8c900] no-underline hover:underline"
							>
								{' '}
								Devin Jaggernauth
							</a>
							,
							<a
								href="https://www.linkedin.com/in/mindyzwan/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[#e8c900] no-underline hover:underline"
							>
								{' '}
								Mindy Zwanziger
							</a>
						</p>
					</div>
				</footer>
			</div>
		</>
	);
}
// style={{background:'#969877'}}
