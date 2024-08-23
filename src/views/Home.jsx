import './Home.css';
import { SingleList } from '../components';
export function Home({ data, setListPath }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{data &&
					data.map((list) => {
						console.log('here is list path', list.path);
						return (
							<SingleList
								key={crypto.randomUUID()}
								name={list.name}
								setListPath={setListPath}
								path={list.path}
							/>
						);
					})}
			</ul>
		</div>
	);
}
