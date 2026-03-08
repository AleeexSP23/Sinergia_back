import { createReservationService, getAvailabilityService, getReservationsService, deleteReservationService  } from "../services/reservation.service.js";

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


export async function deleteReservationController(req, res) {
  const { id } = req.params;
  
  // El usuario está en req.user gracias a appMiddleware
  const response = await deleteReservationService(id, req.user);
  res.status(response.status).json(response);
};
