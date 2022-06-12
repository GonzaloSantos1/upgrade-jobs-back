const setError = (errorCode, message) => {
    const error = new Error;
    error.errorCode = errorCode;
    error.message = message;
    return error;
}

module.exports = { setError }