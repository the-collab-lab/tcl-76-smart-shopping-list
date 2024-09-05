import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const style = (theme) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: theme.palette.mode === 'dark' ? '#424242' : 'background.paper',
	color: theme.palette.text.primary,
	boxShadow: 24,
	p: 4,
	fontSize: 20,
});

export default function BasicModal({ dataEmpty }) {
	const [open, setOpen] = React.useState(dataEmpty);
	const handleClose = () => setOpen(false);
	const navigate = useNavigate();
	const theme = useTheme();

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style(theme)}>
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
							color: theme.palette.primary.main,
						}}
						size="large"
						onClick={() => navigate('/manage-list')}
					>
						Go to Manage List
					</Button>
				</Box>
			</Modal>
		</div>
	);
}
