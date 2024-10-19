import { useState, useEffect } from 'react';
import { addItem } from '../api';
import { useVoiceToText } from '../utils';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

export function ManageList({ list }) {
	const [formData, setFormData] = useState({
		name: '',
		frequency: '',
	});

	const { text, isListening, startListening } = useVoiceToText();

	useEffect(() => {
		if (text) {
			setFormData((prev) => ({ ...prev, name: text }));
		}
	}, [text]);

	function handleChange(e) {
		e.preventDefault();
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (formData.name.trim() === '') {
			window.alert('Item name cannot be empty.');
			return;
		}

		const listPath = localStorage.getItem('tcl-shopping-list-path');

		if (!listPath) {
			window.alert('List does not exist.');
			return;
		}

		const formDataCheck = formData.name
			.replace(/[^A-Z0-9]/gi, '')
			.toLowerCase();

		if (
			list.find(
				(item) =>
					item.name.trim().toLowerCase() === formData.name.trim().toLowerCase(),
			)
		) {
			window.alert(`${formData.name} already exists in your list.`);
			return;
		}

		if (
			list.some((item) => {
				const itemCheck = item.name.replace(/[^A-Z0-9]/gi, '').toLowerCase();
				return itemCheck === formDataCheck || formDataCheck.includes(itemCheck);
			})
		) {
			if (
				!window.confirm(
					`A similar item is already on your list. Do you still want to add ${formData.name}?`,
				)
			) {
				return;
			}
		}

		addItem(listPath, {
			itemName: formData.name,
			daysUntilNextPurchase: parseInt(formData.frequency),
		})
			.then(() => {
				window.alert(`${formData.name} has been added to your list.`);
				setFormData({
					name: '',
					frequency: '',
				});
				window.location.href = '/list';
			})
			.catch((error) => {
				window.alert(`${formData.name} failed to add to your list.`);
				console.error('Error:', error);
			});
	}

	// async function handleEmailSubmit(e) {
	// 	e.preventDefault();
	// 	const listPath = localStorage.getItem('tcl-shopping-list-path');
	// 	try {
	// 		const result = await shareList(listPath, userId, email);
	// 		window.alert(result.response);
	// 		setEmail('');
	// 	} catch (error) {}
	// }

	function handleVoiceTransform() {
		if (!isListening) {
			startListening();
		}
	}

	return (
		<>
			<div className="manage-list-form flex flex-col h-[20vh]  my-8 p-8 rounded-3xl shadow-xl overflow-hidden mx-auto bg-neutral ">
				<form onSubmit={handleSubmit}>
					<label htmlFor="name" className="text-white font-medium">
						Name of item:
					</label>
					<input
						type="text"
						placeholder="Type here"
						name="name"
						id="name-of-item"
						value={formData.name}
						onChange={handleChange}
						className="placeholder-zinc-600"
						required
					></input>

					<button
						type="button"
						onClick={handleVoiceTransform}
						className="bg-accent text-black hover:text-black hover:bg-third"
					>
						{isListening ? (
							'Listening...'
						) : (
							<KeyboardVoiceIcon aria-label="Use microphone to add a new item" />
						)}
					</button>

					<br></br>

					<label htmlFor="frequency" className="text-white font-medium">
						When will you need this item again?:
					</label>

					<select
						id="frequency"
						value={formData.frequency}
						name="frequency"
						onChange={handleChange}
						className="text-zinc-600"
						required
					>
						<option value="" disabled>
							Select your option
						</option>
						<option value="7">Soon (7 days)</option>
						<option value="14">Kind of Soon (14 Days)</option>
						<option value="30">Not Soon (30 Days)</option>
					</select>
					<button
						type="submit"
						className="bg-accent text-black hover:text-black hover:bg-third"
					>
						Submit
					</button>
				</form>
			</div>
		</>
	);
}
