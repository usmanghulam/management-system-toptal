import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FormikFormModal from './FormikFormModal';

const Records = props => {
	const { records, setRecordValues, setOpenModal, deleteRecordHandler } = props;
	const tableRow = Array.isArray(records) && records.map((record, i) => {
		const { Note1, Note2, Note3, date, perdayhour, totalhour, userId, _id } = record;
		return (
		<tr className={`${totalhour < perdayhour ? `bg-danger`: `bg-success` } text-white`} key={userId}>
			<th scope="row">{i + 1}</th>
			<td>{`${new Date(date).getMonth()}-${new Date(date).getDay()}-${new Date(date).getFullYear()}`}</td>
			<td>{Note1}</td>
			<td>{Note2}</td>
			<td>{Note3}</td>
			<td>{totalhour}</td>
			<td>
				<button 
				className="btn btn-outline-dark" 
				onClick={() => {
					setRecordValues(record);
					setOpenModal(true)
				}}
				type="submit">Edit</button>
			</td>
			<td>
				<button 
				className="btn btn-outline-dark" 
				onClick={() => deleteRecordHandler(_id)}
				type="submit">Del</button>
			</td>
		</tr>
	)
	})
	return (
		<Fragment>
			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Date</th>
						<th scope="col">Note1</th>
						<th scope="col">Note2</th>
						<th scope="col">Note3</th>
						<th scope="col">Hours</th>
						<th scope="col"></th>
						<th scope="col">
							<button
							onClick={() => setOpenModal(true)}
							className="btn btn-success" 
							type="submit">Add</button>
						</th>
					</tr>
				</thead>
				<tbody>
					{tableRow.length > 0 ? tableRow : <p className="mt-5 text-center text-danger">No Record Found</p>}
				</tbody>
			</table>
			<FormikFormModal {...props} />
		</Fragment>
	);
};

Records.propTypes = {
	records: PropTypes.array.isRequired,
	openModal: PropTypes.bool.isRequired,
	setOpenModal: PropTypes.func.isRequired,
	addRecordHandler: PropTypes.func.isRequired,
	editRecordHandler: PropTypes.func.isRequired,
	deleteRecordHandler: PropTypes.func.isRequired,
};
Records.defaultProps = {
	records: [],
	openModal: false,
	setOpenModal: () => {},
	addRecordHandler: () => {},
	editRecordHandler: () => {},
	deleteRecordHandler: () => {},
};

export default Records;