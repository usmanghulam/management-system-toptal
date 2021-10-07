import React from 'react';
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import Loader from '../../../Loader/loader';

const SignupForm = ({ onSubmit, validate, signUpForm }) => {
		const formikProps = {
			onSubmit,
			validate,
			initialValues: {
				first_name: (signUpForm && signUpForm.first_name) || "",
				last_name: (signUpForm && signUpForm.last_name) || "",
				email: (signUpForm && signUpForm.email) || "",
				password: "",
				confirm_password: "",
				privacy_policy: (signUpForm && signUpForm.privacy_policy) || false,
			},
		};
    return (<Formik {...formikProps}>{({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting, isValidating }) => (
			<div className="signup-form">
				<form onSubmit={handleSubmit} encType="multipart/form-data" >
					<h2>Sign Up</h2>
					<p>Please fill in this form to create an account!</p>
					<Loader visible={isSubmitting || isValidating} />
					<hr/>
					<div className="form-group">
						<div className="row">
							<div className="col">
								<input 
								type="text"
								invalid={ errors.first_name && touched.first_name ? true : null }
								aria-invalid={errors.first_name && touched.first_name ? 'true' : 'false'}
								aria-label="First Name"
								onChange={handleChange} 
								onBlur={handleBlur} 
								value={values.first_name}
								className="form-control" 
								name="first_name"
								id="first_name"
								placeholder="First Name"/>
								{errors.first_name && touched.first_name && <span className="form-error">{errors.first_name}</span>}
							</div>
							<div className="col">
								<input 
								type="text"
								invalid={ errors.last_name && touched.last_name ? true : null }
								aria-invalid={errors.last_name && touched.last_name ? 'true' : 'false'}
								aria-label="Last Name"
								onChange={handleChange} 
								onBlur={handleBlur} 
								value={values.last_name}
								className="form-control" 
								name="last_name" 
								id="last_name"
								placeholder="Last Name"/>
								{errors.last_name && touched.last_name && <span className="form-error">{errors.last_name}</span>}
							</div>
						</div>        	
					</div>
					<div className="form-group">
						<input 
						type="email"
						invalid={ errors.email && touched.email ? true : null }
						aria-invalid={errors.email && touched.email ? 'true' : 'false'}
						aria-label="Email"
						onChange={handleChange} 
						onBlur={handleBlur} 
						value={values.email}
						id="email"
						className="form-control" 
						name="email"
						placeholder="Email"/>
						{errors.email && touched.email && <span className="form-error">{errors.email}</span>}
					</div>
					<div className="form-group">
					<input 
						type="password" 
						className="form-control"
						invalid={ errors.password && touched.password ? true : null }
						aria-invalid={errors.password && touched.password ? 'true' : 'false'}
						aria-label="Password"
						onChange={handleChange} 
						onBlur={handleBlur} 
						value={values.password}
						id="password"
						name="password" 
						placeholder="Password"/>
						{errors.password && touched.password && <span className="form-error">{errors.password}</span>}
					</div>
					<div className="form-group">
					<input 
						invalid={ errors.confirm_password && touched.confirm_password ? true : null }
						aria-invalid={errors.confirm_password && touched.confirm_password ? 'true' : 'false'}
						aria-label="Confirm_password"
						onChange={handleChange} 
						onBlur={handleBlur} 
						value={values.confirm_password}
						id="confirm_password"
						type="password" 
						className="form-control" 
						name="confirm_password" 
						placeholder="Confirm Password"/>
						{errors.confirm_password && touched.confirm_password && <span className="form-error">{errors.confirm_password}</span>}
					</div>
					<div className="form-group">
						<label className="form-check-label">
							<input
							aria-label="Privacy Policy"
							onChange={handleChange}
							value="1"
							checked={values.privacy_policy}
							id="privacy_policy"
							name="privacy_policy"
							autoComplete="off"
							type="checkbox"/> I accept the <Link to="#">Terms of Use</Link> &amp; <Link to="#">Privacy Policy</Link>
						</label>
						{errors.privacy_policy && touched.privacy_policy && <span className="form-error">{errors.privacy_policy}</span>}
					</div>
					
					<div className="form-group">
						<button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
					</div>
					</form>
					<div className="hint-text">Already have an account? <Link to="/login" >Login here</Link></div>
			</div>
		)}</Formik>
    );
};

export default SignupForm;