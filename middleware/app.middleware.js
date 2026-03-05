import { validateTokenService } from "../services/token.service.js";

export function appMiddleware(req, res, next) {

  if (!req.headers.authorization) {
    return res.status(401).send("No token provided");
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = validateTokenService(token);

    req.user = decoded;

    next();
  } catch (e) {
    res.status(401).send("Token inválido");
  }
}
