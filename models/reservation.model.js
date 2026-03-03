import { db } from "../config/db.config.js";

export function ReservationModel() {
  const Schema = db.Schema;

  const ReservationSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    personas: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  });

  const ReservationModel =
    db.models.Reservation ||
    db.model("Reservation", ReservationSchema);

  return ReservationModel;
}