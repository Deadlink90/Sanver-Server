import { check } from "express-validator";
import validateResult from "../helpers/validator.helper";

const createDriverValidator = [
    check('nombre').exists().notEmpty(),
    check('paterno').exists().notEmpty(),
    check('materno').exists().notEmpty(),
    check('codigo').exists().notEmpty(),

    (req,res,next) => {
        validateResult(req,res,next);
    }
]

export default createDriverValidator;