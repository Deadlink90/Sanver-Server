import driversModel from "../models/drivers.model";
//minuto 33:04
export const obtainDrivers = async (req, res) => {
  const products = await driversModel.find();
  res.json(products);
};

export const obtainDriverById = async (req, res) => {
  const { id } = req.params;

  try {
    const driver = await driversModel.findById(id);
    res.status(200).json(driver);
  } catch (error) {
    res.json({ message: "Conductor no encontrado", status: "false" });
  }
};

export const createDriver = async (req, res) => {
  const { nombre, apellido, codigo } = req.body;
  const newDriver = new driversModel({ nombre, apellido, codigo });
  const driverSaved = await newDriver.save();
  res.status(201).json(driverSaved);
};

export const UpdateDriver = async (req, res) => {
  const { id } = req.params;

  const updatedDriver = await driversModel.findByIdAndUpdate(id, req.body, {
    new: true
  });

  res.status(200).json(updatedDriver);
};

export const deleteDriverById = async (req, res) => {
  const {id} = req.params;

  try {
  await driversModel.findByIdAndDelete(id);
  res.json({message:'Registro elminado satisfactoriamente!!', status:'true'})
  } catch (error) {
   res.json({message:'algo salio mal', status:false}) 
  }
  
};
