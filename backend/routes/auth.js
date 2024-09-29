import express from 'express'
import { registerUser, loginUser, getUsers } from '../controllers/auth.js'

const router = express.Router()

router.get('/users', getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router
