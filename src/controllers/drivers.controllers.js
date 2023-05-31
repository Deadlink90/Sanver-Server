import driversModel from "../models/drivers.model";

export const obtainDrivers = async (req, res) => {

  const { page, limit,status,codigo } = req.query;

  //objeto query
  const query = {};

  const options = {
  page: parseInt(page, 10) || 1, // Página actual
  limit:parseInt(limit, 10) || 5,// Número de documentos por página, 
  };

  if(codigo){
    query.codigo = codigo
  }

  if(status && status !== 'todos'){
    if(status === 'activo'){
      query.status = 'activo'
    }else if(status === 'inactivo'){
      query.status = 'inactivo'
    }
  }
  
  
  try {
    console.log(query);
    const paginatedDrivers = await driversModel.paginate(query, options);
    console.log(paginatedDrivers);
    res.send(paginatedDrivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los conductores.' });
  }
};

export const obtainDriverWf = async (req,res) =>{
  const { status,codigo } = req.query;
  const filters = {};

  try {
  if(codigo){
   filters.codigo = codigo
  }
  if(status){
    filters.status = status
  }  


  const docs = await driversModel.find(filters);
  console.log(docs);
  res.json({docs:docs})

  } catch (error) {
    res.json(error); 
  }
}

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
  const { nombre, paterno, materno, codigo } = req.body;
  const newDriver = new driversModel({
    nombre,
    paterno,
    materno,
    codigo,
  });

  try {
    const driverSaved = await newDriver.save();
    res.status(201).json({
      message: "Registro creado con exito",
      status: "true",
      driverSaved,
    });
  } catch (error) {
    res.json({
      message: "la operacion no pudo ser completada",
      status: "false",
      typeError: "Create driver",
    });
  }
};

export const UpdateDriver = async (req, res) => {
  const { id } = req.params;

  const updatedDriver = await driversModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedDriver);
};

export const deleteDriverById = async (req, res) => {
  const { id } = req.params;

  try {
    await driversModel.findByIdAndDelete(id);
    res.json({
      message: "Registro elminado satisfactoriamente!!",
      status: "true",
    });
  } catch (error) {
    res.json({ message: "algo salio mal", status: false });
  }
};
