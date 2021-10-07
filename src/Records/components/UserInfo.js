import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import AddPerDayHours from './AddPerDayHours';

const UserInfo = ({ perdayhour, submitHoursHander, first_name, last_name, email }) => {
	const [open, setOpen] = useState(false);
	return (
		<Fragment>
			<div className="">
				<div className="mt-2">
					<p>Name: <span>{first_name} {last_name}</span></p>
				</div>
				<div className="">
					<p>Email: <span>{email}</span></p>
				</div>
				<div className="">
					<div className="float-left">
						<p>Hours Per Day: <span>{perdayhour}</span></p>
					</div>
					<div className="float-right">
						<button className="btn btn-dark settingbtn" onClick={() => setOpen(true)} type="button"><i className="fa fa-gears"></i></button>
					</div>
				</div>
			</div>
			<AddPerDayHours {...{ open, setOpen, perdayhour, submitHoursHander }} />
		</Fragment>
	);
};

UserInfo.propTypes = {
	perdayhour: PropTypes.string.isRequired,
	submitHoursHander: PropTypes.func.isRequired,
	first_name: PropTypes.string.isRequired,
	last_name: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
};
UserInfo.defaultProps = {
	perdayhour: 8,
	submitHoursHander: () => {},
	first_name: "",
	last_name: "",
	email: ""
};

export default UserInfo;