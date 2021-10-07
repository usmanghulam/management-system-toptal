import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UsersTable from '../components/UsersTable';
import AlertBox from '../../notifications/container/notifications';
import Loader from '../../Loader/loader';
import { fetcUsers } from '../actions';
import { signoutAsync } from '../../Users/actions';
import { clearCookie } from '../../utils/cookie';
class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
		}
	}

	componentDidMount() {
		try {
			const { UserReducer: { type }, dispatch } = this.props;
			if (type !=='user') {
				this.setIsLoading(true);
				const callback = res => {
					if (res) {
						this.setIsLoading(false);
					}
				}
				dispatch(fetcUsers(callback))
			};
		} catch (error) {
			console.error(error)
		}
	}

	setIsLoading = isLoading => {
		this.setState({ isLoading });
	}

	logout = () => {
		const { history, dispatch } = this.props;
		dispatch(signoutAsync());
		clearCookie('__user__token');
		history.push('/login');
	}

	render() {
		const { UserReducer, HomeReducer } = this.props;
		const { first_name } = UserReducer;
		return (
			<Fragment>
				<div className="container">
					<div className="row">
						<div className="col-8 offset-2">
							<div className="mt-5">
								<div className="userName float-right">
									<h4 color="text-secondary">Welcome <span className="text-primary">{first_name}</span>!</h4>
								</div>
								<div className="UsersTable pt-5 mt-5">
									<UsersTable {...{...UserReducer, HomeReducer}} logoutHandler={this.logout} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<Loader visible={this.state.isLoading || false} />
				<AlertBox/>
			</Fragment>
		);
	}
}

const mapStatetoProps = state => ({
	...state,
	UserReducer: state.UserReducer,
	HomeReducer: state.HomeReducer,
})

export default withRouter(connect(mapStatetoProps)(HomePage));