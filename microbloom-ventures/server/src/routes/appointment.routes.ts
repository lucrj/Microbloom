import { Router } from "express";
import { requestAppointment , listAppointments } from "../controller/appointment.controller.js";
import { Request , Response } from "express";

const router = Router();

router.post("/appointments", requestAppointment);
router.get("/appointments", listAppointments);

export default router ;