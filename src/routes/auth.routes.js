import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import { authJwt } from "../middlewares";
import { verifySignup } from "../middlewares";

router.post(
  "/signup",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRoles,
    verifySignup.UserAndEmailDuplicated,
  ],
  authCtrl.signUp
);
router.post("/signin", authCtrl.signIn);

export default router;
