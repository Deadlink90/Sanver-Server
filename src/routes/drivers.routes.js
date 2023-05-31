import { Router } from "express";
const router = Router();

import * as driversCtrl from "../controllers/drivers.controllers";
import createDriverValidator from "../validators/drivers.validator";
import { authJwt } from "../middlewares";

//ver: Moderador
router.get(
  "/",
  [
   authJwt.verifyToken, 
   authJwt.isModerator
  ],
   driversCtrl.obtainDrivers
);

router.get(
  "/document",
  [
  authJwt.verifyToken,
  authJwt.isModerator  
  ],
  driversCtrl.obtainDriverWf
  )

//ver: Moderador
router.get(
  "/:id",
  [
  authJwt.verifyToken, 
  authJwt.isModerator
  ],
  driversCtrl.obtainDriverById
);

//crear: Admin
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  driversCtrl.createDriver
);

//editar: Admin
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  driversCtrl.UpdateDriver
);

//eliminar: Admin
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  driversCtrl.deleteDriverById
);

export default router;
