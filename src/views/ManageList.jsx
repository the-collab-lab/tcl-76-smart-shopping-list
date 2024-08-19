import { useState } from 'react';

export function ManageList() {
	const [formData, setFormData] = useState({
		name: '',
		frequency: '',
	});

	function handleChange(e) {
		e.preventDefault();
		console.log(e.target.value);
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}

	function handleSubmit() {
		e.preventDefault();
		console.log('here is form submission', formData);
	}

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>

			<div className="manage-list-form">
				<form onSubmit={handleSubmit}>
					{/* // name of item
						// days until next purchase: soon, kind of soon, not soon
						// label feature */}

					<label htmlFor="name">Name of item</label>
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
						<option value="soon">Soon (7 days)</option>
						<option value="kind-of-soon">Kind of Soon (14 Days)</option>
						<option value="not-soon">Not Soon (30 Days)</option>
					</select>

					<button type="submit">Submit</button>
				</form>
			</div>
		</>
	);
}
