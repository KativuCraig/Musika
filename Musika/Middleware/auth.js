const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/config')

exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Not autorized' })
            } else {
                if (decodedToken.role !== "admin") {
                    return res.status(401).json({ message: 'Not authorized' })
                } else {
                    next();
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: 'Not autorized, token not available' })
    }
}

exports.userAuth = (req, res, next) => {
    //console.log(req.cookies);
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Not autorized abab' })
            } else {
                if (decodedToken.role !== "Basic") {
                    return res.status(401).json({ message: 'Not authorized' })
                } else {
                    next();
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: 'Not autorized, token not available' })
    }
}