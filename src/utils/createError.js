exports.createError = (errorStatus, message) =>{
    const error = new Error(message);
    error.status = errorStatus;
    return error;
}