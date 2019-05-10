module.exports = {
    mongoDbUrl : 'mongodb://localhost:27017/sensorreaderdb',
    PORT: process.env.port || 3000,
    globalVariables: (req,res,next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');

        next();
    }
};