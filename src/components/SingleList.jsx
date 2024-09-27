import './SingleList.css';
import { useNavigate } from 'react-router-dom';

export function SingleList({ name, path, setListPath }) {
	const navigate = useNavigate();

	function handleClick() {
		setListPath(path);
		navigate(`/list/${path}`);
	}

	return (
		<li className="SingleList">
			<button onClick={handleClick}>{name}</button>
		</li>
	);
}
