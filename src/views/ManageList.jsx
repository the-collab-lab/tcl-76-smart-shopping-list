import { useState } from 'react';
import { addItem, shareList } from '../api';

export function ManageList({ userId, data }) {
	const [formData, setFormData] = useState({
		name: '',
		frequency: '',
	});

	const [email, setEmail] = useState('');
	function handleChange(e) {
		e.preventDefault();
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}
	function handleEmailChange(e) {
		e.preventDefault();
		setEmail(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (formData.name.trim() === '') {
			window.alert('Item name cannot be empty.');
			return;
		}

		const listPath = localStorage.getItem('tcl-shopping-list-path');

		if (!listPath) {
			window.alert('List is not existed.');
			return;
		}

		const formDataCheck = formData.name
			.replace(/[^A-Z0-9]/gi, '')
			.toLowerCase();

		// if "exact" match found, alert user exit handleSubmit early, don't add to database/ dont edit similar item and its timestamp
		// checks if form data is a match without whitespace and regardless of case
		if (
			data.find(
				(item) =>
					item.name.trim().toLowerCase() === formData.name.trim().toLowerCase(),
			)
		) {
			window.alert(`${formData.name} already exists in your list`);
			return;
		}

		// check for not-so-exact matches - gives users a choice
		for (const item of data) {
			// use regex to find mutliple edge cases for characters and spaces throughout string
			const itemCheck = item.name.replace(/[^A-Z0-9]/gi, '').toLowerCase();
			if (
				itemCheck === formDataCheck ||
				formDataCheck.includes(itemCheck) ||
				itemCheck.includes(formDataCheck)
			) {
				// if detected give user option to add if theyd like
				if (
					!window.confirm(
						`A similar item is already on your list. Do you still want to add ${formData.name}?`,
					)
				) {
					// if they don't confirm exit out of handlesubmit - item not saved
					return;
				} else {
					// leave loop and add item
					break;
				}
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
			})
			.catch((error) => {
				window.alert(`${formData.name} failed to add to your list.`);
				console.error('Error:', error);
			});
	}

	async function handleEmailSubmit(e) {
		e.preventDefault();
		const listPath = localStorage.getItem('tcl-shopping-list-path');
		try {
			const result = await shareList(listPath, userId, email);
			window.alert(result.response);
			setEmail('');
		} catch (error) {}
	}

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>

			<div className="manage-list-form">
				<form onSubmit={handleSubmit}>
					<label htmlFor="name">Name of item:</label>
					<input
						type="text"
						name="name"
						id="name-of-item"
						value={formData.name}
						onChange={handleChange}
						required
					></input>

					<label htmlFor="frequency">
						When will you need this item again?:
					</label>

					<select
						id="frequency"
						value={formData.frequency}
						name="frequency"
						onChange={handleChange}
						required
					>
						<option value="" disabled>
							Select your option
						</option>
						<option value="7">Soon (7 days)</option>
						<option value="14">Kind of Soon (14 Days)</option>
						<option value="30">Not Soon (30 Days)</option>
					</select>

					<button type="submit">Submit</button>
				</form>

				<form onSubmit={handleEmailSubmit}>
					<label htmlFor="invite-email">Invite user by email:</label>
					<input
						id="invite-email"
						type="email"
						name="email"
						value={email}
						onChange={handleEmailChange}
						required
					></input>

					<button type="submit">Invite my friend</button>
				</form>
			</div>
		</>
	);
}
