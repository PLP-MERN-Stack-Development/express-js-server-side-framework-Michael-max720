function errorHandler(err, req, res, next) {
    // Log the error details to the console for debugging
    console.error(`[ERROR] ${err.name}: ${err.message}`);

    
    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            error: err.name,
            message: err.message || 'Resource not found',
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: err.name,
            message: err.message || 'Invalid input data',
        });
    }

    
    res.status(err.status || 500).json({
        error: err.name || 'InternalServerError',
        message: err.message || 'Internal Server Error',
    });
}

module.exports = errorHandler;
