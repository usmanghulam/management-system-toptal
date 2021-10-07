import React, { Component, Fragment } from 'react';
import * as Yup from 'yup';
import CanUseDom from 'can-use-dom';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import { getCookie, setCookie } from '../../../utils/cookie';
import { loginAsync } from '../actions'
import AlertBox from '../../../notifications/container/notifications';
import "../../../scss/users.scss";

class Login extends Component {
    constructor(props) {
		super(props);
		let cookie = "";
		let loginForm = "";
		try {
			if (CanUseDom) {
				cookie = getCookie('__login_form');
				loginForm = cookie ? JSON.parse(cookie) : {};
			}
		} catch (error) {
			console.error(error)
		}
		this.state = {
			login: loginForm,
		}
	}
    onSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
		try {
			const { dispatch, history } = this.props;
			const callback = res => {
					setSubmitting(false)
				if (res.message && res.message.type === "success") {
					resetForm();
					setCookie('__user__token', JSON.stringify(res.data.jwtToken), 1);
					history.push('/');
				}
				if (typeof res.errors === "object") {
					setErrors(res.errors);
				}
			}
			dispatch(loginAsync(values, callback));
		} catch (error) {
            console.error('login', error);
		}
	}
    validate = (values) => {
		const errors = {};
		const schemaRules = {
			email: Yup.string().trim().email('Invalid Email').required("Email is Required"),
			password: Yup.string().min(6).max(25).trim('Password is Required').required('Password is Required'),
		}

		const schema = Yup.object().shape(schemaRules);
		setCookie('__login_form', JSON.stringify(values), 1);
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
				<AlertBox />
				<LoginForm onSubmit={this.onSubmit} validate={this.validate} loginForm={this.state.login} />
			</Fragment>
        );
    }
}
const mapStatetoProps = state => ({
	...state,
})

export default withRouter(connect(mapStatetoProps)(Login));
