import React from 'react';
import { Link } from 'react-router-dom';

const UsersList = ({ HomeReducer: { users }, type: currentUserType}) => {
	const usersMapper = users && Array.isArray(users) && users.map(({ first_name, type, last_name, email, _id }, i) => {
		if (currentUserType === 'manager' && type === "admin") return;
		return (
			<tr key={_id}>
				<th scope="row">{i + 1}</th>
				<td>{first_name}</td>
				<td>{last_name}</td>
				<td>{email}</td>
				<td><Link to={`/records/${_id}`}>click here to see records</Link></td>
			</tr>
		)
	})
	return usersMapper || [];
};

export default UsersList;