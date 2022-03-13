const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getAllUsers = async (req, res, next) => {
  const userArr = Object.keys(req.cookies);
  let users;
  try {
    users = await User.find({ _id: userArr });
  } catch (err) {
    return next(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No user found" });
  }
  return res.status(200).json({ users });
};

const getUser = async (req, res, next) => {
  const userId = req.params.id;

  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(404).json({ message: "could not find by this id" });
  }
  return res.status(200).json({ user });
};

const refreshToken = (req, res, next) => {
  const prevToken = req.cookies.jwt;
  if (!prevToken) {
    return res.status("400").json({ mesage: "Please enter valid token" });
  } else {
    jwt.verify(String(prevToken), process.env.SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res
          .status(403)
          .json({ auth: false, message: "authentication failed", err });
      }

      // generate Token

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      // res.cookie("jwt", token, {
      //   expires: new Date(Date.now() + 3600),
      //   httpOnly: true,
      // });
      res.clearCookie("jwt");
      res.cookie("jwt", token, {
        path: "/",
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour,
        httpOnly: true,
      });
      console.log(req.cookies.jwt);
      next();
    });
  }
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(err);
  }
  if (existingUser) {
    return next("User already exists. Login Instead");
  }
  const hashedPassword = bcrypt.hashSync(password);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    await newUser.save();
  } catch (err) {
    return next(err);
  }
  return res.status(201).json({ user: newUser });
};

const verifyToken = (req, res, next) => {
  console.log("ID", req.params.id); // done
  console.log(req.headers);
  const userId = req.params.id; // userid 62243ee1f7fb2ce8f7715248
  const token = req.cookies[`${userId}`];

  if (!token) {
    return res
      .status("400")
      .json({ mesage: "Please enter valid token! Auth Failed" });
  } else {
    jwt.verify(String(token), process.env.SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res
          .status(403)
          .json({ auth: false, message: "Auth Failed! Invalid Token", err });
      }
      req.id = user.id;
      next();
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid User" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid inputs" });
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  // signs id of user with key "id"

  req.id = existingUser._id;
  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = "";
  }
  await res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour,
    httpOnly: true,
  });

  console.log(req.cookies[`${existingUser._id}`]);

  res.status(200).json({
    message: "Successfully logged In",
    token,
    auth: true,
    user: existingUser,
  });
};

exports.signup = signup;
exports.login = login;
exports.getUser = getUser;
exports.getAllUsers = getAllUsers;
exports.verifyToken = verifyToken;
exports.refreshToken = refreshToken;
