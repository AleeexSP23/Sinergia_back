import { db } from "../config/db.config.js";
export function UserModel() {
  const Schema = db.Schema;
  const UserSchema = new Schema({
    correo: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    nombre: {
      required: true,
      type: String,
    },
  });

  const UserModel =
    db.models.UserModel || db.model("UserModel", UserSchema, "UserModel");

  return UserModel;
}
