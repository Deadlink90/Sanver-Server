import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const driverSchema = new Schema(
  {
    nombre: String,
    paterno: String,
    materno: String,
    edad:String,
    sexo:String,

    domicilio:String,
    telefono:String,

    codigo: String,
    status:String,
    ruta:String,
    fecha_ingreso:String,
    fecha_baja:String,
    licencia:String,
    tipo_licencia:String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

driverSchema.plugin(mongoosePaginate);

export default model("drivers", driverSchema);
