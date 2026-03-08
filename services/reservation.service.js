import { ReservationModel } from "../models/reservation.model.js";

export async function createReservationService(data, userId) {
  try {

    console.log("DATA QUE LLEGA:", data); 
    console.log("FECHA RECIBIDA:", data.date);

    const reservasEnHorario = await ReservationModel().countDocuments({
      date: data.date
    });

    if (reservasEnHorario >=5){
      return {
        status:400,
        message: "Esta hora está completa"
      }
    }

    await ReservationModel().create({
      userId: userId,
      date: data.date,
      personas: data.personas,
    });

    return {
      status: 201,
      message: "Reserva creada correctamente" ,
    };
  } catch (e) {
    console.log("ERROR MONGO:", e);
    return {
      status: 400,
      message: "Error al crear reserva",
    };
  }
};

export async function getAvailabilityService(date) {

  try {

    const start = new Date(date);
    start.setHours(0,0,0,0);

    const end = new Date(date);
    end.setHours(23,59,59,999);

    const reservations = await ReservationModel().find({
      date: { $gte: start, $lte: end }
    });

    const horarios = {
      "14:00": 0,
      "15:30": 0,
      "20:00": 0,
      "21:30": 0
    };

    reservations.forEach(r => {

      const hora = new Date(r.date)
        .toTimeString()
        .slice(0,5);

      if(horarios[hora] !== undefined){
        horarios[hora]++;
      }

    });

    return {
      status: 200,
      horarios
    }

  } catch(e){

    return {
      status: 400,
      message: "Error al obtener disponibilidad"
    }

  }

};


export async function getReservationsService(user) {

  try {

    let reservations;

    if(user.role === "admin"){

      reservations = await ReservationModel().find()
        .populate("userId", "email");

    } else {

      reservations = await ReservationModel().find({
        userId: user.id
      });

    }

    return {
      status: 200,
      reservations
    }

  } catch(e){

    return {
      status: 400,
      message: "Error al obtener reservas"
    }

  }

};

export async function deleteReservationService(reservationId, user) {
  try {
    // Solo admins pueden eliminar cualquier reserva
    // Usuarios normales solo podrían eliminar la suya (opcional)
    if (user.role !== "admin") {
      return { status: 403, message: "No tienes permisos para eliminar reservas" };
    }

    const deleted = await ReservationModel().findByIdAndDelete(reservationId);

    if (!deleted) {
      return { status: 404, message: "Reserva no encontrada" };
    }

    return { status: 200, message: "Reserva eliminada correctamente" };
  } catch (err) {
    console.error(err);
    return { status: 500, message: "Error al eliminar la reserva" };
  }
}