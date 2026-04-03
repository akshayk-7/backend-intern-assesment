const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.headers['x-user-role'];

        // 401 unauthorized - user is not authenticated
        if (!userRole) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized You must provide an x-user-role header'
            });
        }
        // 403 forbidden - user is authenticated but not authorized
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                staus: 'error',
                message: `Forbidden: The role '${userRole}' does not have permission for this action.`
            });
        }
        next();
    };
};

module.exports = { checkRole };
