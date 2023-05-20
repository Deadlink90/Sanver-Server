import User from "../models/users.model";
import Role from "../models/roles";
import jwt from "jsonwebtoken";
import config from "../config";


export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const founRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = founRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400, //24 hours
  });

  res.json({ token, savedUser });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({email:email}).populate("roles");

  if (!userFound)
    return res.json({ message: "User not founded!!", status: "false" });

  const matchPassword = await User.comparePasswords(
    userFound.password,
    password
  );

  if (!matchPassword)
    return res
      .status(401)
      .json({ message: "Invalid password", status: "false" });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({token});
};
