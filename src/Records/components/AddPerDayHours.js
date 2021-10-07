import React from 'react';
import { Modal } from 'react-responsive-modal';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

const AddPerDayHours = ({ perdayhour, submitHoursHander, open, setOpen }) => {
	return (
		<Modal open={open} onClose={() => setOpen(false)} center>
			<Formik
			onSubmit ={(values) => {
				submitHoursHander(values);
				setOpen(false);
			}}
			initialValues = {{ perdayhour }}
			>
				{({ values, handleSubmit, handleBlur, handleChange }) => (
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="perdayhour">Add Per Day Hours</label>
							<input 
							type="number" 
							name="perdayhour" 
							className="form-control" 
							id="perdayhour"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.perdayhour}/>
						</div>
						<button type="submit" className="btn btn-dark">ADD</button>
					</form>
				)}
			</Formik>
		</Modal>
	);
};

AddPerDayHours.propTypes = {
	perdayhour:PropTypes.number.isRequired,
	submitHoursHander: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};
AddPerDayHours.defaultProps = {
	perdayhour: 8,
	submitHoursHander: () => {},
	open: false,
	setOpen: () => {},
};

export default AddPerDayHours;