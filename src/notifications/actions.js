
export const SET_NOTIFICATIONS = "set/notifications";
export const CLEAR_NOTIFICATIONS = "clear/notications";

export const clearNotification = (payload, callback) => ({ type: CLEAR_NOTIFICATIONS, payload, callback });