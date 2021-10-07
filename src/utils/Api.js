import { create } from 'apisauce';

const Api = create({
    // baseURL: '/api/v2/',
    timeout: 1000,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
    },
});

const MessagesHandler = (response) => {
  try {
    if (!response.ok) {
      return false;
    }
  
    // verify response data is not empty and has error
    if (response.data && response.data.message) {
      window.store.dispatch({
        type: 'set/notifications', payload: response.data.message,
      });
    }
  } catch (error) {
    console.error('notification', error);
  }
};

Api.addRequestTransform((request) => {
    if (['patch', 'post', 'put'].includes(request.method) && window.store) {
      const { jwtToken } = window.store.getState().UserReducer;
      if ((request.data) && (typeof request.data === "object") && jwtToken) {
        request.data['_token'] = jwtToken;
      }
      request.headers['X-JWT-TOKEN'] = jwtToken;
    }
    return request;
});

Api.addRequestTransform((request) => {
    request.headers['x-original-request-uri'] = window.location.href;
    return request;
});

Api.addResponseTransform(MessagesHandler);

export default Api;