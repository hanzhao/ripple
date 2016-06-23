import { Router } from 'express'
import userRouter from './user'
import chatRouter from './chat'

const router = Router()

const apiRouter = Router()
apiRouter.use(userRouter)
apiRouter.use(chatRouter)

router.use('/api', apiRouter)

export default router
