import React from 'react';
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import Loader from '../../../Loader/loader';

const LoginForm = ({ onSubmit, validate, loginForm }) => {
    const formikProps = {
        onSubmit,
        validate,
        initialValues: {
            email: (loginForm && loginForm.email) || "",
            password: "",
        },
    };
    return (<Formik {...formikProps}>{({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting, isValidating }) => (
        <div className="login-form">
            <form onSubmit={handleSubmit} encType="multipart/form-data" >
                <h2 className="text-center">Log in</h2>
                <Loader visible={isSubmitting || isValidating} />   
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
                    placeholder="Email"/>
                    {errors.email && touched.email && <span className="form-error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    invalid={ errors.password && touched.password ? true : null }
                    aria-invalid={errors.password && touched.password ? 'true' : 'false'}
                    aria-label="Password"
                    id="password"
                    name="password"
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    value={values.password}
                    className="form-control"
                    placeholder="Password"/>
                    {errors.password && touched.password && <span className="form-error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <button
                    type="submit"
                    className="btn btn-block">Log in</button>
                </div>
                <div className="clearfix">
                    <label className="float-left form-check-label">
                        <input type="checkbox"/> Remember me
                    </label>
                    <Link to="#" className="float-right">Forgot Password?</Link>
                </div>        
            </form>
            <p className="text-center"><Link to="/sign-up">Create an Account</Link></p>
        </div>
        )}</Formik>
    );
};

export default LoginForm;