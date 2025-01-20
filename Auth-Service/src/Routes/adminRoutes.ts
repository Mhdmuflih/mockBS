// import express, { Application } from "express";
// import { insertUser } from "../Controllers/Auth";

// const Admin_Route: Application = express();

// Admin_Route.post('/sign-up', insertUser);

// export default Admin_Route;

import { Router } from "express";
import { AdminControllers } from "../Controllers/AdminController";
import adminRepository from "../Repositories/adminRepository";
import { AdminServices } from "../Services/adminService";


const adminService = new AdminServices(adminRepository);
const adminController = new AdminControllers(adminService);

const Admin_Route = Router();

Admin_Route.post('/sign-up', adminController.signUp.bind(adminController));
Admin_Route.post('/login', adminController.loginAdmin.bind(adminController));

export default Admin_Route;