const { request } = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


const userController = {
    register: async (request, response) => {
        try {
            const { username, password, name, role } = request.body
            const user = await User.findOne({ username })
            if (user) {
                return response.status(400).json({ message: 'Username already exists' })
            }
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new User({
                username,
                passwordHash,
                name,
                role
            });
            const savedUser = await newUser.save();
            response.json({ message: 'User Registered', user: savedUser })
        }
        catch (error) {
            response.status(500).json({ message: error.message })
        }
    },
    login: async (request, response) => {
        try {
            const { username, password } = request.body

            const user = await User.findOne({ username })
            if (!user) {
                return response.status(400).json({ message: 'Username Not Found' })
            }

            const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
            if (!passwordCorrect) {
                return response.status(400).json({ message: 'Invalid Password' })
            }

            const token = jwt.sign({
                id: user.id,
                username: user.username,
                name: user.name
            }, config.JWT_SECRET)

            //set a cookie with the token
            response.cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
            })

            response.json({ message: 'Login Successfull', token })

        }
        catch (error) {
            response.status(500).json({ message: error.message })
        }
    },
    logout: async (request, response) => {
        try {
            response.clearCookie('token');
            response.json({ message: 'Logout Successful' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getUser: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // find the user by id in the database
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // if the user exists, return the user
            response.json({ message: 'User found', user });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    updateUser: async (request, response) => {
        try {

            const userID = request.userId;
            const { username, name } = request.body;

            const user = await User.findById(userID);

            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            user.username = username ? username : user.username;
            user.name = name ? name : user.name;

            const updateUser = await user.save();

            response.json({ message: 'User updated', user: updateUser });
        }
        catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    deleteUser: async (request, response) => {
        try {
            const userId = request.userId;

            const user = await User.findById(userId);

            if (!user) {
                return response.status(404).json({ message: 'User Id Required' });
            }

            await User.findByIdAndDelete(userId);

            response.clearCookie('token');

            response.json({ message: 'User Deleted' })
        }
        catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getUsers: async (request, response) => {
        try {
            // find all the users in the database
            const users = await User.find();

            // return the users
            response.json({ message: 'Users found', users });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getUserById: async (request, response) => {
        try {
            // get the user id from the request parameters
            const userId = request.params.id;

            // find the user by id in the database
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // return the user
            response.json({ message: 'User found', user });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    updateUserById: async (request, response) => {
        try {

            const userId = request.params.id;

            const user = await User.findById(userId);
            const { username, name } = request.body;


            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            user.username = username ? username : user.username;
            user.name = name ? name : user.name;

            const updateUser = await user.save();

            response.json({ message: 'User updated', user: updateUser });

        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    deleteUserById: async (request, response) => {
        try {
            // get the user id from the request parameters
            const userId = request.params.id;

            // find the user by id in the database
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return response.status(404).json({ message: 'User Id Required' });
            }

            await User.findByIdAndDelete(userId);

            response.clearCookie('token');

            response.json({ message: 'User Deleted' })

        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController