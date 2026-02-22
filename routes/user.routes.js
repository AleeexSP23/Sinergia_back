import express from 'express'
import {LoginController} from '../controllers/user.controller.js'

const router= express.Router();
router.use(express.json())

router.post('/login', LoginController)



export default router