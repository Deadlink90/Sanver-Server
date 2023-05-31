import bcrypt from "bcryptjs";
import roleModel from '../models/roles'

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const obtainRole = async (roleName) => {
  const roles = await roleModel.find({ name: { $in: roleName } })
  const roleId = roles.map((role) => role._id);
  return [roleId];
};
