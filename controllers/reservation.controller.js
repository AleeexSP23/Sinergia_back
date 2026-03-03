import { createReservationService } from "../services/reservation.service.js";

export async function createReservationController(req, res) {
  const userId = req.user.id; // viene del middleware
  const response = await createReservationService(req.body, userId);

  res.status(response.status).json(response);
}