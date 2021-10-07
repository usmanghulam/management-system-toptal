import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ visible }) => {
    return (
        !visible ? null : (
            <div className="Loader">
              <div className="loading-overlay" />
              <div className="wrap">
                <div className="loader" />
                <div className="loaderbefore" />
                <div className="circular" />
                <div className="circular another" />
                <div className="text"><h4>Loading...</h4></div>
              </div>
            </div>
        )
    );
};

Loader.propTypes = {
    visible: PropTypes.bool.isRequired,
};
Loader.defaultProps = {
    visible: false,
};

export default Loader;