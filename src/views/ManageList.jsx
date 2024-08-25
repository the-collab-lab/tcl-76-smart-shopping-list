import { useState } from 'react';
import { addItem } from '../api';

export function ManageList() {
	const [formData, setFormData] = useState({
		name: '',
		frequency: '',
	});

	// const [formSubmitted, setFormSubmitted] = useState(false);

	function handleChange(e) {
		e.preventDefault();
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();

		console.log('here is form submission', formData);

		const listPath = localStorage.getItem('tcl-shopping-list-path');

		if (!listPath) {
			window.alert('List is not existed.');
			return;
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
			</div>
		</>
	);
}
