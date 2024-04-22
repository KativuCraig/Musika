const User = require('../Models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/config');

exports.register = async (req, res, next) => {
    const { name, surname, email, username, password } = req.body;
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password is less than 8 characters' })
    }
    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            name,
            surname,
            email,
            username,
            password: hash,
            role: 'Basic'
        })
            .then((user) => {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { id: user._id, username, role: user.role },
                    jwtSecret,
                    {
                        expiresIn: maxAge //3hrs in seconds
                    }
                );
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000 //3hrs in milliseconds
                });

                res.status(200).json({
                    message: 'User created successfully',
                    user
                })
            })
            .catch((error) => {
                res.status(400).json({
                    message: 'User creation failed',
                    error: error.message
                })
            })
    })

}


exports.login = async (req, res, next) => {
    const { username, password, role } = req.body;
    //Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({
            message: 'Username or Password not present'
        })

    }
    try {
        const user = await User.findOne({ username })
        if (!user) {
            res.status(401).json({
                message: 'Login unsuccessful',
                error: 'User not found'
            })
        }
        else {
            //Compare password with the hashed password
            await bcrypt.compare(password, user.password).then((result) => {
                if (result) {
                    const maxAge = 3 * 60 * 60; //3hrs in milliseconds
                    const token = jwt.sign(
                        { id: user._id, username, role: user.role }, jwtSecret, { expiresIn: maxAge * 1000 }
                    );
                    res.cookie('jwt', token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000
                    })
                    res.status(201).json({
                        message: 'Login successful',
                        role: user.role
                    })
                } else {
                    res.status(400).json({ message: 'Login failed' })
                }
            })

        }

    } catch (err) {
        res.status(400).json({
            message: 'An error occured',
            error: err.message
        })
    }
}