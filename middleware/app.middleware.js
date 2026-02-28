import { validateTokenService } from "../services/token.service.js";
export function appMiddleware(req, res, next){
    console.log(req.headers.authorization.split(' ')[1])
    const token= req.headers.authorization.split(' ')[1]
    try{
        validateTokenService(token);
        next()
    }catch(e){
        res.status(401).send("Error de token")
    }
}

