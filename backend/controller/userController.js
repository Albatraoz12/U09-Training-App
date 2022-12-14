const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const identify = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user === null) {
      res.status(400);
      return;
    }

    res.status(200).json({
      user: {
        id: req.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

//Sign in controller
const signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.SECRET
      );

      return res
        .cookie('access_token', token, {
          httpOnly: process.env.NODE_ENV == 'production' ? true : false,
          secure: true,
          sameSite: 'none',
        })
        .status(200)
        .json({
          message: user.firstName + ' Signed in successfully',
          token: token,
        });
    } else if (!passwordMatch) {
      res.status(400).json({ message: 'Wrong Password, try again' });
    }
  } else {
    res.status(400).json({ message: 'sorry, could not login' });
  }
};

// Sign up controller
const signUp = (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'please fill in the feilds' });
    }
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        return res.status(400).json({ failedMessage: 'user already exist' });
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
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Sign out user controller
const signOut = (req, res) => {
  return res
    .clearCookie('access_token')
    .status(200)
    .json({ message: 'Successfully logged out' });
};

module.exports = { identify, signIn, signUp, signOut };
