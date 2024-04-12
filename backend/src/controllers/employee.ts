import { Request, Response } from "express";
import { employeeModel } from "../model/employee";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config()

const SECRET_KEY = "dckjbdschjbdchjdbh"
export async function createEmployee(req: Request, res: Response) {
  try {
    const { email } = req.body;
    
    const userEmail = await employeeModel.findOne({ email });
    if (userEmail) {
      res.status(500).json({ error: "User already exists"});
    }
    const employee = await employeeModel.create(req.body);
    res.status(201).json({ employee });
  } catch (error) {
    res.status(500).json({ error: error});
  }
}

export async function loginEmployee(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({ error: "Please Enter Email & Password"});
    }
    const user = await employeeModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(500).json({ error: "Invalid email or password"});
    }
    
    if(user.password != password){
      return res.status(500).json({ error: "Invalid email or password"});
    }
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error});
  }
}
