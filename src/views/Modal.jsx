import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	fontSize: 20,
};

export default function BasicModal(dataEmpty) {
	const [open, setOpen] = React.useState(dataEmpty);
	const handleClose = () => setOpen(false);
	const navigate = useNavigate();
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h4" component="h2">
						Tip:
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h5">
						Your shopping list is empty. Go to Manage List to start!
					</Typography>
					<Button
						sx={{
							borderRadius: '8px',
							fontSize: '12px',
						}}
						size="large"
						onClick={() => navigate('/manage-list')}
					>
						Go to Manage LIst
					</Button>
				</Box>
			</Modal>
		</div>
	);
}
