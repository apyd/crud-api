export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT'
}

export const ERROR_MESSAGE = {
  INVALID_USER_ID: 'Please provide a valid userId. It should be a string 36 characters long.',
  USER_NOT_FOUND: 'User not found',
  INVALID_USER_DATA: 'Please provide all needed data such as username, age and hobbies. All these fields are required.',
  INVALID_ROUTE: 'Invalid API url. Please verify API url and try again.',
  INVALID_REQUEST_TYPE: 'Invalid request type. Please use GET, POST, PUT or DELETE.'
}

export const ROUTES = {
  USERS: '/api/users'
}