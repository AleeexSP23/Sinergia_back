import express from "express";
import { createReservationController, getAvailabilityController, getReservationsController } from "../controllers/reservation.controller.js";
import { appMiddleware } from "../middleware/app.middleware.js";

const router = express.Router();

router.post("/", appMiddleware, createReservationController);
router.get("/availability/:date", getAvailabilityController);
router.get("/", appMiddleware, getReservationsController);

export default router;