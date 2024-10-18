import './SingleList.css';
import { useNavigate } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';

export function ShareListComponent({ path, setListPath }) {
	const navigate = useNavigate();

	function handleClick() {
		setListPath(path);
		navigate('/share-list');
	}

	return (
		<>
			<button aria-label="Share this item">
				<ShareIcon onClick={handleClick} />
			</button>
		</>
	);
}
