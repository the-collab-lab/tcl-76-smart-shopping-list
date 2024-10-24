import './SingleList.css';
import { useNavigate } from 'react-router-dom';

export function SingleList({ name, path, setListPath }) {
	const navigate = useNavigate();

	function handleClick() {
		setListPath(path);
		navigate('/list');
	}

	return (
		<li className="SingleList">
			<button
				onClick={handleClick}
				className="font-bold text-white"
				style={{ background: '#676D16' }}
			>
				{name}
			</button>
		</li>
	);
}
