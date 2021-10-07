import React, { Fragment, useState } from 'react';
import { Formik } from 'formik';
import { Collapse, Button } from 'reactstrap';
import * as Yup from 'yup';
import DateInput from './DateInput';

const Filter = ({ applyFilterHandler }) => {
	const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
	const SignupSchema = Yup.object().shape({
		from: Yup.string().required('Field Required'),
		to: Yup.string().required('Field Required'),
	});
	return (
		<Formik
			onSubmit ={(values) => {
				applyFilterHandler(values);
			}}
			validationSchema={SignupSchema}
			initialValues = {{
				from: "",
				to: "",
			}}
			>
				{({ values, handleSubmit, handleBlur, handleChange, errors, touched, setFieldValue }) => (
					<Fragment>
					<div className="float-right mt-3">
						<Button color="btn-outline-dark" onClick={toggle} style={{ marginBottom: '1rem' }}><i className='fas fa-arrow-alt-circle-down'></i></Button>
					</div>
						<Collapse isOpen={isOpen}>
							<form className="mt-3" onSubmit={handleSubmit}>
								<div className="form-row">
									<div className="form-group col-md-5">
										<DateInput {...{values, handleSubmit, handleBlur, setFieldValue, handleChange, errors, touched}} id="from" />
										{errors.from && touched.from && <span className="form-error">{errors.from}</span>}
									</div>
									<div className="form-group col-md-5">
										<DateInput {...{values, handleSubmit, handleBlur, setFieldValue, handleChange, errors, touched}} id="to" />
										{errors.to && touched.to && <span className="form-error">{errors.to}</span>}
									</div>
									<div className="form-group col-md-2">
									<button type="submit" 
										className="btn btn-dark"> Filter </button>
									</div>
								</div>
							</form>
						</Collapse>
					</Fragment>
				)}
			</Formik>
	);
};

export default Filter;