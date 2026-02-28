import express from 'express'
import {LoginController, RegisterController} from '../controllers/user.controller.js'

const router= express.Router();
router.use(express.json())

router.post('/login', LoginController)
router.post('/register', RegisterController)



export default router