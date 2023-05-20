import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import {createRoles} from './libs/roles.init'
//importacion de rutas
import driversRoutes from './routes/drivers.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes'

const app = express();

//ejecucion de inits
createRoles();

app.set('pkg', pkg);
app.use(morgan('dev'));
app.use(express.json())

app.get('/', (req,res) => {
res.json({
name:app.get('pkg').name,
author:app.get('pkg').author,
description:app.get('pkg').description,
version: app.get('pkg').version
})
})

app.use('/api/drivers',driversRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users',userRoutes);

export default app;