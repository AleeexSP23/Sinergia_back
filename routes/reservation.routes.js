import express from "express";
import { createReservationController, getAvailabilityController } from "../controllers/reservation.controller.js";
import { appMiddleware } from "../middleware/app.middleware.js";

const router = express.Router();

router.post("/", appMiddleware, createReservationController);
router.get("/availability/:date", getAvailabilityController);

export default router;