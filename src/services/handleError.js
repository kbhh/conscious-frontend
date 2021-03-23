class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

export function handleError(error) {
  if (error.response) {
    let message = "";
    switch(error.response.status) {
      case 401:
        message = error.response.data.message
        break;
      case 400:
        message = error.response.data.message 
        break;
      case 404:
        message = error.response.data.message 
        break;
      default:
        message = error.response.data.message;
    }
    return new AuthenticationError(error.response.status, message);
  } else if (error.request) {
    throw new AuthenticationError(0, 'Etwas stimmt nicht.');
  } else {
    throw new AuthenticationError(
      0,
      'Etwas ist nicht richtig. Bitte versuchen Sie es später noch einmal.'
    );
  }
}
