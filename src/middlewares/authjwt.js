import jwt from "jsonwebtoken";
import User from "../models/users.model";
import Roles from "../models/roles";
import config from "../config";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
   console.log(token);
  if (!token)
    return res.status(403).json({
      message: "No token provided",
      status: "false",
      typeError:"token"
    });

  try {
    const decode = jwt.verify(token, config.SECRET);
    req.userId = decode.id;
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Invalid token", status: "false",typeError:"token" });
  }

  const tokenUser = await User.findById(req.userId);
  if (!tokenUser)
    return res
      .status(404)
      .json({ message: "User not founded", status: "false",typeError:"token" });

  next();
};

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Roles.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator" || roles[i].name === "admin") {
      next();
      return;
    }
  }

  return res
    .status(403)
    .json({ message: "Requires moderator rol", status: "false",typeError:'rol' });
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Roles.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  return res
    .status(403)
    .json({ message: "Requires Admin rol", status: "false",typeError:'rol' });
};
