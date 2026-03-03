import { ReservationModel } from "../models/reservation.model.js";

export async function createReservationService(data, userId) {
  try {
    await ReservationModel().create({
      userId,
      fecha: data.fecha,
      personas: data.personas,
    });

    return {
      status: 201,
      message: "Reserva creada correctamente",
    };
  } catch (e) {
    return {
      status: 400,
      message: "Error al crear reserva",
    };
  }
}