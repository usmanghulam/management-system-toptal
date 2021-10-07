import React, { Component, Fragment } from 'react';
import * as Yup from 'yup';
import CanUseDom from 'can-use-dom';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SignupForm from '../components/SignupForm';
import Notifications from '../../../notifications/container/notifications';
import { getCookie, setCookie } from '../../../utils/cookie';
import { SignUpAsync } from '../actions'
import "../../../scss/users.scss";

class signup extends Component {
	constructor(props) {
		super(props);
		let cookie = "";
		let signUpForm = "";
		try {
			if (CanUseDom) {
				cookie = getCookie('__signup_form');
				signUpForm = cookie ? JSON.parse(cookie) : {};
			}
		} catch (error) {
			console.error(error)
		}
		this.state = {
			signUp: signUpForm,
		}
	}
    onSubmit = (values, { setSubmitting, resetForm }) => {
		try {
			const { dispatch, history } = this.props;
			const callback = res => {
					setSubmitting(false)
				if (res.message && res.message.type === "success") {
					resetForm();
					setCookie('__user__token', JSON.stringify(res.data.jwtToken), 1);
					history.push('/');
				}
			}
			dispatch(SignUpAsync(values, callback));
		} catch (error) {
			console.error('signup', error);
		}
	}
    validate = (values) => {
		const errors = {};
		const schemaRules = {
			first_name: Yup.string().trim().required('First Name is Required'),
			last_name: Yup.string().trim().required('Last Name is Required'),
			email: Yup.string().trim().email('Invalid Email').required("Email is Required"),
			password: Yup.string().min(6).max(25).trim('Password is Required').required('Password is Required'),
			confirm_password: Yup.string().required("Confirm Password is Required.").when("password", {
				is: function () {
				  function is(password) {
					return password && password.length > 0 ? true : false;
				  }
  
				  return is;
				}(),
				then: Yup.string().oneOf([Yup.ref('password')], "Password doesn't match")
			}),
			privacy_policy: Yup.boolean()
			.required("The Terms and Conditions must be Accepted.")
			.oneOf([true], "The Terms and Conditions must be Accepted."),
		}

		const schema = Yup.object().shape(schemaRules);
		setCookie('__signup_form', JSON.stringify(values), 1);
		try {
			schema.validateSync(values, { abortEarly: false });
		} 
		catch (err) {
			err.inner.forEach((er) => { errors[er.path] = er.message; });
		}
		return errors;
	}
    render() {
        return (
			<Fragment>
				<Notifications />
				<SignupForm onSubmit={this.onSubmit} validate={this.validate} signUpForm={this.state.signUp} />
			</Fragment>
        );
    }
}
const mapStatetoProps = state => ({
	...state,
})

export default withRouter(connect(mapStatetoProps)(signup));