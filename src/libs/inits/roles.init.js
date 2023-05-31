import roleModel from "../../models/roles";

export const createRoles = async() => {
    
  const count = await roleModel.estimatedDocumentCount();

  if (count > 0) return;

  try { 
    const values = await Promise.all([
      new roleModel({ name: "user" }).save(),
      new roleModel({ name: "moderator" }).save(),
      new roleModel({ name: "admin" }).save()
    ]);
    console.log(values);
  } catch (error) {
    console.error(`error al crear los roles ${error}`);
  }
};
