import React from 'react';

const DateInput = ({ id, errors, touched, setFieldValue, values }) => {
	const checkValue = (str, max) => {
		if (str.charAt(0) !== '0' || str == '00') {
			let num = parseInt(str);
			if (isNaN(num) || num <= 0 || num > max) num = 1;
			str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
		};
		return str;
	};

	const changeHandler = e => {
		let input = e.target.value;
		if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
		let value = input.split('/').map(function(v) {
			return v.replace(/\D/g, '')
		});
		if (value[0]) value[0] = checkValue(value[0], 12);
		if (value[1]) value[1] = checkValue(value[1], 31);
		let output = value.map(function(v, i) {
			return v.length == 2 && i < 2 ? v + ' / ' : v;
		});
		let newValue = output.join('').substr(0, 14);
		setFieldValue(id, newValue);
	};

	const onBlurHandler = e => {
		let input = e.target.value;
		let value = input.split('/').map(function(v, i) {
			return v.replace(/\D/g, '')
		});
		let output = '';
		
		if (value.length == 3) {
			let year = value[2].length !== 4 ? parseInt(value[2]) + 2000 : parseInt(value[2]);
			let month = parseInt(value[0]) - 1;
			let day = parseInt(value[1]);
			let d = new Date(year, month, day);
			if (!isNaN(d)) {
			let dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
			output = dates.map(function(v) {
				v = v.toString();
				return v.length == 1 ? '0' + v : v;
			}).join(' / ');
			};
		};
		setFieldValue(id, output);
	};
	return (
		<input 
			type="text" 
			id={id}
			placeholder="MM/DD/YYYY"
			className={`${errors[id] && touched[id] ? 'invalid ' : ''}input-text dob form-control`}
			name={id}
			onChange={changeHandler}
			value={values[id]}
			onBlur={onBlurHandler}
		/>
	);
};

export default DateInput;