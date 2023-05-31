import driverModel from "../../models/drivers.model";

export const driverInit = async () => {
  const count = await driverModel.estimatedDocumentCount();

  if (count > 0) return;

  try {
    const values = await Promise.all([
      new driverModel({
        nombre: "Marcos Alejandro",
        paterno: "Acosta",
        materno: "Guillen",
        codigo: "RSO453",
        status:"activo"
      }).save(),
      new driverModel({
        nombre: "David Alejandro",
        paterno: "Arambula",
        materno: "Silva",
        codigo: "RSO299",
        status:"activo"
      }).save(),
      new driverModel({
        nombre: "Ricardo",
        paterno: "Campos",
        materno: "Noriega",
        codigo: "RSO626",
        status:"activo"
      }).save(),
      new driverModel({
        nombre: "Cesar Agustin",
        paterno: "Martinez",
        materno: "Martinez",
        codigo: "RSO509",
        status:"activo"
      }).save(),
      new driverModel({
        nombre: "Osvaldo Heriberto",
        paterno: "Perez",
        materno: "Esparza",
        codigo: "RSO077",
        status:"activo"
      }).save(),
      new driverModel({
        nombre: "Miguel Angel",
        paterno: "Rojas",
        materno: "Villaseñor",
        codigo: "RSO702",
        status:"activo"
      }).save(),
      new driverModel({
        nombre: "Miguel Angel",
        paterno: "Zuñiga",
        materno: "Velez",
        codigo: "RSO059",
        status:"inactivo"
      }).save(),
      new driverModel({
        nombre: "Rene",
        paterno: "Hernandez",
        materno: "Ramirez",
        codigo: "RSO637",
        status:"inactivo"
      }).save(),
      new driverModel({
        nombre: "Juan Ignacio",
        paterno: "Bautista",
        materno: "Balcazar",
        codigo: "RSO895",
        status:"inactivo"
      }).save(),
      new driverModel({
        nombre: "Dante",
        paterno: "Cortez",
        materno: "Landa",
        codigo: "RSO196",
        status:"inactivo"
      }).save()
    ]);
    console.log(`Drivers creados exitosamente: ${values}`)

  } catch (error) {
    console.log(`Error al crear drivers: ${error}`)
  }
};
