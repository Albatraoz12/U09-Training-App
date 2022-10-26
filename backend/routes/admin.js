const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Middleweare, authorize users token
const authorization = (req, res, next) => {
	// const token = req.cookies.access_token;
	const token = req.headers.authorization.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'You are not Authorized!' });
	}
	try {
		const data = jwt.verify(token, process.env.SECRET);
		req.userId = data.id;
		req.role = data.role;
		return next();
	} catch {
		return res.status(401).json({ message: 'You have no valid token' });
	}
};

//@desc Create a new user as an admin, checks if req.id has role of admin
//@routes POST /signup
//@access Private
router.post('/signup', authorization, (req, res) => {
	try {
		if (req.role === 'admin') {
			const { firstName, lastName, email, password } = req.body;
			User.findOne({ email: email }, (err, user) => {
				if (user) {
					res.status(201).json({
						failedMessage: 'user already exist',
					});
				}
				const newUser = new User({
					firstName: firstName,
					lastName: lastName,
					role: 'user',
					email: email,
					password: password,
				});
				newUser.password = bcrypt.hashSync(newUser.password, 10);
				newUser.save().then(() => {
					res.status(201).json({
						message: 'New user has been created!',
					});
				});
			});
		} else {
			res.status(401).json({ message: 'You are not a jedi' });
		}
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

//@desc Get all user, checks if req.id has role of admin
//@routes GET /getAllUsers
//@access Private
router.get('/getAllUsers', authorization, async (req, res) => {
	try {
		if (req.role === 'admin') {
			const users = await User.find();
			res.status(200).json({ users });
		} else {
			res.status(401).json({ message: 'You are not a jedi' });
		}
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

//@desc Get an user with its ID, checks if req.id has role of admin
//@routes GET /getAllUsers
//@access Private
router.get('/getUser/:uid', authorization, async (req, res) => {
	try {
		if (req.role === 'admin') {
			const uid = req.params.uid;
			const userData = await User.findById(uid);
			res.status(200).json({ userData });
		} else {
			res.status(401).json({ message: 'You are not a jedi' });
		}
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

//@desc Edit A User Information, checks if req.id has role of admin
//@routes PUT /user/:id/edit
//@access Public
router.put('/editUser/:id/', authorization, async (req, res) => {
	try {
		if (req.role === 'admin') {
			const id = req.params.id;
			const update = req.body;
			const options = { new: true };
			const user = await User.findByIdAndUpdate(id, update, options);
			res.status(200).json(user);
		} else {
			res.status(401).json({ message: 'You are not a jedi' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Could not update User' });
	}
});

//@desc Delete A User with a userID, checks if req.id has role of admin
//@routes Delete /deleteUser/:id
//@access Private
router.delete('/deleteUser/:id', authorization, async (req, res) => {
	try {
		if (req.role === 'admin') {
			const id = req.params.id;
			const user = await User.findById(id);
			user.remove();
			return res
				.status(200)
				.json({ message: 'User has been deleted successfully' });
		} else {
			return res.status(401).json({ message: 'You are not a jedi' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
});

module.exports = router;
