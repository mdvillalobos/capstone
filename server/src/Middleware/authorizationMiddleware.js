import jwt from 'jsonwebtoken';

const authorizationMiddleware = (userRole) => {
    return (req, res, next) => {
        const { token } = req.cookies;
        
        if(token) {
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
            if(decodeToken.role != userRole) { 
                return res.json({ error: "Permission Denied!" })
            }
            return next();
        }

        return res.json({ error: "Access Denied!.", data: null})
        
    }
}

export default authorizationMiddleware