import { Router } from "express";
const router = Router();

import * as driversCtrl from '../controllers/drivers.controllers'
import { authJwt } from "../middlewares";

router.get('/',[authJwt.verifyToken,authJwt.isModerator], driversCtrl.obtainDrivers);

router.get('/:id', driversCtrl.obtainDriverById);
router.post('/', driversCtrl.createDriver);
router.put('/:id', driversCtrl.UpdateDriver);
router.delete('/:id', driversCtrl.deleteDriverById);

export default router;
