import express from "express";
import { createReservationController, getAvailabilityController, getReservationsController, deleteReservationController } from "../controllers/reservation.controller.js";
import { appMiddleware } from "../middleware/app.middleware.js";

const router = express.Router();

router.post("/", appMiddleware, createReservationController);
router.get("/availability/:date", getAvailabilityController);
router.get("/", appMiddleware, getReservationsController);
router.delete("/:id", appMiddleware, deleteReservationController);

export default router;