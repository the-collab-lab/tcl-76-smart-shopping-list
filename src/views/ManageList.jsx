import { useState } from 'react';

export function ManageList() {
	// const [formData, setFormData] = useState(false);

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>

			<div className="manage-list-form">
				<form>
					{/* // name of item
						// days until next purchase: soon, kind of soon, not soon
						// label feature */}

					<label htmlFor="name">Name of item</label>
					<input type="text" name="name-of-item" id="name-of-item"></input>

					<label htmlFor="frequency">
						When will you need this item again?:
					</label>

					<select id="frequency">
						<option value="soon">Soon (7 days)</option>
						<option value="kind-of-soon">Kind of Soon (14 Days)</option>
						<option value="not-soon">Not Soon (30 Days)</option>
					</select>
				</form>
			</div>
		</>
	);
}
