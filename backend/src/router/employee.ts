import express from "express";
import { createEmployee, loginEmployee } from "../controllers/employee";
const router = express.Router();

router.post("/admin/create/employee", createEmployee);

router.post("/employee/signIn", loginEmployee);

export default router;