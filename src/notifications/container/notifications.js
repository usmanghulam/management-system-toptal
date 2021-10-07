import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';
import { connect } from "react-redux";
import { clearNotification } from "../actions";

const AlertExample = props => {
  const { type, text } = props;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (text) {
        setVisible(true);
        setTimeout(() => {
            onDismiss();
            clearNotifications();
        }, 3000);
    }
  }, [text]);

  const clearNotifications = () => {
      const { dispatch } = props;
      dispatch(clearNotification());
  }
  const onDismiss = () => setVisible(false);

  return (
    <div className="notifications">
      <Alert color={type === "error" ? 'danger': "success"} isOpen={visible} toggle={onDismiss}>
        <p className="text-center">{text}</p>
      </Alert>
    </div>
  );
}
const mapStateToProps = state => ({
    ...state.notificationReducer,
});
export default connect(mapStateToProps)(AlertExample);