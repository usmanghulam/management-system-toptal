import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Yup from 'yup';

import AlertBox from '../../notifications/container/notifications';
import Loader from '../../Loader/loader';
import UserInfo from '../components/UserInfo';
import UserRecords from '../components/Records';
import ExportBtn from '../components/ExportButton';
import Filters from '../components/Filter';
import {
	fetchUserRecords,
	addUserRecord,
	updateUSerRecord,
	deleteUserRecord,
	setPerHours,
	filterUserRecords,
} from '../actions';
import "react-responsive-modal/styles.css";

class Records extends Component {
	constructor(props) {
		super(props);

		this.paramsId = "";
		this.state = {
			isLoading: false,
			openModal: false,
			record: {},
		}
	}

	componentDidMount() {
		try {
			const { dispatch, history } = this.props;
			let pathname = (history && history.location.pathname);
			let params = Boolean(pathname) && pathname.split("/");
			this.paramsId = Array.isArray(params) && params[params.length - 1];
			const callback = res => {
				if (res) this.setIsLoading(false);
			}
			this.setIsLoading(true);
			Boolean(this.paramsId) && dispatch(fetchUserRecords(this.paramsId, callback));
		} catch (error) {
			console.error(error);
		}
	}

	componentDidUpdate() {
		try {
			const { history } = this.props;
			let pathname = (history && history.location.pathname);
			let params = Boolean(pathname) && pathname.split("/");
			this.paramsId = Array.isArray(params) && params[params.length - 1];
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const context = {
			...{...this.state},
			addRecordHandler: this.addRecordHandler,
			editRecordHandler: this.editRecordHandler,
			deleteRecordHandler: this.deleteRecordHandler,
			paramsId: "123",
			setOpenModal: this.setOpenModal,
			setRecordValues: this.setRecordValues,
			fieldsValidate: this.fieldsValidate,
		};
		const { records } = this.props;
		return (
			<Fragment>
				<div className="container">
					<div className="row no-gutter">
						<div className="col-12">
							<Filters applyFilterHandler={this.applyFilterHandler} />
							<UserInfo {...this.props} submitHoursHander={this.submitHoursHander} />
							<UserRecords {...{...this.props, ...context}} />
							{Boolean(records && Array.isArray(records) && records.length > 0) && <ExportBtn />}
						</div>
					</div>	
				</div>
				<Loader visible={this.state.isLoading || false} />
				<AlertBox/>
			</Fragment>
		);
	}

	applyFilterHandler = (values) => {
		this.setIsLoading(true);
		const { dispatch } = this.props;
		const callback = res => {
			if (res.message && res.message.type === "success") this.setOpenModal(false);
			if (res) this.setIsLoading(false);
		}
		let data = {
			userId: this.paramsId,
			...values,
		}
		dispatch(filterUserRecords(data, callback));
	}

	fieldsValidate = values => {
		const errors = {};
		const schemaRules = {
			date: Yup.string().trim().required('Date is Required'),
			totalhour: Yup.string().trim().required('Total hours is Required'),
			Note1: Yup.string().trim().required('Note1 is Required'),
			Note2: Yup.string().trim().required('Note2 is Required'),
			Note3: Yup.string().trim().required('Note3 is Required'),
		}
		const schema = Yup.object().shape(schemaRules);
		try {
			schema.validateSync(values, { abortEarly: false });
		} 
		catch (err) {
			err.inner.forEach((er) => { errors[er.path] = er.message; });
		}
		return errors;
	}

	addRecordHandler = (values) => {
		this.setIsLoading(true);
		const { dispatch, perdayhour } = this.props;
		const callback = res => {
			if (res.message && res.message.type === "success") this.setOpenModal(false);
			if (res) this.setIsLoading(false);
		}
		const record = {
			userId: this.paramsId,
			perdayhour,
			...values,
		}
		dispatch(addUserRecord(record, callback));
	}

	editRecordHandler = (values) => {
		this.setIsLoading(true);
		const { dispatch } = this.props;
		const callback = res => {
			if (res.message && res.message.type === "success") this.setOpenModal(false);
			if (res) this.setIsLoading(false);
		}
		dispatch(updateUSerRecord(values, callback));
	}

	deleteRecordHandler = _id => {
		this.setIsLoading(true);
		const { dispatch } = this.props;
		const callback = res => {
			if (res.message && res.message.type === "success") this.setOpenModal(false);
			if (res) this.setIsLoading(false);
		}
		dispatch(deleteUserRecord({_id}, callback));
	}

	setOpenModal = (val) => {
		this.setState({ openModal: val }, () => {
			if (!val) {
				this.setState({ record: {}});
			}
		})
	};

	setRecordValues = (record) => this.setState({ record });

	submitHoursHander = ({ perdayhour }) => {
		const { dispatch } = this.props;
		dispatch(setPerHours(perdayhour))
	};

	setIsLoading = isLoading => this.setState({ isLoading });
}

const mapStatetoProps = state => ({
	...state.RecordsReducer,
});

export default withRouter(connect(mapStatetoProps)(Records));