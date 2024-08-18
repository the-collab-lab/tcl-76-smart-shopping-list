import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{data &&
					data.map((list) => {
						return <ListItem key={list.id} name={list.name} />;
					})}
			</ul>
		</>
	);
}
