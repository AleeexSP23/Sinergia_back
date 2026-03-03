import express from "express";
import { createReservationController } from "../controllers/reservation.controller.js";

const router = express.Router();

router.post("/", createReservationController);

export default router;