import './Home.css';
import { SingleList } from '../components';
export function Home({ data, setListPath }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{/* insert path as prop later */}
				{data &&
					data.map((list) => {
						return (
							<SingleList
								key={list.id}
								name={list.name}
								setListPath={setListPath}
							/>
						);
					})}
			</ul>
		</div>
	);
}
