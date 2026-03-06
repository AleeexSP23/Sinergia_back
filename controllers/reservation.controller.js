import { createReservationService, getAvailabilityService, getReservationsService } from "../services/reservation.service.js";

export async function createReservationController(req, res) {
  const userId = req.user.id;
  const response = await createReservationService(req.body, userId);

  res.status(response.status).json(response);
};

export async function getAvailabilityController(req, res) {

  const { date } = req.params;

  const response = await getAvailabilityService(date);

  res.status(response.status).json(response);

};

export async function getReservationsController(req,res){

  const response = await getReservationsService(req.user);

  res.status(response.status).json(response);

};
