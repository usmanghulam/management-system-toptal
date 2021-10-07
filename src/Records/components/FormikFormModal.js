import React from 'react';
import { Modal } from 'react-responsive-modal';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import DateInput from './DateInput';


const FormikForm = ({ openModal, setOpenModal, record, addRecordHandler, editRecordHandler, fieldsValidate }) => {
	return (
		<Modal open={openModal} onClose={() => setOpenModal(false)} center>
			<Formik
			validate={fieldsValidate}
			onSubmit ={(values) => {
				let event = Boolean(record && Object.keys(record).length > 0);
				if (event) {
					editRecordHandler({...record, ...values});
				} else {
					addRecordHandler(values);
				}
			}}
			initialValues = {{
				date: (record && record.date) || "",
				Note1: (record && record.Note1) || "",
				Note2: (record && record.Note2) || "",
				Note3: (record && record.Note3) || "",
				totalhour: (record && record.totalhour) || "",
			}}
			>
				{({ values, handleSubmit, handleBlur, handleChange, errors, touched, setFieldValue }) => (
					<form onSubmit={handleSubmit}>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="date">Date</label>
								<DateInput {...{values, handleSubmit, handleBlur, setFieldValue, handleChange, errors, touched}} id="date" />
								{errors.date && touched.date && <span className="form-error">{errors.date}</span>}
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="totalhour">Total Hours</label>
								<input 
								type="text" 
								className="form-control" 
								id="totalhour" 
								name="totalhour"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.totalhour}
								placeholder="Total Hours"/>
								{errors.totalhour && touched.totalhour && <span className="form-error">{errors.totalhour}</span>}
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="Note1">Note 1</label>
							<input 
							type="text" 
							name="Note1" 
							className="form-control" 
							id="Note1"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.Note1}/>
							{errors.Note1 && touched.Note1 && <span className="form-error">{errors.Note1}</span>}
						</div>
						<div className="form-group">
							<label htmlFor="Note2">Note 2</label>
							<input 
							type="text" 
							name="Note2" 
							className="form-control" 
							id="Note2"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.Note2}/>
							{errors.Note2 && touched.Note2 && <span className="form-error">{errors.Note2}</span>}
						</div>
						<div className="form-group">
							<label htmlFor="Note3">Note 3</label>
							<input 
							type="text" 
							name="Note3" 
							className="form-control" 
							id="Note3"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.Note3}/>
							{errors.Note3 && touched.Note3 && <span className="form-error">{errors.Note3}</span>}
						</div>
						<button 
						type="submit" 
						className="btn btn-dark">
						{Boolean(record && Object.keys(record).length > 0) ? 'Update Record' : 'Add Record'}
						</button>
					</form>
				)}
			</Formik>
		</Modal>
	);
};

FormikForm.propTypes = {
	openModal: PropTypes.bool.isRequired,
	setOpenModal: PropTypes.func.isRequired,
	record: PropTypes.array.isRequired,
	addRecordHandler: PropTypes.func.isRequired,
	editRecordHandler: PropTypes.func.isRequired,
	fieldsValidate: PropTypes.func.isRequired,
};
FormikForm.defaultProps = {
	openModal: false,
	setOpenModal: () => {},
	record: [],
	addRecordHandler: () => {},
	editRecordHandler: () => {},
	fieldsValidate: () => {},
};

export default FormikForm;