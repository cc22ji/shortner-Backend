

 const errorMiddleware = (err, req, res, next) => {
    err.message || (err.message = "Some Internal Error xx");
    err.statusCode || (err.statusCode = 500);
    return res.status(err.statusCode).json({ success: false, message: err.message });
};

 const TryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};

module.exports = {errorMiddleware , TryCatch}

