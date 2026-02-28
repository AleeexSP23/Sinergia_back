import { UserModel } from "../models/UserModel.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//LOGIN
export async function LoginService(email, password) {
  const userAcces = await UserModel().findOne({ correo: email });

  if (!email || !password) {
    return {
      status: 400,
      message: "Faltan datos",
    };
  }

  if (!userAcces) {
    return {
      status: 401,
      message: "Usuario o clave incorrectos",
    };
  }

  const nombre = userAcces.nombre;
  const correo = userAcces.correo;

  const payload = {
    nombre,
    correo,
  };

  console.log(userAcces.password);
  const passOk = await bcrypt.compare(password, userAcces.password);

  if (!passOk) {
    return {
      status: 401,
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

//REGISTRAR
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
