export const errorTypeFunc = errorCode => {
  switch (errorCode) {
    case 401:
      return 'NOT_AUTHORIZED_ERROR';
    case 404:
      return 'NOT_FOUND_ERROR';
    case 500:
      return 'VALIDATION_ERROR';
    case 501:
      return 'INVALID_ROUTE_URL';
    case 502:
      return 'SERVER_DB_CONNECTION_ERROR';
    default:
      return 'NOT_FOUND_ERROR';
  }
};
