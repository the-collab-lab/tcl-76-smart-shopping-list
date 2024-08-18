import './Home.css';
import { SingleList } from '../components';
export function Home({ data, setListPath, path }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{data &&
					data.map((list) => {
						return (
							<SingleList
								key={crypto.randomUUID()}
								name={list.name}
								setListPath={setListPath}
								path={path}
							/>
						);
					})}
			</ul>
		</div>
	);
}
