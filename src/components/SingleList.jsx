import './SingleList.css';

export function SingleList({ name, path, setListPath }) {
	function handleClick() {
		setListPath(path);
	}

	return (
		<li className="SingleList">
			<button onClick={handleClick}>{name}</button>
		</li>
	);
}
