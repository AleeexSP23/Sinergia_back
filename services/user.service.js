import { UserModel } from "../models/UserModel.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//LOGIN
export async function LoginService(email, password) {
  const userAcces = await UserModel().findOne({ correo: email });
  //    si no consigue el usuario entonces retorna el error dentro del if
  if (!userAcces) {
    return {
      status: 404,
      message: "Usuario o clave incorrectos",
    };
  }

  const nombre = userAcces.nombre;
  const correo = userAcces.correo;
  const direccion = userAcces.direccion;

  const payload = {
    nombre,
    correo,
    direccion,
  };

  console.log(userAcces.password);
  const passOk = await bcrypt.compare(password, userAcces.password);

  //    si la clave es incorrecta entonces retorna el error dentro del if

  if (!passOk) {
    return {
      status: 404,
      message: "Usuario o clave incorrectos",
    };
  }

  const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "10m" });

  return {
    status: 200,
    message: {
      user: payload,
      token,
    },
  };
}

//REGISTRAR usuario
export async function RegisterService(data) {
  const userEmail = await UserModel().findOne({ correo: data.correo });
  if (userEmail) {
    return {
      status: 409,
      message: "Este usuario ya existe",
    };
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(data.password, salt);
  try {
    await UserModel().create({
      correo: data.correo,
      nombre: data.nombre,
      direccion: data.direccion,
      password: hash,
    });
    return {
      status: 201,
      message: "Usuario registrado",
    };
  } catch (e) {
    return {
      status: 400,
      message: "Error en la base de datos",
    };
  }
}

