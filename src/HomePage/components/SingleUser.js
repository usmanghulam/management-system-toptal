import React from 'react';
import { Link } from 'react-router-dom';

const SingleUser = ({ first_name, last_name, email, _id }) => (
	<tr>
		<th scope="row">1</th>
		<td>{first_name}</td>
		<td>{last_name}</td>
		<td>{email}</td>
		<td><Link to={`/records/${_id}`}>click here to see records</Link></td>
	</tr>
);

export default SingleUser;