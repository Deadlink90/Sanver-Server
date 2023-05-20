import { Schema, model } from "mongoose";

const driverSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    codigo: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('drivers',driverSchema);