import { ROLES } from "../models/roles";
import User from "../models/users.model";

//comprobar email y username duplicados
export const UserAndEmailDuplicated = async (req, res, next) => {
  const { username, email } = req.body;

  const userFounded = await User.findOne({ username: username });

  if (userFounded)
    return res
      .status(400)
      .json({ message: "user already exists", status: "false" });

  const emailFounded = await User.findOne({ email: email });

  if (emailFounded)
    return res
      .status(400)
      .json({ message: "email already exists", status: "false" });

  next();
};

//comprobar roles
export const checkRoles = (req, res, next) => {
  const { roles } = req.body;

  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        return res.status(400).json({
          message: `${roles[i]} is not a valid rol`,
          status: "false",
        });
      }
    }
  }

  next();
};
