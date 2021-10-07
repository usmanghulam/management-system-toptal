import React, { Fragment } from 'react';
import SingleUser from './SingleUser';
import UsersList from './UsersList';

const UsersTable = props => {
	const { type, logoutHandler } = props;
	return (
		<Fragment>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">First</th>
						<th scope="col">Last</th>
						<th scope="col">Email</th>
						<th scope="col"><button onClick={logoutHandler} className="btn btn-outline-primary btn-sm logoutbtn">Logout</button></th>
					</tr>
				</thead>
				<tbody>
					{type === "user" ? <SingleUser {...props} /> : <UsersList {...props} />}
				</tbody>
			</table>
		</Fragment>
	);
};

export default UsersTable;