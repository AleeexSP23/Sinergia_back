import express from "express";
import { createReservationController } from "../controllers/reservation.controller.js";
import { appMiddleware } from "../middleware/app.middleware.js";

const router = express.Router();

router.post("/", appMiddleware, createReservationController);

export default router;