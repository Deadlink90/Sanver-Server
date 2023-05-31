import userModel from "../../models/users.model";
import roleModel from "../../models/roles";
import { encryptPassword,obtainRole } from "../../helpers/users.helper";

export const userInit = async () => {
  const count = await userModel.estimatedDocumentCount();
  const count1 = await roleModel.estimatedDocumentCount();

  if (count > 0) return;
  if (count1 < 0 ) return;
  
  try {
    const values = await Promise.all([
      new userModel({
        username: "admin",
        email: "admin@gmail.com",
        password: await encryptPassword("admin"),
        roles: await obtainRole('admin')
      }).save(),
      new userModel({
        username: "moderator",
        email: "moderator@gmail.com",
        password: await encryptPassword("moderator"),
        roles: await obtainRole('moderator')
      }).save(),
      new userModel({
        username: "user",
        email: "user@gmail.com",
        password: await encryptPassword("user"),
        roles: await obtainRole('user')
      }).save(),
    ]);
    console.log(`Usuarios creados exitosamente: ${values}`);

  } catch (error) {
    console.log(`Algo salio mal (Users Init): ${error}`);
  }
};
