import { LoginService } from "../services/user.service.js"

export async function LoginController(req, res) {
    const email = req.body.email;
    const password = req.body.password
    // console.log(LoginService(email, password))

    const response = await LoginService(email, password)
    res.status(response.status).json({ message: response.message })
}

export async function RegisterController(req, res) {
  
const response=await RegisterService(req.body);
console.log(response)
  res.status(response.status).json({
    success: true,
    message: response.message,
  });
}
